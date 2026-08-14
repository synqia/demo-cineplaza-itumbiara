import { Film, SearchX, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: "empty" | "search" | "error";
  className?: string;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  variant = "empty",
  className,
}: EmptyStateProps) {
  const Icon = variant === "search" ? SearchX : variant === "error" ? AlertCircle : Film;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-border bg-surface px-6 py-14 text-center",
        className
      )}
      role="status"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-elevated text-muted-foreground">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      ) : null}
      {actionLabel && onAction ? (
        <Button type="button" className="mt-6 h-11 px-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
