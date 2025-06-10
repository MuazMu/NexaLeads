
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { LeadManagement } from '@/components/dashboard/LeadManagement';
import { Analytics } from '@/components/dashboard/Analytics';
import { AccountSettings } from '@/components/dashboard/AccountSettings';
import { Support } from '@/components/dashboard/Support';
import { AuthenticatedNavbar } from '@/components/shared/AuthenticatedNavbar';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type DashboardTab = 'overview' | 'leads' | 'analytics' | 'settings' | 'support';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        navigate('/auth');
        return;
      }

      setUser(user);

      // Check if this is the admin user and set premium plan
      if (user.email === 'muwi1772@gmail.com') {
        await ensureAdminPremium(user.id);
      }

      // Get user subscription
      await checkSubscription();
      
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/auth');
    }
  };

  const ensureAdminPremium = async (userId: string) => {
    try {
      // Update user to have premium package
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: userId,
          email: 'muwi1772@gmail.com',
          subscription_status: 'active',
          package_type: 'premium'
        }, { onConflict: 'id' });

      if (userError) console.error('Error updating user:', userError);

      // Ensure subscription record exists
      const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          status: 'active',
          package_type: 'premium',
          amount: 297,
          currency: 'EUR',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        }, { onConflict: 'user_id' });

      if (subError) console.error('Error updating subscription:', subError);
      
    } catch (error) {
      console.error('Error setting admin premium:', error);
    }
  };

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

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewCards />;
      case 'leads':
        return <LeadManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <AccountSettings />;
      case 'support':
        return <Support />;
      default:
        return <OverviewCards />;
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <AuthenticatedNavbar />
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <DashboardSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <main className="flex-1 flex flex-col">
            <DashboardHeader 
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
            <div className="flex-1 p-6 overflow-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
