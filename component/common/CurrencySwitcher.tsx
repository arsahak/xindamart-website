"use client";

import { currencies, type CurrencyCode } from "@/app/currency-config";
import { useCurrency } from "@/component/providers/CurrencyProvider";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      aria-label="Select currency"
      value={currency}
      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      className="!w-auto !py-1 !px-2 !text-sm"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.code} ({c.symbol})
        </option>
      ))}
    </select>
  );
}
