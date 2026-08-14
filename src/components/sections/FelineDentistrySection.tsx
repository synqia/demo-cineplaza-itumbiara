"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const dentalSigns = [
  "Mau hálito",
  "Dor ao comer",
  "Sangramento gengival",
  "Queda de dentes",
  "Babar",
  "Esfregar o rosto",
];

export default function FelineDentistrySection() {
  const { ref, isVisible } = useScrollAnimation();
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.dentistry
    )
  );

  useEffect(() => {
    setTimeout(() => {
      const message = buildWhatsAppMessage(
        companyData.whatsappMessages.dentistry,
        window.location.search
      );
      setWhatsappUrl(buildWhatsAppUrl(companyData.whatsapp, message));
    }, 100);
  }, []);

  return (
    <section
      id="odontologia"
      className="py-14 md:py-22 bg-deep text-white relative overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div
        className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div className="max-w-300 mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div
            className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary-light font-body mb-3">
              Odontologia felina
            </span>
            <h2
              className="font-heading font-semibold text-white mb-4 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              A boca do gato também dói, mesmo quando ele não reclama
            </h2>
            <p className="text-white/75 text-sm md:text-[15px] font-body leading-relaxed mb-8">
              Mau hálito, dificuldade para mastigar, salivação e recusa de ração
              seca podem ser sinais de doença periodontal ou gengivoestomatite. A
              avaliação odontológica felina organiza o próximo passo com
              clareza, sem alarmismo.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="font-heading font-semibold text-white text-[15px] mb-2">
                  Sinais
                </h3>
                <ul className="space-y-1.5">
                  {dentalSigns.map((sign) => (
                    <li
                      key={sign}
                      className="text-[13px] font-body text-white/70"
                    >
                      · {sign}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-heading font-semibold text-white text-[15px] mb-2">
                    Avaliação
                  </h3>
                  <p className="text-[13px] font-body text-white/70 leading-relaxed">
                    Consulta focada na saúde oral — protocolo completo a
                    confirmar com a profissional.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-heading font-semibold text-white text-[15px] mb-2">
                    Próximos passos
                  </h3>
                  <p className="text-[13px] font-body text-white/70 leading-relaxed">
                    Orientação → indicação de exame/procedimento →
                    acompanhamento.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[12px] font-body text-white/45 mb-6 leading-relaxed">
              Conteúdo educativo. Conduta só após avaliação. Sem promessa de
              cura.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-12 px-6 py-3 bg-white text-deep text-sm font-semibold font-body rounded-lg hover:-translate-y-0.5 transition-all"
            >
              Avaliar saúde oral
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
          >
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
              <Image
                src={images.dentistryPrimary.src}
                alt={images.dentistryPrimary.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden sm:max-lg:block lg:block">
              <Image
                src={images.dentistrySecondary.src}
                alt={images.dentistrySecondary.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
