"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const conditions = [
  {
    name: "PIF",
    text: "Avaliação e orientação especializada para organizar o caso — sem prometer cura ou protocolos milagrosos.",
  },
  {
    name: "FIV",
    text: "Convivência, cuidados e acompanhamento com linguagem clara, sem estigma.",
  },
  {
    name: "FeLV",
    text: "Prevenção, testagem e manejo — informação responsável, sem garantia de resultado.",
  },
  {
    name: "Gengivoestomatite",
    text: "Relação com odontologia e qualidade de vida; o plano depende da avaliação individual.",
  },
];

export default function ConsultingSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.consulting
    )
  );

  useEffect(() => {
    setTimeout(() => {
      const message = buildWhatsAppMessage(
        companyData.whatsappMessages.consulting,
        window.location.search
      );
      setWhatsappUrl(buildWhatsAppUrl(companyData.whatsapp, message));
    }, 100);
  }, []);

  return (
    <section
      id="consultorias"
      className="py-14 md:py-22 bg-bg-base"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div
          className={`max-w-2xl mb-10 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-body mb-3">
            Casos complexos
          </span>
          <h2
            className="font-heading font-semibold text-text-primary mb-4 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Orientação especializada quando o caso pede mais clareza
          </h2>
          <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed">
            Tutores de gatos com PIF, FIV, FeLV ou gengivoestomatite convivem
            com medo e excesso de informação. A consultoria (formato a confirmar)
            organiza o caso e os próximos passos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div
            className={`lg:col-span-2 relative aspect-4/5 sm:aspect-5/4 lg:aspect-auto lg:min-h-90 rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={images.consulting.src}
              alt={images.consulting.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {conditions.map((item, index) => (
              <div
                key={item.name}
                className={`rounded-xl border border-border-default bg-bg-section p-5 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <h3 className="font-heading font-semibold text-primary text-lg mb-2">
                  {item.name}
                </h3>
                <p className="text-[13px] font-body text-text-muted leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex flex-col sm:flex-row sm:items-center gap-4 justify-between rounded-xl border border-border-default bg-bg-section p-5 transition-all duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-[13px] font-body text-text-muted leading-relaxed max-w-2xl">
            Conteúdo informativo. Não substitui consulta. Formato e
            elegibilidade da consultoria serão confirmados com a profissional.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 min-h-12 px-6 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg hover:-translate-y-0.5 hover:shadow-green transition-all"
          >
            Entender a consultoria
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
