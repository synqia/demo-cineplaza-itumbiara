import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/layout/SiteShell";
import { companyData } from "@/data/companyData";
import { ChevronRight } from "lucide-react";
import {
  privacyPolicyTitle,
  getPrivacyPolicyContent,
} from "@/data/legalContent";

export const metadata: Metadata = {
  title: privacyPolicyTitle,
  description: `Política de Privacidade da ${companyData.companyName}. Informações sobre coleta, uso e proteção de dados pessoais em conformidade com a LGPD.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

const breadcrumbItems = [
  { label: "Início", href: "/" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];

export default function PoliticaDePrivacidadePage() {
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
            {privacyPolicyTitle}
          </h1>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: getPrivacyPolicyContent() }}
          />
        </div>
      </main>
    </SiteShell>
  );
}
