"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Movie } from "@/types/cinema";
import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import TrailerDialog from "@/components/cinema/TrailerDialog";
import { formatDuration } from "@/data/movies";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  movies: Movie[];
}

const badgeByStatus: Record<string, string> = {
  "now-showing": "Em cartaz",
  "pre-sale": "Pré-venda",
  "coming-soon": "Em breve",
};

export default function HeroCarousel({ movies }: HeroCarouselProps) {
  const slides = movies.slice(0, 3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { openPurchase } = useTicketPurchase();
  const current = slides[index];
  const slideCount = slides.length;

  const goTo = (next: number) => {
    if (slideCount === 0) return;
    setIndex((next + slideCount) % slideCount);
  };

  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slideCount);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, slideCount]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        setPaused(true);
        setIndex((prev) => (prev - 1 + slideCount) % slideCount);
      }
      if (event.key === "ArrowRight") {
        setPaused(true);
        setIndex((prev) => (prev + 1) % slideCount);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [slideCount]);

  if (!current) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-background"
      aria-roledescription="carrossel"
      aria-label="Destaques Cineplaza"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className="relative min-h-130 sm:min-h-140 lg:min-h-160">
        {slides.map((movie, slideIndex) => (
          <div
            key={movie.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            aria-hidden={slideIndex !== index}
          >
            <ImageWithFallback
              src={movie.backdropUrl}
              alt=""
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="cinema-gradient absolute inset-0" />
            <div className="cinema-gradient-side absolute inset-0 hidden md:block" />
          </div>
        ))}

        <div className="container-cine relative flex min-h-130 items-end pb-20 pt-28 sm:min-h-140 sm:pb-24 lg:min-h-160 lg:items-center lg:pb-28">
          <div className="max-w-xl space-y-4 animate-fade-in-up">
            <span className="inline-flex rounded-md bg-primary/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
              {current.isNewRelease
                ? "Estreia da semana"
                : badgeByStatus[current.status]}
            </span>
            <h1 className="font-heading text-[clamp(2rem,6vw,3.75rem)] font-bold leading-[1.05] text-foreground text-balance">
              {current.title}
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-foreground/90 sm:text-base">
              {current.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <AgeRatingBadge rating={current.ageRating} />
              <span>{current.genre.join(" · ")}</span>
              <span aria-hidden>·</span>
              <span>{formatDuration(current.duration)}</span>
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                onClick={() => {
                  setPaused(true);
                  openPurchase({ movieId: current.id });
                }}
              >
                Comprar ingressos
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-6 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-surface"
                onClick={() => {
                  setPaused(true);
                  setTrailerOpen(true);
                }}
              >
                <Play className="h-4 w-4" aria-hidden />
                Assistir trailer
              </button>
              <Link
                href={`/filmes/${current.slug}`}
                className="inline-flex h-12 items-center justify-center rounded-xl px-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline sm:px-4"
              >
                Ver detalhes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-cine absolute inset-x-0 bottom-4 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Slides do hero">
          {slides.map((movie, slideIndex) => (
            <button
              key={movie.id}
              type="button"
              role="tab"
              aria-selected={slideIndex === index}
              aria-label={`Ir para ${movie.title}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                slideIndex === index
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-white/35 hover:bg-white/60"
              )}
              onClick={() => {
                setPaused(true);
                setIndex(slideIndex);
              }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/50 text-foreground backdrop-blur-sm hover:bg-surface"
            aria-label="Slide anterior"
            onClick={() => {
              setPaused(true);
              goTo(index - 1);
            }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/50 text-foreground backdrop-blur-sm hover:bg-surface"
            aria-label="Próximo slide"
            onClick={() => {
              setPaused(true);
              goTo(index + 1);
            }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <TrailerDialog
        open={trailerOpen}
        onOpenChange={setTrailerOpen}
        title={current.title}
        trailerUrl={current.trailerUrl}
      />
    </section>
  );
}
