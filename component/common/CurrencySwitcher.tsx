"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { currencies, type CurrencyCode } from "@/app/currency-config";
import { Dropdown } from "@/component/motion/Dropdown";
import { useCurrency } from "@/component/providers/CurrencyProvider";

export function CurrencySwitcher() {
  const [open, setOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const current = currencies.find((c) => c.code === currency) ?? currencies[0];

  const handleSelect = (code: CurrencyCode) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Select currency"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-(--radius-md) px-2 py-1.5 text-sm transition-colors hover:bg-(--color-bg)"
      >
        {current.symbol} {current.code}
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 cursor-default"
        />
      )}

      <Dropdown
        show={open}
        className="absolute start-0 top-full z-30 mt-1 max-h-[320px] min-w-[140px] overflow-y-auto rounded-(--radius-md) border border-(--color-border) bg-(--color-surface) py-1 shadow-xl"
      >
        {currencies.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => handleSelect(c.code)}
            className={`flex w-full items-center gap-2 px-3 py-2 text-start text-sm transition-colors hover:bg-(--color-bg) ${
              c.code === currency ? "font-semibold text-(--color-primary)" : "text-(--color-dark)"
            }`}
          >
            {c.symbol} {c.code}
          </button>
        ))}
      </Dropdown>
    </div>
  );
}
