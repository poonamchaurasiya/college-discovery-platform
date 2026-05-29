import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

export function StarRating({ rating, max = 5, size = "sm", showValue, className }: StarRatingProps) {
  const iconSize = sizeMap[size];
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={iconSize}
          className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : i < rating ? "fill-amber-200 text-amber-400" : "fill-slate-100 text-slate-300"}
        />
      ))}
      {showValue && <span className="text-sm font-semibold text-slate-700 ml-0.5">{rating.toFixed(1)}</span>}
    </span>
  );
}
