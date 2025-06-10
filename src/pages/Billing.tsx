
import { BillingHistory } from "@/components/billing/BillingHistory";
import { SubscriptionManagement } from "@/components/billing/SubscriptionManagement";
import { AuthenticatedNavbar } from "@/components/shared/AuthenticatedNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Billing() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate('/auth');
        return;
      }
      setUser(user);
    };
    checkAuth();
  }, [navigate]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticatedNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and view billing history
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <SubscriptionManagement />
          <BillingHistory />
        </div>
      </div>
    </div>
  );
}
