"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cinemaInfo } from "@/data/cinema";
import { getNowShowingMovies } from "@/data/movies";
import { getScheduleDates } from "@/data/sessions";
import { Button } from "@/components/ui/button";

export default function SessionFinder() {
  const router = useRouter();
  const dates = useMemo(() => getScheduleDates(7), []);
  const movies = useMemo(() => getNowShowingMovies(), []);
  const [date, setDate] = useState(dates[0]);
  const [movieId, setMovieId] = useState("");
  const [format, setFormat] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (date) params.set("data", date);
    if (movieId) params.set("filme", movieId);
    if (format) params.set("formato", format);
    router.push(`/programacao?${params.toString()}#grade`);
  };

  return (
    <section className="container-cine relative z-0 mt-8 sm:mt-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-card) sm:p-6"
      >
        <div className="mb-4">
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Encontre sua sessão
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Unidade: {cinemaInfo.locationLabel}
          </p>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr_1fr_auto]">
          <label className="block space-y-1.5 text-sm">
            <span className="text-muted-foreground">Data</span>
            <select
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-surface-elevated px-3 text-foreground"
            >
              {dates.map((item) => (
                <option key={item} value={item}>
                  {new Date(`${item}T12:00:00`).toLocaleDateString("pt-BR", {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                  })}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="text-muted-foreground">Filme</span>
            <select
              value={movieId}
              onChange={(event) => setMovieId(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-surface-elevated px-3 text-foreground"
            >
              <option value="">Todos os filmes</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5 text-sm">
            <span className="text-muted-foreground">Formato (opcional)</span>
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-surface-elevated px-3 text-foreground"
            >
              <option value="">Qualquer</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="Premium">Premium</option>
            </select>
          </label>
          <div className="flex items-end">
            <Button
              type="submit"
              className="h-12 w-full bg-primary px-6 hover:bg-primary-hover lg:min-w-40"
            >
              Ver horários
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
