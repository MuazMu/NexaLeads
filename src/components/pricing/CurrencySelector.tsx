
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Currency } from "@/types/subscription";

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencySelector({ currencies, selectedCurrency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Currency:</span>
      <Select
        value={selectedCurrency.code}
        onValueChange={(value) => {
          const currency = currencies.find(c => c.code === value);
          if (currency) onCurrencyChange(currency);
        }}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.symbol} {currency.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
