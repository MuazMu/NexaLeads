
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { LeadManagement } from '@/components/dashboard/LeadManagement';
import { Analytics } from '@/components/dashboard/Analytics';
import { AccountSettings } from '@/components/dashboard/AccountSettings';
import { Support } from '@/components/dashboard/Support';

type DashboardTab = 'overview' | 'leads' | 'analytics' | 'settings' | 'support';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className={darkMode ? 'dark' : ''}>
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
