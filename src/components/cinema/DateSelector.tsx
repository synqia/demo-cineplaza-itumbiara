"use client";

import { formatDateLabel } from "@/lib/cinema";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  dates: string[];
  selected: string;
  onChange: (date: string) => void;
  className?: string;
}

export default function DateSelector({
  dates,
  selected,
  onChange,
  className,
}: DateSelectorProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
      role="tablist"
      aria-label="Selecionar data"
    >
      {dates.map((date) => {
        const label = formatDateLabel(date);
        const isSelected = date === selected;
        const badge = label.isToday
          ? "Hoje"
          : label.isTomorrow
            ? "Amanhã"
            : null;

        return (
          <button
            key={date}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(date)}
            className={cn(
              "flex min-w-19 shrink-0 flex-col items-center rounded-2xl border px-3 py-3 transition-colors",
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-foreground hover:border-primary/50 hover:bg-surface-elevated"
            )}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
              {badge ?? label.weekday}
            </span>
            <span className="font-heading text-xl font-bold leading-none">
              {label.day}
            </span>
            <span className="text-[11px] capitalize opacity-80">{label.month}</span>
          </button>
        );
      })}
    </div>
  );
}
