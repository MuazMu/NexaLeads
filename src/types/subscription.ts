
export interface PricingPlan {
  id: string;
  name: string;
  price: {
    EUR: number;
    USD: number;
    TRY: number;
  };
  features: string[];
  popular?: boolean;
  leads: number;
  countries: number;
  support: string;
}

export interface SubscriptionStatus {
  subscribed: boolean;
  status: 'active' | 'inactive' | 'trial';
  package_type: 'starter' | 'pro' | 'premium';
  current_period_end?: string;
  cancel_at_period_end?: boolean;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  description: string;
  created_at: string;
}

export interface Currency {
  code: 'EUR' | 'USD' | 'TRY';
  symbol: string;
  name: string;
}
