import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Logo from "@/components/cinema/Logo";
import { cinemaInfo, fullAddress } from "@/data/cinema";

const columns = [
  {
    title: "Explorar",
    links: [
      { href: "/programacao", label: "Programação" },
      { href: "/filmes", label: "Filmes" },
      { href: "/cardapio", label: "Cardápio" },
      { href: "/o-cineplaza", label: "Institucional" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { href: "/o-cineplaza#acessibilidade", label: "Acessibilidade" },
      { href: "/o-cineplaza#faq", label: "Perguntas frequentes" },
      { href: "/o-cineplaza#localizacao", label: "Contato" },
      { href: "/politica-de-privacidade", label: "Política de privacidade" },
      { href: "/termos-de-uso", label: "Termos de uso" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-cine section-padding grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo href="/" />
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {cinemaInfo.description}
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {fullAddress}
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" aria-hidden />
              {cinemaInfo.phone}
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" aria-hidden />
              {cinemaInfo.email}
            </p>
          </div>
          <div className="flex gap-2 pt-2">
            {cinemaInfo.social.instagram ? (
              <a
                href={cinemaInfo.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-surface-elevated"
                aria-label={cinemaInfo.social.instagram.label}
              >
                <Instagram className="h-4 w-4" />
              </a>
            ) : null}
            {cinemaInfo.social.facebook ? (
              <a
                href={cinemaInfo.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-surface-elevated"
                aria-label={cinemaInfo.social.facebook.label}
              >
                <Facebook className="h-4 w-4" />
              </a>
            ) : null}
            {cinemaInfo.social.youtube ? (
              <a
                href={cinemaInfo.social.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-surface-elevated"
                aria-label={cinemaInfo.social.youtube.label}
              >
                <Youtube className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-cine flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Cineplaza. Todos os direitos reservados.</p>
          <p>
            Site demonstrativo desenvolvido como protótipo. Programação, filmes,
            preços e promoções são ilustrativos.
          </p>
        </div>
      </div>
    </footer>
  );
}
