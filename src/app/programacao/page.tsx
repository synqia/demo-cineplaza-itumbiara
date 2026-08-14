import type { Metadata } from "next";
import { Suspense } from "react";
import SiteShell from "@/components/layout/SiteShell";
import ProgramacaoClient from "@/components/programacao/ProgramacaoClient";
import LoadingSkeleton from "@/components/cinema/LoadingSkeleton";
import { JsonLdBreadcrumb } from "@/components/seo/JsonLdMovieTheater";

export const metadata: Metadata = {
  title: "Programação",
  description:
    "Consulte a programação completa do Cineplaza: datas, horários, formatos e idiomas.",
  alternates: { canonical: "/programacao" },
};

export default function ProgramacaoPage() {
  return (
    <SiteShell>
      <JsonLdBreadcrumb
        items={[
          { name: "Início", path: "/" },
          { name: "Programação", path: "/programacao" },
        ]}
      />
      <main>
        <Suspense
          fallback={
            <div className="container-cine section-padding">
              <LoadingSkeleton rows={4} />
            </div>
          }
        >
          <ProgramacaoClient />
        </Suspense>
      </main>
    </SiteShell>
  );
}
