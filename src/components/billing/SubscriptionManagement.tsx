
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionStatus } from "@/types/subscription";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, CreditCard, RefreshCw } from "lucide-react";

export function SubscriptionManagement() {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkSubscription();
  }, []);

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
      toast({
        title: "Error",
        description: "Failed to check subscription status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    try {
      setIsUpdating(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      
      // Open in new tab
      window.open(data.url, '_blank');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const refreshSubscription = async () => {
    setIsUpdating(true);
    await checkSubscription();
    setIsUpdating(false);
    toast({
      title: "Success",
      description: "Subscription status updated",
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Loading subscription details...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'trial':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanName = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'Starter Plan';
      case 'pro':
        return 'Pro Plan';
      case 'premium':
        return 'Premium Plan';
      default:
        return 'Unknown Plan';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Subscription
          <Button
            variant="outline"
            size="sm"
            onClick={refreshSubscription}
            disabled={isUpdating}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
        <CardDescription>Manage your NexaLeads subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription && (
          <>
            <div className="flex items-center justify-between">
              <span className="font-medium">Current Plan:</span>
              <div className="text-right">
                <div className="font-semibold">{getPlanName(subscription.package_type)}</div>
                <Badge className={getStatusColor(subscription.status)}>
                  {subscription.status}
                </Badge>
              </div>
            </div>
            
            {subscription.current_period_end && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Next Billing Date:</span>
                <span>{new Date(subscription.current_period_end).toLocaleDateString()}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="space-y-2">
              <Button
                onClick={openCustomerPortal}
                disabled={isUpdating}
                className="w-full"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Billing & Payment Methods
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Update payment methods, download invoices, and manage your subscription
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
