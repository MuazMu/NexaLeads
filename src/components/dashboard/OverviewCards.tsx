
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalLeads: number;
  conversionRate: number;
  deliveryStatus: string;
  packageType: string;
}

export const OverviewCards = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalLeads: 0,
    conversionRate: 0,
    deliveryStatus: 'Loading...',
    packageType: 'starter'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user subscription info
      const { data: userInfo } = await supabase
        .from('users')
        .select('package_type, subscription_status')
        .eq('id', user.id)
        .single();

      // Get total leads for current month
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)
        .gte('delivered_at', startOfMonth.toISOString());

      // Calculate conversion rate
      const { data: conversionData } = await supabase
        .rpc('calculate_conversion_rate', { p_user_id: user.id });

      const totalLeads = leads?.length || 0;
      const conversionRate = conversionData || 0;

      setAnalytics({
        totalLeads,
        conversionRate,
        deliveryStatus: 'On schedule',
        packageType: userInfo?.package_type || 'starter'
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPackageLimit = (packageType: string) => {
    switch (packageType) {
      case 'premium': return 1000;
      case 'pro': return 500;
      default: return 200;
    }
  };

  const packageLimit = getPackageLimit(analytics.packageType);
  const progressPercentage = (analytics.totalLeads / packageLimit) * 100;

  const stats = [
    {
      title: 'Total Leads This Month',
      value: isLoading ? 'Loading...' : analytics.totalLeads.toString(),
      change: `${progressPercentage.toFixed(1)}% of limit`,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Conversion Rate',
      value: isLoading ? 'Loading...' : `${analytics.conversionRate}%`,
      change: analytics.conversionRate > 20 ? 'Excellent' : 'Good',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Next Delivery',
      value: '2 days',
      change: analytics.deliveryStatus,
      icon: Calendar,
      color: 'text-orange-600'
    },
    {
      title: 'Account Status',
      value: 'Active',
      change: `${analytics.packageType.charAt(0).toUpperCase() + analytics.packageType.slice(1)} Plan`,
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
                <span>{analytics.totalLeads}/{packageLimit}</span>
              </div>
              <Progress value={Math.min(progressPercentage, 100)} className="w-full" />
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
