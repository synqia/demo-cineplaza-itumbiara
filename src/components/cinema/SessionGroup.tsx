import type { Session } from "@/types/cinema";
import SessionTimeButton from "@/components/cinema/SessionTimeButton";

interface SessionGroupProps {
  format: string;
  language: string;
  sessions: Session[];
  onSelectSession?: (session: Session) => void;
}

export default function SessionGroup({
  format,
  language,
  sessions,
  onSelectSession,
}: SessionGroupProps) {
  if (sessions.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {format} · {language}
      </p>
      <div className="flex flex-wrap gap-2">
        {sessions.map((session) => (
          <SessionTimeButton
            key={session.id}
            session={session}
            onSelect={onSelectSession}
          />
        ))}
      </div>
    </div>
  );
}
