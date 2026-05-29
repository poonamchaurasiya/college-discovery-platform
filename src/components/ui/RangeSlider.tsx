"use client";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  formatValue?: (v: number) => string;
  className?: string;
}

export function RangeSlider({ label, min, max, value, onChange, formatValue = formatCurrency, className }: RangeSliderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{formatValue(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600 cursor-pointer"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
