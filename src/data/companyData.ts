/**
 * Dados centrais do Cineplaza Itumbiara — protótipo demonstrativo.
 * Mantém contrato usado por cookies, legal e WhatsApp.
 */

export interface CompanyUnit {
  name: string;
  address: string;
  phones: string[];
  mapsEmbedUrl: string;
  mapsLinkUrl: string;
}

export interface CompanySocial {
  instagram?: { url: string; label: string };
  youtube?: { url: string; label: string };
  facebook?: { url: string; label: string };
  linkedin?: { url: string; label: string };
  threads?: { url: string; label: string };
  podcast?: { url: string; label: string };
}

export interface CompanyData {
  companyName: string;
  brandPerson: string;
  tagline: string;
  siteUrl: string;
  whatsapp: string;
  phone: string;
  email: string;
  businessHours: string;
  locationLabel: string;
  crmv: string;
  social: CompanySocial;
  units: CompanyUnit[];
  quoteOptions: string[];
  whatsappMessages: {
    default: string;
    medicine: string;
    dentistry: string;
    homeVisit: string;
    consulting: string;
    bio: string;
    blog: string;
  };
}

export const companyData: CompanyData = {
  companyName: "Cineplaza",
  brandPerson: "Cineplaza",
  tagline: "Grandes histórias, pertinho de você.",
  siteUrl: "",
  whatsapp: "556434313316",
  phone: "(64) 3431-3316",
  email: "cineplaza_cinema@hotmail.com",
  businessHours:
    "Consulte a programação do dia. Localizado no Shopping Center Plaza.",
  locationLabel: "Cineplaza Itumbiara",
  crmv: "",
  social: {
    instagram: {
      url: "https://www.instagram.com/cineplazaitumbiara/",
      label: "@cineplazaitumbiara",
    },
    facebook: {
      url: "https://www.facebook.com/",
      label: "Cineplaza no Facebook",
    },
    youtube: {
      url: "https://www.youtube.com/",
      label: "Cineplaza no YouTube",
    },
  },
  units: [
    {
      name: "Cineplaza Itumbiara",
      address:
        "Praça da República, 256 — Setor Central, Itumbiara/GO · CEP 75503-260",
      phones: ["(64) 3431-3316"],
      mapsEmbedUrl: "",
      mapsLinkUrl: "https://share.google/1Zm0E0pqvsBmP5E31",
    },
  ],
  quoteOptions: [
    "Consultar programação",
    "Dúvidas sobre ingressos",
    "Cardápio",
    "Acessibilidade",
    "Outro",
  ],
  whatsappMessages: {
    default:
      "Olá, Cineplaza Itumbiara! Cheguei pelo site e gostaria de informações sobre a programação.",
    medicine:
      "Olá, Cineplaza Itumbiara! Gostaria de saber mais sobre as salas e experiências.",
    dentistry:
      "Olá, Cineplaza Itumbiara! Quero informações sobre o cardápio.",
    homeVisit:
      "Olá, Cineplaza Itumbiara! Preciso de orientação sobre como chegar.",
    consulting:
      "Olá, Cineplaza Itumbiara! Tenho uma dúvida sobre acessibilidade.",
    bio: "Olá, Cineplaza Itumbiara! Cheguei pelo link e gostaria de informações.",
    blog: "Olá, Cineplaza Itumbiara! Vi o site e quero saber sobre sessões.",
  },
};
