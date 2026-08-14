"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Movie, Session } from "@/types/cinema";
import DateSelector from "@/components/cinema/DateSelector";
import SessionGroup from "@/components/cinema/SessionGroup";
import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import EmptyState from "@/components/cinema/EmptyState";
import { formatDuration } from "@/data/movies";
import { getScheduleDates, getSessionsByDate } from "@/data/sessions";
import { useTicketPurchase } from "@/components/providers/TicketProvider";

interface ScheduleSectionProps {
  movies: Movie[];
  initialDate?: string;
  title?: string;
  description?: string;
  showHeader?: boolean;
}

function groupSessions(sessions: Session[]) {
  const map = new Map<string, Session[]>();
  sessions.forEach((session) => {
    const key = `${session.format}__${session.language}`;
    const list = map.get(key) ?? [];
    list.push(session);
    map.set(key, list);
  });
  return Array.from(map.entries()).map(([key, items]) => {
    const [format, language] = key.split("__");
    return { format, language, sessions: items };
  });
}

export default function ScheduleSection({
  movies,
  initialDate,
  title = "Programação",
  description = "Escolha o dia, veja os horários e garanta seu lugar na próxima história.",
  showHeader = true,
}: ScheduleSectionProps) {
  const dates = useMemo(() => getScheduleDates(7), []);
  const [selectedDate, setSelectedDate] = useState(initialDate || dates[0]);
  const { openPurchase } = useTicketPurchase();
  const movieMap = useMemo(
    () => new Map(movies.map((movie) => [movie.id, movie])),
    [movies]
  );

  const daySessions = getSessionsByDate(selectedDate).filter((session) =>
    movieMap.has(session.movieId)
  );

  const movieIds = Array.from(new Set(daySessions.map((item) => item.movieId)));

  return (
    <section id="programacao" className="section-padding">
      <div className="container-cine">
        {showHeader ? (
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Hoje é dia de Cineplaza
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.6rem,3vw,2.25rem)] font-bold">
              {title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        ) : null}

        <DateSelector
          dates={dates}
          selected={selectedDate}
          onChange={setSelectedDate}
          className="mb-8"
        />

        {movieIds.length === 0 ? (
          <EmptyState
            title="Nenhuma sessão neste dia"
            description="Tente outra data ou confira os filmes em cartaz."
            actionLabel="Ver filmes"
            onAction={() => {
              window.location.href = "/filmes";
            }}
          />
        ) : (
          <div className="space-y-4">
            {movieIds.map((movieId) => {
              const movie = movieMap.get(movieId);
              if (!movie) return null;
              const sessions = daySessions.filter(
                (session) => session.movieId === movieId
              );
              const groups = groupSessions(sessions);

              return (
                <article
                  key={movieId}
                  className="rounded-2xl border border-border bg-surface p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                      href={`/filmes/${movie.slug}`}
                      className="relative mx-auto h-40 w-26.5 shrink-0 overflow-hidden rounded-xl sm:mx-0"
                    >
                      <ImageWithFallback
                        src={movie.posterUrl}
                        alt={`Pôster de ${movie.title}`}
                        fill
                        sizes="106px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1 space-y-4">
                      <div className="flex flex-wrap items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-heading text-xl font-semibold">
                            <Link
                              href={`/filmes/${movie.slug}`}
                              className="hover:text-primary"
                            >
                              {movie.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {movie.genre.join(" · ")} ·{" "}
                            {formatDuration(movie.duration)}
                          </p>
                        </div>
                        <AgeRatingBadge rating={movie.ageRating} size="md" />
                      </div>
                      <div className="space-y-4">
                        {groups.map((group) => (
                          <SessionGroup
                            key={`${group.format}-${group.language}`}
                            format={group.format}
                            language={group.language}
                            sessions={group.sessions}
                            onSelectSession={(session) =>
                              openPurchase({
                                movieId: movie.id,
                                sessionId: session.id,
                              })
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
