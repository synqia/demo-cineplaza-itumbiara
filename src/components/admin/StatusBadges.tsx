import { Badge } from "@/components/ui/badge";
import { movieStatusLabels, saleStatusLabels } from "@/lib/admin";
import { cn } from "@/lib/utils";
import type { AdminMovieStatus, AlertSeverity, SaleStatus } from "@/types/admin";

const movieStatusClass: Record<AdminMovieStatus, string> = {
  "now-showing": "bg-emerald-500/15 text-emerald-400",
  "coming-soon": "bg-sky-500/15 text-sky-400",
  "pre-sale": "bg-accent/15 text-accent",
  archived: "bg-muted text-muted-foreground",
  draft: "bg-secondary text-secondary-foreground",
};

const saleStatusClass: Record<SaleStatus, string> = {
  paid: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-accent/15 text-accent",
  cancelled: "bg-muted text-muted-foreground",
  refunded: "bg-primary/15 text-primary",
};

const severityClass: Record<AlertSeverity, string> = {
  critical: "bg-primary/15 text-primary",
  warning: "bg-accent/15 text-accent",
  info: "bg-sky-500/15 text-sky-400",
};

export function MovieStatusBadge({ status }: { status: AdminMovieStatus }) {
  return (
    <Badge className={cn("rounded-md", movieStatusClass[status])} variant="secondary">
      {movieStatusLabels[status]}
    </Badge>
  );
}

export function SaleStatusBadge({ status }: { status: SaleStatus }) {
  return (
    <Badge className={cn("rounded-md", saleStatusClass[status])} variant="secondary">
      {saleStatusLabels[status]}
    </Badge>
  );
}

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const labels = { critical: "Crítico", warning: "Atenção", info: "Info" };
  return (
    <Badge className={cn("rounded-md", severityClass[severity])} variant="secondary">
      {labels[severity]}
    </Badge>
  );
}
