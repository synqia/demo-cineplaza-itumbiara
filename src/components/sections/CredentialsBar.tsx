"use client";

import { GraduationCap, HeartHandshake, MapPin, Stethoscope } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const credentials = [
  {
    icon: Stethoscope,
    text: "Medicina veterinária exclusiva para felinos",
  },
  {
    icon: GraduationCap,
    text: "Pós-graduação em Odontologia Veterinária",
  },
  {
    icon: HeartHandshake,
    text: "Certificação Cat Friendly (AAFP)",
  },
  {
    icon: MapPin,
    text: "Atendimento em Joinville e região",
  },
];

export default function CredentialsBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="credenciais"
      className="bg-bg-section border-b border-border-subtle py-6 md:py-8"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6">
        <ul
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {credentials.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.text}
                className="flex items-start gap-3 rounded-xl px-2 py-1"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-body text-[13px] leading-snug text-text-secondary">
                  {item.text}
                  <span className="block text-[10px] text-text-faint mt-0.5">
                    Validação pendente antes da publicação
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
