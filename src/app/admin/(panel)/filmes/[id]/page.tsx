"use client";

import { useParams } from "next/navigation";

import MovieForm from "@/components/admin/MovieForm";
import { useAdmin } from "@/components/admin/AdminProvider";

export default function EditMoviePage() {
  const params = useParams<{ id: string }>();
  const { getMovie } = useAdmin();
  const movie = getMovie(params.id);

  if (!movie) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="font-heading text-xl">Filme não encontrado</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Este identificador não existe nesta sessão demonstrativa.
        </p>
      </div>
    );
  }

  return <MovieForm movieId={params.id} />;
}
