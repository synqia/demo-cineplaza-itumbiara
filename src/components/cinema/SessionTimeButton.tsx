"use client";

import type { Session } from "@/types/cinema";
import { sessionStatusCopy } from "@/lib/cinema";
import { Accessibility, Clock3, TicketX, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionTimeButtonProps {
  session: Session;
  onSelect?: (session: Session) => void;
}

export default function SessionTimeButton({
  session,
  onSelect,
}: SessionTimeButtonProps) {
  const meta = sessionStatusCopy[session.status];
  const disabled =
    session.status === "sold-out" || session.status === "ended";

  const icon =
    session.status === "few-seats" ? (
      <Users className="h-3.5 w-3.5" aria-hidden />
    ) : session.status === "sold-out" ? (
      <TicketX className="h-3.5 w-3.5" aria-hidden />
    ) : session.status === "ended" ? (
      <Clock3 className="h-3.5 w-3.5" aria-hidden />
    ) : null;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(session)}
      aria-label={`${session.time}, ${session.room}, ${meta.description}${
        session.accessibility ? ", com acessibilidade" : ""
      }`}
      className={cn(
        "inline-flex min-h-9 min-w-18 flex-col items-center justify-center gap-0.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors sm:min-h-11 sm:min-w-22 sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm",
        session.status === "available" &&
          "border-border bg-surface-elevated text-foreground hover:border-primary hover:bg-primary/10",
        session.status === "few-seats" &&
          "border-accent/50 bg-accent/10 text-accent hover:border-accent",
        session.status === "sold-out" &&
          "cursor-not-allowed border-border bg-muted/40 text-muted-foreground opacity-70",
        session.status === "ended" &&
          "cursor-not-allowed border-border bg-muted/30 text-muted-foreground line-through opacity-60"
      )}
    >
      <span className="inline-flex items-center gap-1 font-heading font-semibold">
        {icon}
        {session.time}
      </span>
      <span className="text-[10px] uppercase tracking-wide opacity-80">
        {session.room.replace("Sala ", "S")}
        {session.accessibility ? (
          <Accessibility className="ml-1 inline h-3 w-3" aria-hidden />
        ) : null}
      </span>
      <span className="sr-only">{meta.label}</span>
    </button>
  );
}
