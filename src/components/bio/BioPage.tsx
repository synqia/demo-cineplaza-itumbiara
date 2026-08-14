"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Home,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Smile,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

type BioAction = {
  id: string;
  label: string;
  description: string;
  icon: typeof Smile;
  href: string;
  external?: boolean;
  accent?: boolean;
};

function subscribeToSearch() {
  return () => {};
}

function getSearchSnapshot() {
  return window.location.search;
}

function getSearchServerSnapshot() {
  return "";
}

function useWhatsAppUrl(baseMessage: string) {
  const search = useSyncExternalStore(
    subscribeToSearch,
    getSearchSnapshot,
    getSearchServerSnapshot
  );
  const message = buildWhatsAppMessage(baseMessage, search || null);
  return buildWhatsAppUrl(companyData.whatsapp, message);
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.186 24h-.007a11.885 11.885 0 01-6.524-1.855.938.938 0 01-.338-1.24.94.94 0 011.247-.34A10.017 10.017 0 0012.18 22.1c5.54 0 10.046-4.505 10.046-10.047S17.72 2.006 12.18 2.006 2.133 6.511 2.133 12.053c0 2.212.72 4.342 2.082 6.16a.938.938 0 01-.21 1.317.94.94 0 01-1.317-.21A11.91 11.91 0 01.258 12.053C.258 5.478 5.605.131 12.18.131s11.922 5.347 11.922 11.922S18.755 24 12.186 24z" />
    </svg>
  );
}

