"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Menu,
  Phone,
  Navigation,
  X,
} from "lucide-react";
import Logo from "@/components/cinema/Logo";
import { cinemaInfo, fullAddress } from "@/data/cinema";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/programacao", label: "Programação" },
  { href: "/filmes", label: "Filmes" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/o-cineplaza", label: "O Cineplaza" },
];

export default function Header() {
  const pathname = usePathname();
  const { openPurchase } = useTicketPurchase();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const locationId = useId();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLocationOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Fecha o menu ao mudar de rota sem setState síncrono no effect do pathname
  useEffect(() => {
    const timer = window.setTimeout(() => setMenuOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="container-cine flex h-16 items-center justify-between gap-4 lg:h-18">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm text-foreground hover:bg-surface-elevated"
              aria-expanded={locationOpen}
              aria-controls={locationId}
              onClick={() => setLocationOpen((value) => !value)}
            >
              <MapPin className="h-4 w-4 text-primary" aria-hidden />
              <span className="max-w-35 truncate">
                {cinemaInfo.locationLabel}
              </span>
            </button>
            {locationOpen ? (
              <div
                id={locationId}
                role="dialog"
                aria-label="Informações da unidade"
                className="absolute right-0 top-[calc(100%+8px)] z-50 w-72 rounded-2xl border border-border bg-surface p-4 shadow-(--shadow-card)"
              >
                <p className="font-heading text-base font-semibold">
                  {cinemaInfo.locationLabel}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{fullAddress}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-foreground">
                  <Phone className="h-4 w-4" aria-hidden />
                  {cinemaInfo.phone}
                </p>
                <a
                  href={cinemaInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Abrir rotas
                </a>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-3 text-sm font-semibold text-white hover:bg-primary-hover sm:px-4"
            onClick={() => openPurchase()}
          >
            <span className="sm:hidden">Ingressos</span>
            <span className="hidden sm:inline">Comprar ingressos</span>
          </button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-foreground lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background lg:hidden"
        >
          <nav className="container-cine flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-surface"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={buildWhatsAppUrl(
                cinemaInfo.whatsapp,
                "Olá! Gostaria de informações sobre o Cineplaza."
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-surface"
            >
              Falar no WhatsApp
            </a>
            <a
              href={cinemaInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-surface"
            >
              Como chegar
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
