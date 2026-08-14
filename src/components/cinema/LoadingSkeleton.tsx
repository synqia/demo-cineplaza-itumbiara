import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  rows?: number;
}

export function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-surface-elevated/80",
        className
      )}
      aria-hidden
    />
  );
}

export default function LoadingSkeleton({
  className,
  rows = 3,
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn("space-y-4", className)}
      role="status"
      aria-label="Carregando conteúdo"
    >
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex gap-4 rounded-2xl border border-border bg-surface p-4"
        >
          <SkeletonBlock className="h-28 w-20 shrink-0" />
          <div className="flex-1 space-y-3 py-1">
            <SkeletonBlock className="h-5 w-2/3" />
            <SkeletonBlock className="h-4 w-1/2" />
            <SkeletonBlock className="h-9 w-40" />
          </div>
        </div>
      ))}
      <span className="sr-only">Carregando…</span>
    </div>
  );
}
