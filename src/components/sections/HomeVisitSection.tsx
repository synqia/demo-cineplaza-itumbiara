"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Home, MapPinned, Package, ShieldAlert } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const infoCards = [
  {
    icon: MapPinned,
    title: "Área de cobertura",
    text: "Joinville e região, mediante agendamento. Bairros e cidades detalhados serão confirmados no contato.",
  },
  {
    icon: Home,
    title: "Prepare a casa",
    text: "Cômodo silencioso, caixa de transporte à mão e histórico do gato facilitam o atendimento.",
  },
  {
    icon: ShieldAlert,
    title: "Limites do domiciliar",
    text: "Cirurgias e emergências graves geralmente não são feitas em casa — confirmar no agendamento.",
  },
  {
    icon: Package,
    title: "Rede de atendimento",
    text: "Há menção pública a Petlove, Viva Vet e Medivet. Locais e disponibilidade atuais a validar.",
  },
];

export default function HomeVisitSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.homeVisit
    )
  );

  useEffect(() => {
    setTimeout(() => {
      const message = buildWhatsAppMessage(
        companyData.whatsappMessages.homeVisit,
        window.location.search
      );
      setWhatsappUrl(buildWhatsAppUrl(companyData.whatsapp, message));
    }, 100);
  }, []);

  return (
    <section
      id="domiciliar"
      className="py-14 md:py-22 bg-bg-section"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-10">
          <div
            className={`relative aspect-5/4 rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <Image
              src={images.homeVisit.src}
              alt={images.homeVisit.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div
            className={`transition-all duration-600 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-primary font-body mb-3">
              Joinville e região
            </span>
            <h2
              className="font-heading font-semibold text-text-primary mb-4 leading-[1.2]"
              style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
            >
              Cuidado em casa, no ritmo do seu gato
            </h2>
            <p className="text-text-muted text-sm md:text-[15px] font-body leading-relaxed mb-6">
              O atendimento domiciliar reduz o trauma de transporte e da sala de
              espera. Indicado para gatos estressados, idosos ou tutores que
              preferem o ambiente conhecido.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-12 px-6 py-3 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg hover:-translate-y-0.5 hover:shadow-green transition-all"
            >
              Consultar disponibilidade
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`rounded-xl border border-border-default bg-bg-base p-5 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${150 + index * 60}ms` }}
              >
                <Icon className="h-5 w-5 text-primary mb-3" aria-hidden />
                <h3 className="font-heading font-semibold text-text-primary text-[15px] mb-1.5">
                  {card.title}
                </h3>
                <p className="text-[13px] font-body text-text-muted leading-relaxed">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
