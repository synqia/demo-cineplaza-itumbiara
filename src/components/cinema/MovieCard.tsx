import Link from "next/link";
import type { Movie } from "@/types/cinema";
import { formatDuration } from "@/data/movies";
import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import ImageWithFallback from "@/components/cinema/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  onBuyTickets?: (movieId: string) => void;
  className?: string;
  priority?: boolean;
}

export default function MovieCard({
  movie,
  onBuyTickets,
  className,
  priority = false,
}: MovieCardProps) {
  const languageHint = movie.languages.slice(0, 2).join(" · ");

  return (
    <article
      className={cn(
        "group relative flex w-42 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 sm:w-auto",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-(--shadow-card-hover)",
        className
      )}
    >
      <Link
        href={`/filmes/${movie.slug}`}
        className="relative block poster-aspect overflow-hidden"
      >
        <ImageWithFallback
          src={movie.posterUrl}
          alt={`Pôster do filme ${movie.title}`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          {movie.isNewRelease ? (
            <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
              Estreia
            </span>
          ) : null}
          {movie.status === "pre-sale" ? (
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Pré-venda
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-2 right-2">
          <AgeRatingBadge rating={movie.ageRating} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <h3 className="font-heading text-base font-semibold leading-tight text-foreground line-clamp-2">
          <Link href={`/filmes/${movie.slug}`} className="hover:text-primary">
            {movie.title}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground">
          {movie.genre[0]} · {formatDuration(movie.duration)}
        </p>
        {languageHint ? (
          <p className="text-[11px] uppercase tracking-wide text-text-faint">
            {languageHint}
          </p>
        ) : null}

        <div className="mt-auto flex flex-col gap-2 pt-2 opacity-100 sm:opacity-95 sm:group-hover:opacity-100">
          {onBuyTickets &&
          (movie.status === "now-showing" || movie.status === "pre-sale") ? (
            <Button
              type="button"
              className="h-10 w-full bg-primary text-white hover:bg-primary-hover"
              onClick={() => onBuyTickets(movie.id)}
            >
              Ver sessões
            </Button>
          ) : null}
          <Link
            href={`/filmes/${movie.slug}`}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
