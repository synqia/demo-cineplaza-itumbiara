"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { companyData } from "@/data/companyData";
import { images } from "@/data/imagesData";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HeroSection() {
  const [whatsappUrl, setWhatsappUrl] = useState(() =>
    buildWhatsAppUrl(
      companyData.whatsapp,
      companyData.whatsappMessages.default
    )
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

  const scrollToAtuacao = () => {
    document.querySelector("#atuacao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-start text-left overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] scale-105 animate-soft-float"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(14,42,54,0.88) 0%, rgba(14,42,54,0.62) 42%, rgba(31,92,87,0.35) 68%, rgba(14,42,54,0.55) 100%), linear-gradient(to bottom, rgba(14,42,54,0.25) 0%, rgba(14,42,54,0.4) 55%, rgba(14,42,54,0.92) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 pb-28">
        <div className="max-w-xl lg:max-w-152">
          <p className="animate-hero-reveal font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[0.02em] text-white mb-3 sm:mb-4 leading-[1.1]">
            {companyData.companyName}
          </p>

          <h1
            className="animate-hero-reveal opacity-0 font-heading font-semibold text-white leading-[1.15] mb-5"
            style={{
              fontSize: "clamp(1.85rem, 4.2vw, 2.85rem)",
              animationDelay: "80ms",
              animationFillMode: "forwards",
            }}
          >
            Cuidado veterinário pensado para{" "}
            <span className="italic text-[#9ec9c3]">gatos</span>.
          </h1>

          <p
            className="animate-hero-reveal opacity-0 text-white/85 text-[15px] sm:text-base font-body leading-relaxed mb-6 max-w-[40ch]"
            style={{ animationDelay: "160ms", animationFillMode: "forwards" }}
          >
            Medicina e odontologia felina especializada, com atendimento
            domiciliar em Joinville.
          </p>

          <div
            className="animate-hero-reveal opacity-0 flex flex-wrap gap-2 mb-8"
            style={{ animationDelay: "220ms", animationFillMode: "forwards" }}
          >
            {[
              "Joinville e região",
              "Abordagem Cat Friendly",
              "Medicina e odontologia felina",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-body font-medium text-white/90 backdrop-blur-sm"
              >
                {chip}
              </span>
            ))}
          </div>

          <div
            className="animate-hero-reveal opacity-0 flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "280ms", animationFillMode: "forwards" }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3.5 bg-gradient-green text-white text-sm font-semibold font-body rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-green"
            >
              Agendar atendimento
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
            <button
              type="button"
              onClick={scrollToAtuacao}
              className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3.5 bg-white/10 text-white text-sm font-semibold font-body rounded-lg border border-white/30 backdrop-blur-sm transition-all hover:bg-white/15"
            >
              Conhecer as áreas de atuação
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToAtuacao}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors"
        aria-label="Rolar para áreas de atuação"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
