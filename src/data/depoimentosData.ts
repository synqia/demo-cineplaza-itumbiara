/**
 * Prova social pública — Petlove (recorte 12 ago. 2026).
 * Sem inventar nomes de tutores. Textos a validar antes da publicação.
 */

export interface SocialProofSummary {
  rating: number;
  reviewCount: number;
  recommendationRate: string;
  source: string;
  note: string;
}

export interface ValueHighlight {
  title: string;
  text: string;
}

export const petloveSummary: SocialProofSummary = {
  rating: 4.6,
  reviewCount: 3,
  recommendationRate: "100%",
  source: "Petlove",
  note: "Recorte público consultado em 12 ago. 2026. Número pequeno de avaliações — tratado com transparência.",
};

export const valueHighlights: ValueHighlight[] = [
  {
    title: "Atendimento exclusivo para gatos",
    text: "Posicionamento claro em medicina e odontologia felina, sem misturar com atendimento generalista de outras espécies.",
  },
  {
    title: "Opção de atendimento domiciliar",
    text: "Cuidado em casa para reduzir o estresse do transporte — especialmente útil para gatos sensíveis ou idosos.",
  },
  {
    title: "Rede e prova dispersa organizada",
    text: "Avaliações e indicação em plataformas de terceiros ganham contexto quando reunidas em uma jornada própria.",
  },
];

export const networkMentions = [
  "Petlove",
  "Laboratório Medivet",
  "Viva Vet",
] as const;
