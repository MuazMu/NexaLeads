
import React, { useEffect, useState } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

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
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
    packageType: string;
    initials: string;
  }>({
    name: 'User',
    email: '',
    packageType: 'starter',
    initials: 'U'
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userInfo } = await supabase
          .from('users')
          .select('full_name, package_type')
          .eq('id', user.id)
          .single();

        const fullName = userInfo?.full_name || user.user_metadata?.full_name || user.user_metadata?.username || 'User';
        const packageType = userInfo?.package_type || 'starter';
        const initials = fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

        setUserInfo({
          name: fullName,
          email: user.email || '',
          packageType,
          initials
        });
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const formatPackageName = (packageType: string) => {
    return packageType.charAt(0).toUpperCase() + packageType.slice(1) + ' Plan';
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{userInfo.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground">{formatPackageName(userInfo.packageType)}</p>
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
          <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
