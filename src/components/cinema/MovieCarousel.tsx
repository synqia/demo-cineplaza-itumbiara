"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Movie } from "@/types/cinema";
import MovieCard from "@/components/cinema/MovieCard";
import { cn } from "@/lib/utils";

interface MovieCarouselProps {
  movies: Movie[];
  onBuyTickets?: (movieId: string) => void;
  className?: string;
}

export default function MovieCarousel({
  movies,
  onBuyTickets,
  className,
}: MovieCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 280, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <div className="mb-3 hidden justify-end gap-2 md:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-surface-elevated"
          aria-label="Filmes anteriores"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground hover:bg-surface-elevated"
          aria-label="Próximos filmes"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="grid auto-cols-42 grid-flow-col gap-3 overflow-x-auto pb-2 snap-x snap-mandatory sm:auto-cols-45 md:grid-flow-row md:auto-cols-auto md:grid-cols-3 md:overflow-visible lg:grid-cols-4 xl:grid-cols-5"
      >
        {movies.map((movie, index) => (
          <div key={movie.id} className="snap-start">
            <MovieCard
              movie={movie}
              onBuyTickets={onBuyTickets}
              priority={index < 2}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
