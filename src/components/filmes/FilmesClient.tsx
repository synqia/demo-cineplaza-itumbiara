"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { movies } from "@/data/movies";
import MovieCard from "@/components/cinema/MovieCard";
import EmptyState from "@/components/cinema/EmptyState";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { cn } from "@/lib/utils";
import type { MovieStatus } from "@/types/cinema";

const tabs: Array<{ id: string; label: string; statuses: MovieStatus[] }> = [
  { id: "em-cartaz", label: "Em cartaz", statuses: ["now-showing"] },
  {
    id: "em-breve",
    label: "Em breve",
    statuses: ["coming-soon", "pre-sale"],
  },
  { id: "pre-venda", label: "Pré-venda", statuses: ["pre-sale"] },
];

export default function FilmesClient() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("status") || "em-cartaz";
  const [tab, setTab] = useState(initial);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const { openPurchase } = useTicketPurchase();

  const genres = useMemo(
    () => Array.from(new Set(movies.flatMap((movie) => movie.genre))).sort(),
    []
  );

  const activeTab = tabs.find((item) => item.id === tab) ?? tabs[0];

  const filtered = movies.filter((movie) => {
    if (!activeTab.statuses.includes(movie.status)) return false;
    if (genre && !movie.genre.includes(genre)) return false;
    if (
      query &&
      !movie.title.toLowerCase().includes(query.trim().toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="section-padding">
      <div className="container-cine">
        <div className="mb-8 max-w-2xl">
          <h1 className="font-heading text-[clamp(1.8rem,4vw,2.75rem)] font-bold">
            Filmes
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Explore o que está em cartaz, as pré-vendas e os próximos
            lançamentos do Cineplaza.
          </p>
        </div>

        <div
          className="mb-6 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Status dos filmes"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={cn(
                "h-11 rounded-xl px-4 text-sm font-semibold transition-colors",
                tab === item.id
                  ? "bg-primary text-white"
                  : "border border-border bg-surface text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted-foreground">
              Buscar por título
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Digite o nome do filme"
              className="h-12 w-full rounded-xl border border-border bg-surface px-4"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-muted-foreground">Gênero</span>
            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-surface px-4"
            >
              <option value="">Todos</option>
              {genres.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            variant="search"
            title="Nenhum filme encontrado"
            description="Tente outro termo ou limpe os filtros de busca."
            actionLabel="Limpar busca"
            onAction={() => {
              setQuery("");
              setGenre("");
            }}
          />
        ) : (
          <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3">
            {filtered.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                className="w-full"
                onBuyTickets={
                  movie.status === "now-showing" || movie.status === "pre-sale"
                    ? (id) => openPurchase({ movieId: id })
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
