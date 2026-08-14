"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const principles = [
  "Manejo que respeita o comportamento felino.",
  "Linguagem clara para o tutor, sem alarmismo.",
  "Decisão clínica com base em avaliação, não em conteúdo de rede social.",
];

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(companyData.whatsapp, companyData.whatsappMessages.default)
  );

  useEffect(() => {
    setTimeout(() => {
      const message = buildWhatsAppMessage(
        companyData.whatsappMessages.default,
        window.location.search
      );
      setWhatsappUrl(buildWhatsAppUrl(companyData.whatsapp, message));
    }, 100);
  }, []);

  return (
    <section
      id="sobre"
      className="py-14 md:py-22 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div
            className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
              }`}
          >
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            className={`transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-body mb-3">
              A profissional
            </span>
            <h2
              className="font-heading font-semibold text-text-primary mb-2 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              Dra. Eliane Senger
            </h2>
            <p className="text-primary text-sm font-body font-medium mb-5">
              Médica-veterinária dedicada a gatos, com atuação em Joinville e
              região.
            </p>
            <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed mb-4">
              Atuação exclusiva ou prioritária em felinos, combinando medicina
              felina e odontologia veterinária. Aprimoramento em medicina felina
              (TreeVet e MelloVet, conforme LinkedIn). Pós-graduação em
              Odontologia Veterinária (FAMESP) — status a confirmar.
              Certificação Cat Friendly pela AAFP — validar uso do selo.
              Atendimento autônomo desde 2022.
            </p>

            <h3 className="font-heading font-semibold text-text-primary text-base mb-3 mt-6">
              Princípios
            </h3>
            <ul className="space-y-2.5 mb-8">
              {principles.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm font-body text-text-secondary"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-warm shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-12 px-6 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg hover:-translate-y-0.5 hover:shadow-green transition-all"
            >
              Agendar atendimento
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
