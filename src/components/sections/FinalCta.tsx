"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Instagram, Linkedin, Phone } from "lucide-react";

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.186 24h-.007a11.885 11.885 0 01-6.524-1.855.938.938 0 01-.338-1.24.94.94 0 011.247-.34A10.017 10.017 0 0012.18 22.1c5.54 0 10.046-4.505 10.046-10.047S17.72 2.006 12.18 2.006 2.133 6.511 2.133 12.053c0 2.212.72 4.342 2.082 6.16a.938.938 0 01-.21 1.317.94.94 0 01-1.317-.21A11.91 11.91 0 01.258 12.053C.258 5.478 5.605.131 12.18.131s11.922 5.347 11.922 11.922S18.755 24 12.186 24z" />
    </svg>
  );
}

export default function FinalCta() {
  const [urls, setUrls] = useState({
    default: buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.default
    ),
    dentistry: buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.dentistry
    ),
    consulting: buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.consulting
    ),
  });

  useEffect(() => {
    setTimeout(() => {
      const search = window.location.search;
      setUrls({
        default: buildWhatsAppUrl(
          companyData.whatsapp,
          buildWhatsAppMessage(companyData.whatsappMessages.default, search)
        ),
        dentistry: buildWhatsAppUrl(
          companyData.whatsapp,
          buildWhatsAppMessage(companyData.whatsappMessages.dentistry, search)
        ),
        consulting: buildWhatsAppUrl(
          companyData.whatsapp,
          buildWhatsAppMessage(companyData.whatsappMessages.consulting, search)
        ),
      });
    }, 100);
  }, []);

  const ctas = [
    { label: "Quero agendar", href: urls.default },
    { label: "Tenho um caso odontológico", href: urls.dentistry },
    {
      label: "Preciso de orientação sobre uma condição específica",
      href: urls.consulting,
    },
  ];

  return (
    <section id="contato" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={images.finalCta.src}
          alt={images.finalCta.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep/88" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 text-center">
        <h2
          className="font-heading font-semibold text-white mb-4 leading-[1.2]"
          style={{ fontSize: "clamp(28px, 3.5vw, 42px)" }}
        >
          Vamos cuidar do seu gato com calma e clareza
        </h2>
        <p className="text-white/75 text-sm md:text-[15px] font-body leading-relaxed max-w-xl mx-auto mb-8">
          Conte o que está acontecendo. A conversa no WhatsApp já começa no
          caminho certo: consulta, odontologia, domiciliar ou consultoria.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 mb-10">
          {ctas.map((cta, index) => (
            <a
              key={cta.label}
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 min-h-12 px-5 py-3 text-sm font-semibold font-body rounded-lg transition-all hover:-translate-y-0.5 ${
                index === 0
                  ? "bg-gradient-green text-white shadow-green"
                  : "bg-white/10 text-white border border-white/25 hover:bg-white/15"
              }`}
            >
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/70 text-[13px] font-body mb-6">
          <span className="inline-flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary-light" />
            {companyData.phone}
          </span>
          <span>{companyData.locationLabel}</span>
          <span>{companyData.businessHours}</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          {companyData.social.instagram && (
            <a
              href={companyData.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {companyData.social.linkedin && (
            <a
              href={companyData.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {companyData.social.threads && (
            <a
              href={companyData.social.threads.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-all"
            >
              <ThreadsIcon className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="text-[12px] font-body text-white/45 max-w-lg mx-auto leading-relaxed">
          Em emergência grave, procure pronto-atendimento veterinário. Este canal
          é para agendamento e orientação.
        </p>
      </div>
    </section>
  );
}
