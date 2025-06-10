
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PricingPlan, Currency } from "@/types/subscription";

interface PricingCardProps {
  plan: PricingPlan;
  currency: Currency;
  onSubscribe: (planId: string) => void;
  isLoading: boolean;
  currentPlan?: string;
}

export function PricingCard({ plan, currency, onSubscribe, isLoading, currentPlan }: PricingCardProps) {
  const isCurrentPlan = currentPlan === plan.id;
  const price = plan.price[currency.code];
  const formattedPrice = (price / 100).toFixed(2);

  return (
    <Card className={`relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''} ${isCurrentPlan ? 'bg-accent' : ''}`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          <Star className="w-3 h-3 mr-1" />
          Most Popular
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {plan.name}
          {isCurrentPlan && (
            <Badge variant="secondary">Current Plan</Badge>
          )}
        </CardTitle>
        <CardDescription className="text-3xl font-bold">
          {currency.symbol}{formattedPrice}
          <span className="text-sm font-normal text-muted-foreground">/month</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => onSubscribe(plan.id)}
          disabled={isLoading || isCurrentPlan}
          variant={plan.popular ? "default" : "outline"}
        >
          {isLoading ? "Loading..." : isCurrentPlan ? "Current Plan" : "Get Started"}
        </Button>
      </CardFooter>
    </Card>
  );
}
