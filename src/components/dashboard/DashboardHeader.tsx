
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Moon, Sun } from 'lucide-react';

interface DashboardHeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  darkMode,
  setDarkMode
}) => {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-bold">LeadPro MENA</h1>
          <p className="text-sm text-muted-foreground">Welcome back, John!</p>
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
