import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { companyData } from "@/data/companyData";
import { ChevronRight } from "lucide-react";
import AlterarPreferenciasButton from "@/app/cookies/AlterarPreferenciasButton";

export const metadata: Metadata = {
  title: "Cookies",
  description:
    "Informações sobre o uso de cookies neste site, em conformidade com a LGPD.",
  alternates: { canonical: "/cookies" },
};

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "Cookies", href: "/cookies" },
];

export default function CookiesPage() {
  return (
    <SiteShell>
      <main className="min-h-screen">
        <div className="mx-auto max-w-[720px] px-6 py-10">
          <nav
            aria-label="Navegação estrutural"
            className="mb-8 flex items-center gap-1 text-sm text-muted-foreground"
          >
            {breadcrumbItems.map((item, i) => (
              <span key={item.href} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-text-faint"
                    aria-hidden
                  />
                )}
                {i === breadcrumbItems.length - 1 ? (
                  <span className="text-foreground">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          <h1 className="mb-2 font-heading text-2xl font-bold text-foreground">
            Uso de cookies
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Esta página explica o que são cookies, como os utilizamos e como
            você pode gerenciar suas preferências, em conformidade com a LGPD.
          </p>

          <section className="space-y-6 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="mb-2 font-heading text-base font-semibold text-foreground">
                O que são cookies?
              </h2>
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu
                dispositivo quando você visita um site. Eles permitem lembrar
                preferências, melhorar a navegação e, com autorização, auxiliar
                em análises de uso.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-heading text-base font-semibold text-foreground">
                Cookies essenciais
              </h2>
              <p>
                São necessários para o funcionamento básico do site e não exigem
                consentimento prévio por serem estritamente necessários ao
                serviço.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-heading text-base font-semibold text-foreground">
                Cookies opcionais
              </h2>
              <p>
                Podem ser usados para analytics e melhoria de experiência. Só
                são utilizados com seu consentimento prévio.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-heading text-base font-semibold text-foreground">
                Como alterar suas preferências
              </h2>
              <p className="mb-4">
                Revise e altere suas preferências a qualquer momento. Contato:{" "}
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-primary hover:underline"
                >
                  {companyData.email}
                </a>
                .
              </p>
              <AlterarPreferenciasButton />
            </div>

            <p className="pt-4 text-xs">
              Consulte também a{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-primary hover:underline"
              >
                Política de Privacidade
              </Link>{" "}
              e os{" "}
              <Link href="/termos-de-uso" className="text-primary hover:underline">
                Termos de Uso
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}
