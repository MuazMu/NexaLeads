
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  FileText, 
  Video, 
  Ticket,
  ExternalLink
} from 'lucide-react';

export const Support = () => {
  const tickets = [
    {
      id: 'TICK-001',
      subject: 'Lead quality inquiry',
      status: 'Open',
      date: '2024-01-15',
      priority: 'Medium'
    },
    {
      id: 'TICK-002',
      subject: 'Billing question',
      status: 'Resolved',
      date: '2024-01-10',
      priority: 'Low'
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started with LeadPro',
      duration: '5 min',
      type: 'video'
    },
    {
      title: 'How to Export Leads',
      duration: '3 min',
      type: 'video'
    },
    {
      title: 'Managing Your Subscription',
      duration: '4 min',
      type: 'video'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Support Center</h2>
        <p className="text-muted-foreground">
          Get help and access resources for your account
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Live Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get instant help from our support team
            </p>
            <Button className="w-full">
              Start Live Chat
            </Button>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Average response time: 2 minutes
              </p>
              <Badge variant="secondary" className="mt-1">
                Available 24/7
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ticket className="w-5 h-5 mr-2" />
              Submit Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Brief description of your issue" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Please describe your issue in detail..."
                rows={4}
              />
            </div>
            
            <Button className="w-full">Submit Ticket</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ticket className="w-5 h-5 mr-2" />
            Your Support Tickets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{ticket.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.id} • {ticket.date}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={ticket.status === 'Open' ? 'default' : 'secondary'}
                  >
                    {ticket.status}
                  </Badge>
                  <Badge variant="outline">
                    {ticket.priority}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Help Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Getting Started Guide
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Lead Management FAQ
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Billing & Subscriptions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              API Documentation
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Video className="w-5 h-5 mr-2" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <p className="font-medium text-sm">{tutorial.title}</p>
                  <p className="text-xs text-muted-foreground">{tutorial.duration}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
