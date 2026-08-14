import type { AgeRating } from "@/types/cinema";
import {
  ageRatingColors,
  ageRatingLabels,
  getAgeRatingAriaLabel,
} from "@/lib/cinema";
import { cn } from "@/lib/utils";

interface AgeRatingBadgeProps {
  rating: AgeRating;
  className?: string;
  size?: "sm" | "md";
}

export default function AgeRatingBadge({
  rating,
  className,
  size = "sm",
}: AgeRatingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md font-heading font-bold uppercase tracking-wide",
        size === "sm" ? "h-6 min-w-6 px-1.5 text-[11px]" : "h-8 min-w-8 px-2 text-sm",
        ageRatingColors[rating],
        className
      )}
      aria-label={getAgeRatingAriaLabel(rating)}
      title={ageRatingLabels[rating]}
    >
      {rating === "L" ? "L" : rating}
    </span>
  );
}
