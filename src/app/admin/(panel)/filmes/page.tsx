"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";

import AgeRatingBadge from "@/components/cinema/AgeRatingBadge";
import { MovieStatusBadge } from "@/components/admin/StatusBadges";
import { useAdmin } from "@/components/admin/AdminProvider";
import { formatDuration, getMovieBySlug } from "@/data/movies";
import { formatNumber, movieStatusLabels } from "@/lib/admin";
import { toast } from "sonner";
import type { AdminMovie, AdminMovieStatus } from "@/types/admin";
import type { AgeRating } from "@/types/cinema";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const PAGE_SIZE = 6;
const statuses: Array<AdminMovieStatus | "all"> = [
  "all",
  "now-showing",
  "coming-soon",
  "pre-sale",
  "archived",
  "draft",
];

export default function AdminMoviesPage() {
  const { movies, duplicateMovie, archiveMovie, setMovieStatus } = useAdmin();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AdminMovieStatus | "all">("all");
  const [genre, setGenre] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState("title");
  const [view, setView] = useState<"table" | "cards">("table");
  const [page, setPage] = useState(1);
  const [archiveId, setArchiveId] = useState<string | null>(null);

  const genres = useMemo(
    () => Array.from(new Set(movies.flatMap((movie) => movie.genre))),
    [movies]
  );

  const filtered = useMemo(() => {
    const list = movies.filter((movie) => {
      if (query && !movie.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      if (status !== "all" && movie.status !== status) return false;
      if (genre !== "all" && !movie.genre.includes(genre)) return false;
      if (rating !== "all" && movie.ageRating !== rating) return false;
      return true;
    });
    return list.sort((a, b) => {
      if (sort === "tickets") return b.ticketsSold - a.ticketsSold;
      if (sort === "sessions") return b.futureSessions - a.futureSessions;
      return a.title.localeCompare(b.title, "pt-BR");
    });
  }, [movies, query, status, genre, rating, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const archiveTarget = movies.find((movie) => movie.id === archiveId);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl">Filmes</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} resultado{filtered.length === 1 ? "" : "s"} nesta demonstração
          </p>
        </div>
        <Link href="/admin/filmes/novo" className={buttonVariants()}>
          <Plus className="size-4" />
          Adicionar filme
        </Link>
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <Label htmlFor="movie-search" className="sr-only">
            Pesquisar título
          </Label>
          <Input
            id="movie-search"
            placeholder="Pesquisar pelo título"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => {
            if (value) setStatus(value as AdminMovieStatus | "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((item) => (
              <SelectItem key={item} value={item}>
                {item === "all" ? "Todos os status" : movieStatusLabels[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={genre}
          onValueChange={(value) => {
            if (value) setGenre(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os gêneros</SelectItem>
            {genres.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={rating}
          onValueChange={(value) => {
            if (value) setRating(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as classificações</SelectItem>
            {(["L", "10", "12", "14", "16", "18"] as AgeRating[]).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(value) => value && setSort(value)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Ordenar por título</SelectItem>
            <SelectItem value="tickets">Mais vendidos</SelectItem>
            <SelectItem value="sessions">Mais sessões futuras</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={view === "table" ? "default" : "outline"}
          onClick={() => setView("table")}
        >
          Tabela
        </Button>
        <Button
          size="sm"
          variant={view === "cards" ? "default" : "outline"}
          onClick={() => setView("cards")}
        >
          Cards
        </Button>
      </div>

      {view === "table" ? (
        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filme</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Classificação</TableHead>
                <TableHead>Estreia</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sessões</TableHead>
                <TableHead>Ingressos</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((movie) => (
                <TableRow key={movie.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={movie.posterUrl}
                        alt=""
                        className="h-12 w-8 rounded object-cover"
                      />
                      <span className="font-medium">{movie.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>{movie.genre.join(", ")}</TableCell>
                  <TableCell>{formatDuration(movie.duration)}</TableCell>
                  <TableCell>
                    <AgeRatingBadge rating={movie.ageRating} />
                  </TableCell>
                  <TableCell>
                    {new Date(`${movie.releaseDate}T12:00:00`).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>
                    <MovieStatusBadge status={movie.status} />
                  </TableCell>
                  <TableCell>{movie.futureSessions}</TableCell>
                  <TableCell>{formatNumber(movie.ticketsSold)}</TableCell>
                  <TableCell>
                    <MovieActions
                      movie={movie}
                      onArchive={() => setArchiveId(movie.id)}
                      onDuplicate={() => duplicateMovie(movie.id)}
                      onStatus={(next) => setMovieStatus(movie.id, next)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((movie) => (
            <Card key={movie.id}>
              <CardContent className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={movie.posterUrl}
                  alt=""
                  className="h-28 w-20 rounded object-cover"
                />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{movie.title}</p>
                    <MovieActions
                      movie={movie}
                      onArchive={() => setArchiveId(movie.id)}
                      onDuplicate={() => duplicateMovie(movie.id)}
                      onStatus={(next) => setMovieStatus(movie.id, next)}
                    />
                  </div>
                  <MovieStatusBadge status={movie.status} />
                  <p className="text-xs text-muted-foreground">
                    {movie.genre.join(", ")} · {formatDuration(movie.duration)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {movie.futureSessions} sessões futuras · {formatNumber(movie.ticketsSold)} ingressos
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Página {page} de {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((current) => current + 1)}
          >
            Próxima
          </Button>
        </div>
      </div>

      <Dialog open={Boolean(archiveId)} onOpenChange={(open) => !open && setArchiveId(null)}>
        <DialogContent title="Arquivar filme">
          <DialogDescription>
            Arquivar {archiveTarget?.title} remove o destaque operacional nesta
            demonstração. A alteração não é persistida no servidor.
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setArchiveId(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (archiveId) archiveMovie(archiveId);
                setArchiveId(null);
              }}
            >
              Arquivar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MovieActions({
  movie,
  onArchive,
  onDuplicate,
  onStatus,
}: {
  movie: AdminMovie;
  onArchive: () => void;
  onDuplicate: () => void;
  onStatus: (status: AdminMovieStatus) => void;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        aria-label={`Ações de ${movie.title}`}
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push(`/admin/filmes/${movie.id}`)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            if (getMovieBySlug(movie.slug)) {
              window.open(`/filmes/${movie.slug}`, "_blank");
            } else {
              toast.message("Filme não publicado no site", {
                description:
                  "Nesta demonstração, só os títulos em cartaz no site público possuem página.",
              });
            }
          }}
        >
          Visualizar no site
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDuplicate}>Duplicar</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/admin/sessoes")}>
          Gerenciar sessões
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Alterar status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {(Object.keys(movieStatusLabels) as AdminMovieStatus[]).map((item) => (
              <DropdownMenuItem key={item} onClick={() => onStatus(item)}>
                {movieStatusLabels[item]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onArchive}>
          Arquivar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
