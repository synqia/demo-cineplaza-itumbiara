"use client";

import Image from "next/image";
import { Eye, HeartPulse, Smile } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { images } from "@/data/imagesData";

const pillars = [
  {
    icon: Eye,
    title: "Sinais discretos",
    text: "Mudança de apetite, higiene ou humor pode ser o único aviso.",
  },
  {
    icon: HeartPulse,
    title: "Estresse importa",
    text: "Transporte e sala de espera alteram exame, pressão e comportamento.",
  },
  {
    icon: Smile,
    title: "Boca e corpo juntos",
    text: "Odontologia e medicina felina se cruzam em dor, alimentação e doenças crônicas.",
  },
];

export default function WhyCatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="por-que-gatos"
      className="py-14 md:py-22 bg-bg-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div
            className={`relative aspect-4/5 sm:aspect-5/4 lg:aspect-4/5 rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <Image
              src={images.whyCats.src}
              alt={images.whyCats.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <h2
              className="font-heading font-semibold text-text-primary mb-4 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              Por que um atendimento específico para gatos?
            </h2>
            <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed mb-8">
              Gatos escondem sintomas, sofrem com deslocamento e exigem manejo
              diferente. Um atendimento Cat Friendly reduz medo, melhora a
              leitura clínica e respeita o comportamento da espécie.
            </p>

            <ul className="space-y-5">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <li key={pillar.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary text-[17px] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-text-muted text-sm font-body leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
