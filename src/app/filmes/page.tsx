import type { Metadata } from "next";
import { Suspense } from "react";
import SiteShell from "@/components/layout/SiteShell";
import FilmesClient from "@/components/filmes/FilmesClient";
import LoadingSkeleton from "@/components/cinema/LoadingSkeleton";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLdMovieTheater";

export const metadata: Metadata = {
  title: "Filmes",
  description:
    "Filmes em cartaz, pré-venda e próximos lançamentos no Cineplaza.",
  alternates: { canonical: "/filmes" },
};

export default function FilmesPage() {
  return (
    <SiteShell>
      <JsonLdBreadcrumb
        items={[
          { name: "Início", path: "/" },
          { name: "Filmes", path: "/filmes" },
        ]}
      />
      <main>
        <Suspense
          fallback={
            <div className="container-cine section-padding">
              <LoadingSkeleton rows={3} />
            </div>
          }
        >
          <FilmesClient />
        </Suspense>
      </main>
    </SiteShell>
  );
}
