
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  ResponsiveContainer 
} from 'recharts';

export const Analytics = () => {
  const leadTrendData = [
    { month: 'Jan', leads: 320 },
    { month: 'Feb', leads: 420 },
    { month: 'Mar', leads: 380 },
    { month: 'Apr', leads: 487 },
    { month: 'May', leads: 520 },
    { month: 'Jun', leads: 610 }
  ];

  const industryData = [
    { name: 'Technology', value: 35, color: '#8884d8' },
    { name: 'Healthcare', value: 25, color: '#82ca9d' },
    { name: 'Finance', value: 20, color: '#ffc658' },
    { name: 'Energy', value: 15, color: '#ff7c7c' },
    { name: 'Other', value: 5, color: '#8dd1e1' }
  ];

  const conversionData = [
    { month: 'Jan', rate: 18 },
    { month: 'Feb', rate: 22 },
    { month: 'Mar', rate: 20 },
    { month: 'Apr', rate: 24 },
    { month: 'May', rate: 26 },
    { month: 'Jun', rate: 23 }
  ];

  const chartConfig = {
    leads: {
      label: "Leads",
      color: "hsl(var(--chart-1))",
    },
    rate: {
      label: "Conversion Rate",
      color: "hsl(var(--chart-2))",
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          Track your lead generation performance and ROI
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Delivery Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <LineChart data={leadTrendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="var(--color-leads)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={conversionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rate" fill="var(--color-rate)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Industry Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROI Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Monthly Investment:</span>
                <span className="text-sm">€197</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Leads Received:</span>
                <span className="text-sm">487</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Conversions:</span>
                <span className="text-sm">115</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Avg. Deal Value:</span>
                <span className="text-sm">€850</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total ROI:</span>
                <span className="text-green-600">497%</span>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                You've generated <strong>€97,750</strong> in revenue 
                from a <strong>€197</strong> investment this month!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
