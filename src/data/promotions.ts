import type { Promotion } from "@/types/cinema";

export const promotions: Promotion[] = [
  {
    id: "promo-terca",
    title: "Terça Cineplaza",
    subtitle: "Ingressos promocionais durante todo o dia",
    description:
      "Cinema combina ainda mais com preço especial. Consulte os filmes e sessões participantes.",
    ctaLabel: "Ver programação",
    ctaHref: "/programacao?promo=terca",
  },
];

export const promoBarCopy = {
  text: "Terça Cineplaza: ingressos promocionais durante todo o dia.",
  linkLabel: "Ver condições",
  linkHref: "/programacao?promo=terca",
};
