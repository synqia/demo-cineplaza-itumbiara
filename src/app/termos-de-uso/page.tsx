import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { companyData } from "@/data/companyData";
import { ChevronRight } from "lucide-react";
import { termsOfUseTitle, getTermsOfUseContent } from "@/data/legalContent";

export const metadata: Metadata = {
  title: termsOfUseTitle,
  description: `Termos de Uso do site da ${companyData.companyName}.`,
  alternates: { canonical: "/termos-de-uso" },
};

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export default function TermosDeUsoPage() {
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
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {termsOfUseTitle}
          </h1>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: getTermsOfUseContent() }}
          />
        </div>
      </main>
    </SiteShell>
  );
}
