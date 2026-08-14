"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { images } from "@/data/imagesData";

const steps = [
  {
    n: "01",
    title: "Contato",
    text: "Você escreve no WhatsApp com o motivo (consulta, odontologia, domiciliar ou consultoria).",
  },
  {
    n: "02",
    title: "Entendimento do caso",
    text: "A Dra. Eliane entende histórico, sinais e urgência para orientar o próximo passo.",
  },
  {
    n: "03",
    title: "Local e agenda",
    text: "Define-se consulta, visita domiciliar ou encaminhamento na rede de atendimento.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    text: "Orientações claras para o tutor e próximos passos clínicos.",
  },
];

export default function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="como-funciona"
      className="relative py-14 md:py-22 overflow-hidden"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={images.process.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-bg-section/92" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6">
        <div
          className={`max-w-2xl mb-10 md:mb-14 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="font-heading font-semibold text-text-primary mb-3 leading-[1.2]"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Do primeiro contato ao acompanhamento
          </h2>
          <a
            href="#faq"
            className="text-sm font-body font-semibold text-primary hover:underline"
          >
            Ver perguntas frequentes
          </a>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, index) => (
            <li
              key={step.n}
              className={`rounded-2xl border border-border-default bg-bg-base/90 backdrop-blur-sm p-5 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="font-heading text-3xl font-semibold text-primary/35">
                {step.n}
              </span>
              <h3 className="font-heading font-semibold text-text-primary text-lg mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-[13px] font-body text-text-muted leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
