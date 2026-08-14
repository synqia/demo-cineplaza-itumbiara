"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { companyData } from "@/data/companyData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const WHATSAPP_MESSAGE = companyData.whatsappMessages.default;

const navLinks = [
  { href: "#atuacao", label: "Áreas de atuação", homeOnly: true },
  { href: "#odontologia", label: "Odontologia", homeOnly: true },
  { href: "#domiciliar", label: "Domiciliar", homeOnly: true },
  { href: "#sobre", label: "Sobre", homeOnly: true },
  { href: "/blog", label: "Conteúdos", homeOnly: false },
  { href: "#contato", label: "Contato", homeOnly: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(companyData.whatsapp, WHATSAPP_MESSAGE)
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const message = buildWhatsAppMessage(
        WHATSAPP_MESSAGE,
        window.location.search
      );
      setWhatsappUrl(buildWhatsAppUrl(companyData.whatsapp, message));
    }, 100);
  }, []);

  const resolveHref = (href: string, homeOnly: boolean) => {
    if (!homeOnly) return href;
    if (isHome) return href;
    return `/${href}`;
  };

  const handleNavClick = (href: string, homeOnly: boolean) => {
    setMenuOpen(false);
    if (!homeOnly) return;
    if (isHome) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-base/70 shadow-[0_4px_24px_rgba(14,42,54,0.08)]"
          : "bg-bg-base/95"
      } backdrop-blur-md border-b border-border-default`}
    >
      <div className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group min-w-0"
          onClick={() => {
            if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="w-8 h-8 rounded-md bg-primary text-white font-heading font-semibold text-sm flex items-center justify-center shrink-0 group-hover:opacity-90 transition-opacity">
            ES
          </span>
          <span className="font-heading font-semibold text-lg text-text-primary tracking-tight truncate">
            <span className="hidden sm:inline">Dra. Eliane Senger</span>
            <span className="sm:hidden">Eliane Senger</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const resolved = resolveHref(link.href, link.homeOnly);
            if (!link.homeOnly || !isHome) {
              return (
                <Link
                  key={link.href}
                  href={resolved}
                  className="font-body text-[13px] font-medium text-text-secondary hover:text-primary transition-colors duration-200 tracking-[0.01em]"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.homeOnly)}
                className="font-body text-[13px] font-medium text-text-secondary hover:text-primary transition-colors duration-200 tracking-[0.01em] cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 min-h-12 px-5 py-2.5 bg-gradient-green text-white text-[13px] font-semibold font-body rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-green focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden />
            Agendar atendimento
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden w-full overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        } bg-bg-section border-t border-border-subtle`}
      >
        <nav className="w-full min-w-0 max-w-300 mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const resolved = resolveHref(link.href, link.homeOnly);
            if (!link.homeOnly || !isHome) {
              return (
                <Link
                  key={link.href}
                  href={resolved}
                  onClick={() => setMenuOpen(false)}
                  className="w-full min-w-0 text-left px-3 py-2.5 font-body text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href, link.homeOnly)}
                className="w-full min-w-0 text-left px-3 py-2.5 font-body text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                {link.label}
              </button>
            );
          })}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full min-w-0 flex items-center justify-center gap-2 min-h-12 px-5 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg box-border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-section"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden />
            Agendar atendimento
          </a>
        </nav>
      </div>
    </header>
  );
}
