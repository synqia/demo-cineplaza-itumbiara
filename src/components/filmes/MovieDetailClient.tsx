"use client";

import { useMemo, useState } from "react";
import type { Movie } from "@/types/cinema";
import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import DateSelector from "@/components/cinema/DateSelector";
import SessionGroup from "@/components/cinema/SessionGroup";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import MovieCard from "@/components/cinema/MovieCard";
import TrailerDialog from "@/components/cinema/TrailerDialog";
import EmptyState from "@/components/cinema/EmptyState";
import { formatDuration, getRelatedMovies } from "@/data/movies";
import { getScheduleDates, getSessionsByMovie } from "@/data/sessions";
import { formatReleaseDate } from "@/lib/cinema";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { Play } from "lucide-react";
import type { Session } from "@/types/cinema";

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

export default function MovieDetailClient({ movie }: { movie: Movie }) {
  const dates = useMemo(() => getScheduleDates(7), []);
  const [date, setDate] = useState(dates[0]);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { openPurchase } = useTicketPurchase();
  const related = getRelatedMovies(movie);
  const sessions = getSessionsByMovie(movie.id, date);
  const groups = groupSessions(sessions);
  const canBuy =
    movie.status === "now-showing" || movie.status === "pre-sale";

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={movie.backdropUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="cinema-gradient absolute inset-0" />
        </div>
        <div className="container-cine relative grid gap-8 pb-12 pt-24 lg:grid-cols-[220px_1fr] lg:pb-16 lg:pt-28">
          <div className="relative mx-auto aspect-2/3 w-48 overflow-hidden rounded-2xl border border-border shadow-(--shadow-card) sm:w-56 lg:mx-0 lg:w-full">
            <ImageWithFallback
              src={movie.posterUrl}
              alt={`Pôster de ${movie.title}`}
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 self-end">
            <div className="flex flex-wrap items-center gap-3">
              <AgeRatingBadge rating={movie.ageRating} size="md" />
              <span className="text-sm text-muted-foreground">
                {movie.genre.join(" · ")} · {formatDuration(movie.duration)} ·{" "}
                {new Date(`${movie.releaseDate}T12:00:00`).getFullYear()}
              </span>
            </div>
            <h1 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight">
              {movie.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Título original: {movie.originalTitle}
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/90 sm:text-base">
              {movie.synopsis}
            </p>
            <dl className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <dt className="inline font-medium text-foreground">Direção: </dt>
                <dd className="inline">{movie.director}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Elenco: </dt>
                <dd className="inline">{movie.cast.join(", ")}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">
                  Distribuidora:{" "}
                </dt>
                <dd className="inline">{movie.distributor}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Estreia: </dt>
                <dd className="inline">{formatReleaseDate(movie.releaseDate)}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Idiomas: </dt>
                <dd className="inline">{movie.languages.join(", ")}</dd>
              </div>
              <div>
                <dt className="inline font-medium text-foreground">Formatos: </dt>
                <dd className="inline">{movie.formats.join(", ")}</dd>
              </div>
            </dl>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {canBuy ? (
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
                  onClick={() => openPurchase({ movieId: movie.id })}
                >
                  Comprar ingressos
                </button>
              ) : null}
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-6 text-sm font-semibold backdrop-blur-sm hover:bg-surface"
                onClick={() => setTrailerOpen(true)}
              >
                <Play className="h-4 w-4" aria-hidden />
                Assistir trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-cine space-y-6">
          <div>
            <h2 className="font-heading text-2xl font-bold">Sessões</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione a data e escolha o horário disponível.
            </p>
          </div>
          {canBuy ? (
            <>
              <DateSelector dates={dates} selected={date} onChange={setDate} />
              {groups.length === 0 ? (
                <EmptyState
                  title="Sem sessões nesta data"
                  description="Escolha outro dia ou volte em breve para novas sessões."
                />
              ) : (
                <div className="space-y-5 rounded-2xl border border-border bg-surface p-5">
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
              )}
            </>
          ) : (
            <EmptyState
              title="Em breve nas telas do Cineplaza"
              description="Este título ainda não está disponível para compra de ingressos."
              actionLabel="Ver outros filmes"
              onAction={() => {
                window.location.href = "/filmes";
              }}
            />
          )}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-padding pt-0">
          <div className="container-cine">
            <h2 className="mb-6 font-heading text-2xl font-bold">
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  className="w-full"
                  onBuyTickets={
                    item.status === "now-showing" || item.status === "pre-sale"
                      ? (id) => openPurchase({ movieId: id })
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TrailerDialog
        open={trailerOpen}
        onOpenChange={setTrailerOpen}
        title={movie.title}
        trailerUrl={movie.trailerUrl}
      />
    </main>
  );
}
