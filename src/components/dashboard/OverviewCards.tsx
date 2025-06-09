
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Calendar, CheckCircle } from 'lucide-react';

export const OverviewCards = () => {
  const stats = [
    {
      title: 'Total Leads This Month',
      value: '487',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Conversion Rate',
      value: '23.5%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Next Delivery',
      value: '2 days',
      change: 'On schedule',
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Account Status',
      value: 'Active',
      change: 'Pro Plan',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Here's a summary of your lead generation performance
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Leads Delivered</span>
                <span>487/500</span>
              </div>
              <Progress value={97.4} className="w-full" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
              Export this month's leads
            </button>
            <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
              Request additional leads
            </button>
            <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
              Update delivery preferences
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
