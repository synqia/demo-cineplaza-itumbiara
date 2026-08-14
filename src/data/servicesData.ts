/** Áreas de atuação — âncoras da Home. Confirmar portfólio com a profissional. */
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  imageKey: "cardMedicine" | "cardDentistry" | "cardHome" | "cardConsulting";
}

export const servicesData: ServiceItem[] = [
  {
    id: "consulta",
    title: "Consulta felina",
    description:
      "Prevenção, check-up e acompanhamento com manejo pensado para gatos.",
    cta: "Falar sobre meu gato",
    href: "#medicina-felina",
    imageKey: "cardMedicine",
  },
  {
    id: "odontologia",
    title: "Odontologia felina",
    description:
      "Dor silenciosa, mau hálito, dificuldade para comer — avaliação com olhar específico.",
    cta: "Avaliar saúde oral",
    href: "#odontologia",
    imageKey: "cardDentistry",
  },
  {
    id: "domiciliar",
    title: "Atendimento domiciliar",
    description:
      "Cuidado em casa para reduzir o estresse do transporte e da clínica.",
    cta: "Consultar disponibilidade",
    href: "#domiciliar",
    imageKey: "cardHome",
  },
  {
    id: "consultorias",
    title: "Consultorias",
    description:
      "Orientação em condições complexas como PIF, FIV, FeLV e gengivoestomatite.",
    cta: "Entender a consultoria",
    href: "#consultorias",
    imageKey: "cardConsulting",
  },
];
