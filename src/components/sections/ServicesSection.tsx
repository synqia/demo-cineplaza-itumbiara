"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { servicesData } from "@/data/servicesData";
import { images } from "@/data/imagesData";

export default function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="atuacao"
      className="py-14 md:py-22 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div
          className={`max-w-2xl mb-10 md:mb-14 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-body mb-3">
            Áreas de atuação
          </span>
          <h2
            className="font-heading font-semibold text-text-primary mb-3 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            O que o seu gato precisa agora?
          </h2>
          <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed">
            Quatro caminhos claros. O tutor se reconhece pela dor, não pelo
            jargão clínico.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {servicesData.map((service, index) => {
            const image = images[service.imageKey];
            return (
              <a
                key={service.id}
                href={service.href}
                className={`group relative overflow-hidden rounded-2xl border border-border-default bg-bg-section transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-deep/70 via-deep/10 to-transparent" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-[13px] sm:text-sm font-body leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold font-body">
                    {service.cta}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
