"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const audience = [
  "Tutor de gato saudável (check-up, vacinação, prevenção)",
  "Tutor de gato idoso (sinais sutis, dor, doenças crônicas)",
  "Tutor que já teve má experiência em atendimento generalista",
];

const signs = [
  "Mudança de apetite",
  "Perda de peso",
  "Lambedura excessiva",
  "Isolamento",
  "Vocalização",
  "Urina fora da caixa",
];

export default function FelineMedicineSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(companyData.whatsapp, companyData.whatsappMessages.medicine)
  );

  useEffect(() => {
    setTimeout(() => {
      const message = buildWhatsAppMessage(
        companyData.whatsappMessages.medicine,
        window.location.search
      );
      setWhatsappUrl(buildWhatsAppUrl(companyData.whatsapp, message));
    }, 100);
  }, []);

  return (
    <section
      id="medicina-felina"
      className="py-14 md:py-22 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            className={`order-2 lg:order-1 transition-all duration-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-body mb-3">
              Medicina felina
            </span>
            <h2
              className="font-heading font-semibold text-text-primary mb-4 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              Cuidado clínico para cada fase da vida do gato
            </h2>
            <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed mb-6">
              Consultas de prevenção, acompanhamento de gatos adultos e idosos,
              vacinação e orientação para tutores que querem um olhar exclusivo
              para a espécie.
            </p>

            <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
              Para quem é
            </h3>
            <ul className="space-y-2 mb-6">
              {audience.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm font-body text-text-secondary"
                >
                  <span className="text-primary mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
              Sinais que merecem atenção
            </h3>
            <p className="text-[12px] text-text-faint font-body mb-3">
              Lista educativa — não é diagnóstico.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {signs.map((sign) => (
                <span
                  key={sign}
                  className="rounded-lg border border-border-default bg-bg-section px-3 py-1.5 text-[12px] font-body text-text-secondary"
                >
                  {sign}
                </span>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-12 px-6 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg hover:-translate-y-0.5 hover:shadow-green transition-all"
            >
              Falar sobre meu gato
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div
            className={`order-1 lg:order-2 relative aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <Image
              src={images.medicine.src}
              alt={images.medicine.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
