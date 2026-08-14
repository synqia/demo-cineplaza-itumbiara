"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  petloveSummary,
  valueHighlights,
} from "@/data/depoimentosData";
import { images } from "@/data/imagesData";

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="avaliacoes"
      className="relative py-14 md:py-22 overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={images.testimonialsBg.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-bg-section/90" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6">
        <div
          className={`max-w-2xl mb-10 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <h2
            className="font-heading font-semibold text-text-primary mb-3 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            O que tutores já relataram
          </h2>
          <p className="text-text-muted text-sm font-body leading-relaxed">
            Recorte público da {petloveSummary.source}: nota{" "}
            {petloveSummary.rating.toFixed(1).replace(".", ",")}/5 em{" "}
            {petloveSummary.reviewCount} avaliações e{" "}
            {petloveSummary.recommendationRate} de recomendação. Sem inventar
            depoimentos nominais.
          </p>
        </div>

        <div
          className={`rounded-2xl border border-border-default bg-bg-base p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center gap-6 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <span className="font-heading text-2xl font-semibold text-primary">
                {petloveSummary.rating.toFixed(1).replace(".", ",")}
              </span>
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(petloveSummary.rating)
                      ? "fill-accent-warm text-accent-warm"
                      : "text-border-default"
                      }`}
                  />
                ))}
              </div>
              <p className="text-[13px] font-body font-semibold text-text-primary">
                Avaliações na {petloveSummary.source}
              </p>
              <p className="text-[11px] font-body text-text-faint">
                {petloveSummary.reviewCount} avaliações ·{" "}
                {petloveSummary.recommendationRate} recomendação
              </p>
            </div>
          </div>
          <p className="text-[12px] font-body text-text-muted leading-relaxed sm:border-l sm:border-border-default sm:pl-6">
            {petloveSummary.note}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {valueHighlights.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-xl border border-border-default bg-bg-base/90 p-5 transition-all duration-500 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
                }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <h3 className="font-heading font-semibold text-text-primary text-[16px] mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] font-body text-text-muted leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
