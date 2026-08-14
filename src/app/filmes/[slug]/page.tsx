import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import MovieDetailClient from "@/components/filmes/MovieDetailClient";
import {
  JsonLdBreadcrumb,
  JsonLdMovie,
} from "@/components/seo/JsonLdMovieTheater";
import { getAllMovieSlugs, getMovieBySlug } from "@/data/movies";
import { getBaseUrl } from "@/lib/env";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllMovieSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);
  if (!movie) {
    return { title: "Filme não encontrado" };
  }

  return {
    title: movie.title,
    description: movie.shortDescription,
    alternates: { canonical: `/filmes/${movie.slug}` },
    openGraph: {
      title: `${movie.title} | Cineplaza`,
      description: movie.shortDescription,
      images: [{ url: movie.backdropUrl, alt: movie.title }],
    },
  };
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);
  if (!movie) notFound();

  const baseUrl = getBaseUrl() || "https://www.cineplaza.demo.br";

  return (
    <SiteShell>
      <JsonLdBreadcrumb
        items={[
          { name: "Início", path: "/" },
          { name: "Filmes", path: "/filmes" },
          { name: movie.title, path: `/filmes/${movie.slug}` },
        ]}
      />
      <JsonLdMovie
        title={movie.title}
        description={movie.synopsis}
        image={movie.posterUrl}
        director={movie.director}
        datePublished={movie.releaseDate}
        url={`${baseUrl.replace(/\/$/, "")}/filmes/${movie.slug}`}
      />
      <MovieDetailClient movie={movie} />
    </SiteShell>
  );
}
