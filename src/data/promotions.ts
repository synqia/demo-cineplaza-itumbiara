import type { Promotion } from "@/types/cinema";

export const promotions: Promotion[] = [
  {
    id: "promo-quarta",
    title: "Quarta Cineplaza",
    subtitle: "Ingresso pela metade do preço",
    description:
      "Todas as quartas-feiras o ingresso sai pela metade do preço. Válido para as sessões do dia, enquanto houver lugares.",
    ctaLabel: "Ver programação",
    ctaHref: "/programacao",
  },
];

export const promoBarCopy = {
  text: "Todas as quartas-feiras o ingresso é pela metade do preço.",
  linkLabel: "Ver programação",
  linkHref: "/programacao",
};
