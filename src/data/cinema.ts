import type { CinemaInfo } from "@/types/cinema";

/**
 * Dados do Cineplaza Itumbiara (Shopping Center Plaza).
 * Fontes públicas: Google Maps, AdoroCinema, Instagram @cineplazaitumbiara.
 */
export const cinemaInfo: CinemaInfo = {
  name: "Cineplaza",
  shortName: "Cineplaza",
  tagline: "Grandes histórias, pertinho de você.",
  description:
    "O Cineplaza Itumbiara fica no Shopping Center Plaza e oferece salas modernas, filmes em 2D e 3D e uma programação pensada para a cidade.",
  locationLabel: "Cineplaza Itumbiara",
  address: {
    street: "Praça da República, 256",
    neighborhood: "Setor Central",
    city: "Itumbiara",
    state: "GO",
    zip: "75503-260",
  },
  phone: "(64) 3431-3316",
  whatsapp: "556434313316",
  email: "cineplaza_cinema@hotmail.com",
  businessHours:
    "Consulte a programação do dia. Localizado no Shopping Center Plaza — funcionamento acompanhando o shopping.",
  parking:
    "Estacionamento do Shopping Center Plaza, no mesmo endereço do cinema",
  accessibility:
    "Rampas de acesso, assentos reservados, banheiros acessíveis e sessões com recursos de acessibilidade em salas selecionadas",
  mapsUrl: "https://share.google/1Zm0E0pqvsBmP5E31",
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
  rooms: [
    {
      name: "Sala 1 — Premium",
      capacity: 96,
      features: ["Poltronas reclináveis", "Espaçamento ampliado", "Som calibrado"],
    },
    {
      name: "Sala 2 — 3D",
      capacity: 140,
      features: ["Projeção 3D", "Tela panorâmica", "Áudio envolvente"],
    },
    {
      name: "Sala 3 — Clássica",
      capacity: 160,
      features: ["2D Full HD", "Assentos confortáveis", "Acessibilidade"],
    },
  ],
  experiences: [
    {
      id: "sala-3d",
      title: "Sala 3D",
      description:
        "Imagem, profundidade e som para entrar de vez na história.",
      imageUrl:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
      href: "/o-cineplaza#experiencias",
    },
    {
      id: "sala-premium",
      title: "Sala Premium",
      description:
        "Poltronas reclináveis, mais espaço e conforto para uma sessão especial.",
      imageUrl:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
      href: "/o-cineplaza#experiencias",
    },
    {
      id: "cineplaza-sound",
      title: "Cineplaza Sound",
      description:
        "Áudio envolvente e calibrado para cada detalhe da produção.",
      imageUrl:
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80",
      href: "/o-cineplaza#experiencias",
    },
  ],
};

export const ticketPrices = {
  full: 36,
  half: 18,
  promo: 22,
  serviceFee: 3,
} as const;

export const fullAddress = `${cinemaInfo.address.street}, ${cinemaInfo.address.neighborhood} — ${cinemaInfo.address.city}/${cinemaInfo.address.state}`;
