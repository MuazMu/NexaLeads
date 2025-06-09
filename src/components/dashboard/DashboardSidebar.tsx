
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from '@/components/ui/sidebar';
import { 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  Home,
  LogOut
} from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: 'overview' | 'leads' | 'analytics' | 'settings' | 'support') => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'leads', label: 'Lead Management', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Account Settings', icon: Settings },
  { id: 'support', label: 'Support', icon: HelpCircle },
];

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeTab === item.id}
                onClick={() => setActiveTab(item.id as any)}
                className="w-full justify-start"
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <div className="mt-auto pt-6">
          <Button variant="ghost" className="w-full justify-start text-red-600">
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