export default function BioPage() {
  const scheduleUrl = useWhatsAppUrl(companyData.whatsappMessages.bio);
  const dentistryUrl = useWhatsAppUrl(companyData.whatsappMessages.dentistry);
  const homeVisitUrl = useWhatsAppUrl(companyData.whatsappMessages.homeVisit);
  const consultingUrl = useWhatsAppUrl(companyData.whatsappMessages.consulting);

  const actions: BioAction[] = [
    {
      id: "agendar",
      label: "Agendar atendimento",
      description: "Consulta felina pelo WhatsApp",
      icon: Stethoscope,
      href: scheduleUrl,
      external: true,
      accent: true,
    },
    {
      id: "odontologia",
      label: "Saúde oral do meu gato",
      description: "Odontologia felina",
      icon: Smile,
      href: dentistryUrl,
      external: true,
    },
    {
      id: "domiciliar",
      label: "Atendimento em casa",
      description: "Domiciliar em Joinville",
      icon: Home,
      href: homeVisitUrl,
      external: true,
    },
    {
      id: "consultoria",
      label: "Caso complexo / consultoria",
      description: "PIF, FIV, FeLV, gengivoestomatite",
      icon: FileText,
      href: consultingUrl,
      external: true,
    },
    {
      id: "site",
      label: "Conhecer o trabalho",
      description: "Site completo",
      icon: UserRound,
      href: "/",
    },
    {
      id: "blog",
      label: "Ler conteúdos",
      description: "Guias para tutores",
      icon: BookOpen,
      href: "/blog",
    },
  ];

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg-base text-text-primary">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% -10%, rgba(31,92,87,0.22) 0%, transparent 70%), linear-gradient(180deg, #e8efed 0%, #f4f7f6 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-56 w-56 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />

      <main className="relative z-10 mx-auto w-full max-w-140 px-4 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:pb-12 sm:pt-8">
        <header className="mb-7 flex flex-col items-center text-center animate-hero-reveal">
          <div className="relative mb-4">
            <div className="relative h-22 w-22 sm:h-24 sm:w-24 overflow-hidden rounded-full ring-4 ring-white/80 shadow-primary">
              <Image
                src={images.bioAvatar.src}
                alt={images.bioAvatar.alt}
                fill
                sizes="96px"
                className="object-cover"
                priority
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-bg-section px-2.5 py-0.5 text-[10px] font-body font-semibold uppercase tracking-[0.08em] text-primary shadow-sm ring-1 ring-border-default">
              Atendimento domiciliar
            </span>
          </div>

          <h1 className="font-heading text-[clamp(1.85rem,7vw,2.35rem)] font-semibold leading-tight tracking-[-0.01em] text-text-primary">
            {companyData.brandPerson}
          </h1>
          <p className="mt-1.5 text-[13px] font-body font-medium text-primary">
            {companyData.social.instagram?.label ?? "@elianesenger"}
          </p>
          <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-text-secondary font-body sm:text-[15px]">
            Medicina e odontologia felina · Joinville
          </p>
        </header>

        <section
          className="mb-5 animate-hero-reveal opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          aria-label="Áreas de atuação"
        >
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Medicina felina", icon: Stethoscope },
              { label: "Odontologia", icon: Smile },
              { label: "Domiciliar", icon: Home },
            ].map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-border-default/80 bg-bg-section/90 px-2 py-3 shadow-[0_1px_0_rgba(14,42,54,0.03)] backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  <span className="text-[11px] font-body font-medium text-text-secondary text-center">
                    {area.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section
          className="mb-6 space-y-3 animate-hero-reveal opacity-0"
          style={{ animationDelay: "180ms", animationFillMode: "forwards" }}
          aria-label="Escolha o seu caminho"
        >
          {actions.map((action, index) => {
            const Icon = action.icon;
            const className = `group flex w-full min-h-16 items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base sm:gap-4 sm:px-5 sm:py-4 ${
              action.accent
                ? "border-primary/30 bg-gradient-green text-white shadow-primary hover:-translate-y-0.5"
                : "border-border-default bg-bg-section text-text-primary shadow-[0_2px_12px_rgba(14,42,54,0.06)] hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-card-hover"
            }`;

            const content = (
              <>
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    action.accent
                      ? "bg-white/15 text-white"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-body text-[15px] font-semibold leading-snug ${
                      action.accent ? "text-white" : "text-text-primary"
                    }`}
                  >
                    {action.label}
                  </span>
                  <span
                    className={`mt-0.5 block font-body text-[12px] leading-snug ${
                      action.accent ? "text-white/75" : "text-text-muted"
                    }`}
                  >
                    {action.description}
                  </span>
                </span>
                <ArrowUpRight
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    action.accent ? "text-white/80" : "text-text-faint"
                  }`}
                  aria-hidden
                />
              </>
            );

            if (action.external) {
              return (
                <a
                  key={action.id}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {content}
                </a>
              );
            }

            return (
              <Link
                key={action.id}
                href={action.href}
                className={className}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {content}
              </Link>
            );
          })}
        </section>

        <section
          className="mb-6 animate-hero-reveal opacity-0"
          style={{ animationDelay: "280ms", animationFillMode: "forwards" }}
          aria-labelledby="bio-contato"
        >
          <h2
            id="bio-contato"
            className="mb-3 px-1 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted"
          >
            Contato
          </h2>
          <div className="overflow-hidden rounded-2xl border border-border-default bg-bg-section shadow-[0_2px_12px_rgba(14,42,54,0.06)]">
            <a
              href={scheduleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-16 items-center gap-3 border-b border-border-subtle px-4 py-3.5 transition-colors hover:bg-bg-card-hover sm:gap-4 sm:px-5 sm:py-4"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <p className="font-body text-[13px] font-semibold text-text-primary">
                  WhatsApp
                </p>
                <p className="font-body text-[12px] text-text-muted">
                  {companyData.phone}
                </p>
              </div>
            </a>
            <div className="flex min-h-16 items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0">
                <p className="font-body text-[13px] font-semibold text-text-primary">
                  {companyData.locationLabel}
                </p>
                <p className="font-body text-[12px] leading-snug text-text-muted">
                  {companyData.businessHours}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mb-8 animate-hero-reveal opacity-0"
          style={{ animationDelay: "340ms", animationFillMode: "forwards" }}
          aria-label="Redes sociais"
        >
          <div className="flex items-center justify-center gap-3">
            {companyData.social.instagram?.url && (
              <a
                href={companyData.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-default bg-bg-section text-text-secondary transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {companyData.social.linkedin?.url && (
              <a
                href={companyData.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-default bg-bg-section text-text-secondary transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {companyData.social.threads?.url && (
              <a
                href={companyData.social.threads.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border-default bg-bg-section text-text-secondary transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
              >
                <ThreadsIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </section>

        <div
          className="text-center animate-hero-reveal opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-4 py-2 font-body text-[13px] font-medium text-primary transition-colors hover:bg-primary/5"
          >
            Ver site completo
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <p className="mt-3 px-4 text-[10px] leading-relaxed text-text-faint font-body">
            Este canal não substitui atendimento de emergência.
          </p>
        </div>
      </main>
    </div>
  );
}
