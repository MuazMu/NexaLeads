
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Moon, Sun } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface DashboardHeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  darkMode,
  setDarkMode
}) => {
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userInfo } = await supabase
          .from('users')
          .select('full_name')
          .eq('id', user.id)
          .single();

        if (userInfo?.full_name) {
          setUserName(userInfo.full_name);
        } else {
          // Fallback to auth metadata
          const fullName = user.user_metadata?.full_name || user.user_metadata?.username || 'User';
          setUserName(fullName);
        }
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold">NexaLeads Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, {userName}!</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
};
