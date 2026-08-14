import Link from "next/link";
import { promotions } from "@/data/promotions";

export default function PromoBanner() {
  const promo = promotions[0];
  if (!promo) return null;

  return (
    <section className="section-padding pt-0">
      <div className="container-cine">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-10 sm:px-10 sm:py-12">
          <div
            className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-primary/25 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-accent/20 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-10 hidden w-px bg-linear-to-b from-transparent via-accent/40 to-transparent sm:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-16 top-8 hidden h-16 w-16 rotate-12 rounded-lg border border-white/10 sm:block"
            aria-hidden
          />
          <div className="relative max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Campanha local
            </p>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.75rem)] font-bold text-foreground">
              {promo.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {promo.description}
            </p>
            <Link
              href={promo.ctaHref}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              {promo.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
