"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { movies, getMovieById, formatDuration } from "@/data/movies";
import { filterSessions, getScheduleDates } from "@/data/sessions";
import DateSelector from "@/components/cinema/DateSelector";
import SessionGroup from "@/components/cinema/SessionGroup";
import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import EmptyState from "@/components/cinema/EmptyState";
import LoadingSkeleton from "@/components/cinema/LoadingSkeleton";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { Button } from "@/components/ui/button";
import type { Session } from "@/types/cinema";
import Link from "next/link";

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

export default function ProgramacaoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dates = useMemo(() => getScheduleDates(7), []);
  const { openPurchase } = useTicketPurchase();
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [date, setDate] = useState(searchParams.get("data") || dates[0]);
  const [movieId, setMovieId] = useState(searchParams.get("filme") || "");
  const [genre, setGenre] = useState(searchParams.get("genero") || "");
  const [language, setLanguage] = useState(searchParams.get("idioma") || "");
  const [format, setFormat] = useState(searchParams.get("formato") || "");

  const bumpLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, [date, movieId, genre, language, format]);

  const genres = useMemo(
    () =>
      Array.from(new Set(movies.flatMap((movie) => movie.genre))).sort(),
    []
  );

  const syncUrl = (next: {
    date?: string;
    movieId?: string;
    genre?: string;
    language?: string;
    format?: string;
  }) => {
    const params = new URLSearchParams();
    const d = next.date ?? date;
    const m = next.movieId ?? movieId;
    const g = next.genre ?? genre;
    const l = next.language ?? language;
    const f = next.format ?? format;
    if (d) params.set("data", d);
    if (m) params.set("filme", m);
    if (g) params.set("genero", g);
    if (l) params.set("idioma", l);
    if (f) params.set("formato", f);
    startTransition(() => {
      router.replace(`/programacao?${params.toString()}`, { scroll: false });
    });
  };

  const clearFilters = () => {
    bumpLoading();
    setMovieId("");
    setGenre("");
    setLanguage("");
    setFormat("");
    setDate(dates[0]);
    syncUrl({
      date: dates[0],
      movieId: "",
      genre: "",
      language: "",
      format: "",
    });
  };

  const sessions = filterSessions({
    date,
    movieId: movieId || undefined,
    genre: genre || undefined,
    language: language || undefined,
    format: format || undefined,
  });

  const movieIds = Array.from(new Set(sessions.map((item) => item.movieId)));

  const filtersForm = (
    <div className="space-y-3">
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted-foreground">Filme</span>
        <select
          value={movieId}
          onChange={(event) => {
            bumpLoading();
            setMovieId(event.target.value);
            syncUrl({ movieId: event.target.value });
          }}
          className="h-11 w-full rounded-xl border border-border bg-surface-elevated px-3"
        >
          <option value="">Todos</option>
          {movies
            .filter(
              (movie) =>
                movie.status === "now-showing" || movie.status === "pre-sale"
            )
            .map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted-foreground">Gênero</span>
        <select
          value={genre}
          onChange={(event) => {
            bumpLoading();
            setGenre(event.target.value);
            syncUrl({ genre: event.target.value });
          }}
          className="h-11 w-full rounded-xl border border-border bg-surface-elevated px-3"
        >
          <option value="">Todos</option>
          {genres.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted-foreground">Idioma</span>
        <select
          value={language}
          onChange={(event) => {
            bumpLoading();
            setLanguage(event.target.value);
            syncUrl({ language: event.target.value });
          }}
          className="h-11 w-full rounded-xl border border-border bg-surface-elevated px-3"
        >
          <option value="">Todos</option>
          <option value="Dublado">Dublado</option>
          <option value="Legendado">Legendado</option>
          <option value="Original">Original</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted-foreground">Formato</span>
        <select
          value={format}
          onChange={(event) => {
            bumpLoading();
            setFormat(event.target.value);
            syncUrl({ format: event.target.value });
          }}
          className="h-11 w-full rounded-xl border border-border bg-surface-elevated px-3"
        >
          <option value="">Todos</option>
          <option value="2D">2D</option>
          <option value="3D">3D</option>
          <option value="Premium">Premium</option>
        </select>
      </label>
      <Button type="button" variant="outline" className="h-11 w-full" onClick={clearFilters}>
        Limpar filtros
      </Button>
    </div>
  );

  return (
    <div className="section-padding">
      <div className="container-cine">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.75rem)] font-bold">
            Programação
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Consulte horários por data, filme, gênero, idioma e formato. Sua
            próxima história começa aqui.
          </p>
        </div>

        <DateSelector
          dates={dates}
          selected={date}
          onChange={(next) => {
            bumpLoading();
            setDate(next);
            syncUrl({ date: next });
          }}
          className="mb-6"
        />

        <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
          <p className="text-sm text-muted-foreground">
            {pending ? "Atualizando…" : `${movieIds.length} filme(s)`}
          </p>
          <Button
            type="button"
            variant="outline"
            className="h-11"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        <div id="grade" className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-2xl border border-border bg-surface p-4 lg:block">
            <h2 className="mb-4 font-heading text-lg font-semibold">Filtros</h2>
            {filtersForm}
          </aside>

          <div>
            {loading ? (
              <LoadingSkeleton rows={4} />
            ) : movieIds.length === 0 ? (
              <EmptyState
                variant="search"
                title="Nenhuma sessão encontrada"
                description="Ajuste os filtros ou escolha outra data para ver mais horários."
                actionLabel="Limpar filtros"
                onAction={clearFilters}
              />
            ) : (
              <div className="space-y-4">
                {movieIds.map((id) => {
                  const movie = getMovieById(id);
                  if (!movie) return null;
                  const movieSessions = sessions.filter(
                    (session) => session.movieId === id
                  );
                  const groups = groupSessions(movieSessions);
                  return (
                    <article
                      key={id}
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
                              <h2 className="font-heading text-xl font-semibold">
                                <Link href={`/filmes/${movie.slug}`}>
                                  {movie.title}
                                </Link>
                              </h2>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {movie.genre.join(" · ")} ·{" "}
                                {formatDuration(movie.duration)}
                              </p>
                            </div>
                            <AgeRatingBadge rating={movie.ageRating} size="md" />
                          </div>
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
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-70 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Fechar filtros"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-border bg-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Filtros</h2>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                aria-label="Fechar"
                onClick={() => setFiltersOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filtersForm}
            <Button
              type="button"
              className="mt-4 h-11 w-full"
              onClick={() => setFiltersOpen(false)}
            >
              Ver resultados
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
