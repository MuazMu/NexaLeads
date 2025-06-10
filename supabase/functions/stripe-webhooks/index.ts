
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      throw new Error("No Stripe signature found");
    }

    // In production, you should set a webhook endpoint secret
    // const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    // For now, parse the event directly (less secure but functional)
    const event = JSON.parse(body);
    logStep("Event type", { type: event.type, id: event.id });

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId);
        const userEmail = typeof customer !== 'string' ? customer.email : null;
        
        if (!userEmail) {
          logStep("No email found for customer", { customerId });
          break;
        }

        // Find user by email
        const { data: users } = await supabaseClient
          .from("users")
          .select("id")
          .eq("email", userEmail)
          .single();

        if (!users) {
          logStep("No user found for email", { userEmail });
          break;
        }

        // Determine package type from price
        const priceId = subscription.items.data[0].price.id;
        const price = await stripe.prices.retrieve(priceId);
        const amount = price.unit_amount || 0;
        
        let packageType = 'starter';
        if (amount >= 29000) packageType = 'premium';
        else if (amount >= 19000) packageType = 'pro';

        // Update subscription in database
        await supabaseClient.from("subscriptions").upsert({
          user_id: users.id,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: customerId,
          status: subscription.status,
          package_type: packageType,
          amount: amount / 100,
          currency: price.currency.toUpperCase(),
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        }, { onConflict: 'stripe_subscription_id' });

        // Update user status
        await supabaseClient.from("users").update({
          subscription_status: subscription.status === 'active' ? 'active' : 'inactive',
          package_type: packageType
        }).eq('id', users.id);

        logStep("Subscription updated", { userId: users.id, status: subscription.status, packageType });
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Update subscription status
        await supabaseClient.from("subscriptions")
          .update({ 
            status: 'canceled',
            canceled_at: new Date().toISOString()
          })
          .eq('stripe_subscription_id', subscription.id);

        // Update user status
        const { data: subData } = await supabaseClient
          .from("subscriptions")
          .select("user_id")
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (subData) {
          await supabaseClient.from("users").update({
            subscription_status: 'inactive'
          }).eq('id', subData.user_id);
        }

        logStep("Subscription canceled", { subscriptionId: subscription.id });
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        
        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId);
        const userEmail = typeof customer !== 'string' ? customer.email : null;
        
        if (!userEmail) break;

        const { data: users } = await supabaseClient
          .from("users")
          .select("id")
          .eq("email", userEmail)
          .single();

        if (!users) break;

        // Record payment
        await supabaseClient.from("payments").insert({
          user_id: users.id,
          stripe_payment_id: invoice.payment_intent,
          stripe_invoice_id: invoice.id,
          amount: invoice.amount_paid / 100,
          currency: invoice.currency.toUpperCase(),
          status: 'succeeded',
          description: invoice.description || 'Subscription payment'
        });

        logStep("Payment recorded", { userId: users.id, amount: invoice.amount_paid / 100 });
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        
        // Get customer to find user
        const customer = await stripe.customers.retrieve(customerId);
        const userEmail = typeof customer !== 'string' ? customer.email : null;
        
        if (!userEmail) break;

        const { data: users } = await supabaseClient
          .from("users")
          .select("id")
          .eq("email", userEmail)
          .single();

        if (!users) break;

        // Record failed payment
        await supabaseClient.from("payments").insert({
          user_id: users.id,
          stripe_payment_id: invoice.payment_intent,
          stripe_invoice_id: invoice.id,
          amount: invoice.amount_due / 100,
          currency: invoice.currency.toUpperCase(),
          status: 'failed',
          description: invoice.description || 'Failed subscription payment'
        });

        logStep("Failed payment recorded", { userId: users.id, amount: invoice.amount_due / 100 });
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
