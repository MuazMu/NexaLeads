
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingCard } from "@/components/pricing/PricingCard";
import { CurrencySelector } from "@/components/pricing/CurrencySelector";
import { supabase } from "@/integrations/supabase/client";
import { PricingPlan, Currency, SubscriptionStatus } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";

const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
];

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: { EUR: 9700, USD: 10400, TRY: 32000 },
    leads: 500,
    countries: 5,
    support: 'Email support',
    features: [
      '500 qualified leads per month',
      'Access to 5 countries',
      'Basic lead filtering',
      'Email support',
      'CSV export',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { EUR: 19700, USD: 21200, TRY: 65000 },
    leads: 2000,
    countries: 15,
    support: 'Priority support',
    popular: true,
    features: [
      '2,000 qualified leads per month',
      'Access to 15 countries',
      'Advanced lead filtering',
      'Priority email support',
      'API access',
      'Custom export formats',
      'Lead quality scoring',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: { EUR: 29700, USD: 31900, TRY: 98000 },
    leads: 5000,
    countries: 50,
    support: '24/7 phone & email',
    features: [
      '5,000 qualified leads per month',
      'Access to 50+ countries',
      'AI-powered lead recommendations',
      '24/7 phone & email support',
      'Full API access',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics dashboard',
    ],
  },
];

export default function Pricing() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkSubscription();
    
    // Handle canceled payment
    if (searchParams.get('canceled') === 'true') {
      toast({
        title: "Payment Canceled",
        description: "Your payment was canceled. You can try again anytime.",
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const checkSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a plan.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      setIsLoading(true);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          plan: planId,
          currency: selectedCurrency.code,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get access to qualified leads and grow your business
          </p>
          <div className="flex justify-center">
            <CurrencySelector
              currencies={currencies}
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              currency={selectedCurrency}
              onSubscribe={handleSubscribe}
              isLoading={isLoading}
              currentPlan={subscription?.package_type}
            />
          ))}
        </div>

        <div className="mt-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Why Choose NexaLeads?</CardTitle>
              <CardDescription>
                Join thousands of businesses growing with our lead generation platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Lead Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Countries Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Customer Support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All plans include a 7-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
