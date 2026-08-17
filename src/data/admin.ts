import { cinemaInfo, ticketPrices } from "@/data/cinema";
import { movies } from "@/data/movies";
import { products } from "@/data/products";
import { promotions } from "@/data/promotions";
import { sessions } from "@/data/sessions";
import type {
  AdminAlert,
  AdminMovie,
  AdminProduct,
  AdminPromotion,
  AdminRoom,
  AdminSale,
  AdminSession,
  AdminSettings,
  ChannelShare,
  DashboardKpis,
  OccupancySlot,
  PeriodKey,
  RevenuePoint,
  TopMovie,
  UpcomingSessionRow,
} from "@/types/admin";

const extraMovies: AdminMovie[] = [
  {
    id: "m4",
    slug: "estrelas-do-cerrado",
    title: "Estrelas do Cerrado",
    originalTitle: "Cerrado Stars",
    synopsis:
      "Uma professora de Itumbiara reúne um grupo de jovens para um festival de cinema ao ar livre e descobre que a cidade guarda histórias maiores do que a tela.",
    shortDescription:
      "Um festival de cinema no interior revela talentos e memórias da cidade.",
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Drama"],
    duration: 112,
    ageRating: "12",
    releaseDate: "2026-09-04",
    status: "coming-soon",
    director: "Helena Prado",
    cast: ["Alice Braga", "Seu Jorge", "Maeve Jinkings"],
    distributor: "Vitrine Filmes",
    languages: ["Original"],
    formats: ["2D"],
    featured: false,
    year: 2026,
    country: "Brasil",
    ageRatingNote: "Temas de luto e linguagem moderada.",
    ticketsSold: 0,
    futureSessions: 0,
    allowPresale: false,
    metaTitle: "Estrelas do Cerrado | Em breve no Cineplaza",
    metaDescription:
      "Drama brasileiro em breve no Cineplaza Itumbiara. Confira sinopse, classificação e data de estreia.",
  },
  {
    id: "m5",
    slug: "corrida-noturna",
    title: "Corrida Noturna",
    originalTitle: "Night Run",
    synopsis:
      "Um motoboy aceita uma entrega impossível pelas ruas de uma metrópole e precisa cruzar a cidade antes do amanhecer.",
    shortDescription: "Ação urbana em uma corrida contra o relógio.",
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1400&q=80",
    trailerUrl: "https://www.youtube.com/embed/zSWdZVtXT7E",
    genre: ["Ação"],
    duration: 118,
    ageRating: "14",
    releaseDate: "2026-08-28",
    status: "pre-sale",
    director: "Daniel Ribeiro",
    cast: ["Wagner Moura", "Ísis Valverde", "Lázaro Ramos"],
    distributor: "Universal Pictures",
    languages: ["Dublado", "Legendado"],
    formats: ["2D", "3D"],
    featured: true,
    year: 2026,
    country: "Brasil",
    endDate: "2026-10-15",
    ticketsSold: 612,
    futureSessions: 18,
    allowPresale: true,
    metaTitle: "Corrida Noturna | Pré-venda Cineplaza",
    metaDescription:
      "Garanta seu ingresso na pré-venda de Corrida Noturna no Cineplaza Itumbiara.",
  },
  {
    id: "m6",
    slug: "o-ultimo-verao-na-praca",
    title: "O Último Verão na Praça",
    originalTitle: "Last Summer at the Square",
    synopsis:
      "Amigos de infância se reencontram no centro de Itumbiara e precisam decidir o que fica e o que segue em frente.",
    shortDescription: "Reencontro, memória e o fim de uma estação.",
    posterUrl:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    genre: ["Romance"],
    duration: 104,
    ageRating: "12",
    releaseDate: "2026-01-16",
    status: "archived",
    director: "Anna Muylaert",
    cast: ["Julia Stockler", "Marco Pigossi"],
    distributor: "Imovision",
    languages: ["Original"],
    formats: ["2D"],
    featured: false,
    year: 2025,
    country: "Brasil",
    endDate: "2026-03-02",
    ticketsSold: 4210,
    futureSessions: 0,
    allowPresale: false,
  },
  {
    id: "m7",
    slug: "projeto-sessao-das-criancas",
    title: "Projeto Sessão das Crianças",
    originalTitle: "Kids Matinee Project",
    synopsis:
      "Rascunho interno para uma sessão educativa em parceria com escolas da região.",
    shortDescription: "Sessão educativa em elaboração.",
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1400&q=80",
    trailerUrl: "",
    genre: ["Animação"],
    duration: 90,
    ageRating: "L",
    releaseDate: "2026-10-12",
    status: "draft",
    director: "A definir",
    cast: [],
    distributor: "A definir",
    languages: ["Dublado"],
    formats: ["2D"],
    featured: false,
    year: 2026,
    country: "Brasil",
    ticketsSold: 0,
    futureSessions: 0,
    allowPresale: false,
  },
];

const publicAdminMovies: AdminMovie[] = movies.map((movie, index) => {
  const tickets = [3120, 2684, 1980][index] ?? 800;
  const future = [21, 14, 18][index] ?? 8;
  return {
    ...movie,
    year: Number(movie.releaseDate.slice(0, 4)),
    country: "Estados Unidos",
    endDate: "2026-09-30",
    ageRatingNote:
      movie.ageRating === "L"
        ? "Conteúdo adequado para todas as idades."
        : `Classificação ${movie.ageRating} anos.`,
    metaTitle: `${movie.title} | Cineplaza Itumbiara`,
    metaDescription: movie.shortDescription,
    ticketsSold: tickets,
    futureSessions: future,
    allowPresale: movie.status === "pre-sale",
  };
});

export const initialAdminMovies: AdminMovie[] = [
  ...publicAdminMovies,
  ...extraMovies,
];

export const initialAdminRooms: AdminRoom[] = cinemaInfo.rooms.map(
  (room, index) => ({
    id: `room-${index + 1}`,
    name: room.name,
    shortName: `Sala ${index + 1}`,
    capacity: room.capacity,
    features: room.features,
    formats: index === 1 ? ["2D", "3D"] : index === 0 ? ["2D", "Premium"] : ["2D"],
    status: index === 2 ? "active" : "active",
    occupancyToday: [72, 64, 51][index] ?? 50,
  })
);

function roomCapacity(roomName: string): number {
  const room = initialAdminRooms.find(
    (item) => item.shortName === roomName || item.name.startsWith(roomName)
  );
  return room?.capacity ?? 140;
}

export const initialAdminSessions: AdminSession[] = sessions.map(
  (session, index) => {
    const capacity = roomCapacity(session.room);
    const ratio =
      session.status === "sold-out"
        ? 1
        : session.status === "few-seats"
          ? 0.93
          : [0.41, 0.58, 0.67, 0.74, 0.36, 0.82, 0.49][index % 7];
    const sold = Math.min(capacity, Math.round(capacity * ratio));
    return {
      ...session,
      sold,
      capacity,
      occupancy: sold / capacity,
    };
  }
);

const customers = [
  ["Ana Souza", "ana.souza@email.com"],
  ["Bruno Lima", "bruno.lima@email.com"],
  ["Carla Mendes", "carla.mendes@email.com"],
  ["Diego Alves", "diego.alves@email.com"],
  ["Elisa Castro", "elisa.castro@email.com"],
  ["Fábio Nunes", "fabio.nunes@email.com"],
  ["Giovana Reis", "giovana.reis@email.com"],
  ["Henrique Dias", "henrique.dias@email.com"],
];

export const initialAdminSales: AdminSale[] = Array.from({ length: 18 }).map(
  (_, index) => {
    const [customer, email] = customers[index % customers.length];
    const movie = publicAdminMovies[index % publicAdminMovies.length];
    const channel = (["site", "box-office", "totem", "app"] as const)[
      index % 4
    ];
    const status = (
      ["paid", "paid", "paid", "pending", "cancelled", "refunded"] as const
    )[index % 6];
    const qty = (index % 3) + 1;
    const unit = index % 5 === 0 ? ticketPrices.half : ticketPrices.full;
    const subtotal = qty * unit;
    const fee = qty * ticketPrices.serviceFee;
    const date = new Date();
    date.setHours(10 + (index % 10), (index * 7) % 60, 0, 0);
    date.setDate(date.getDate() - (index % 6));
    return {
      id: `v${index + 1}`,
      code: `CPZ-2026-${String(1840 + index).padStart(5, "0")}`,
      createdAt: date.toISOString(),
      channel,
      status,
      customer,
      email,
      movieTitle: movie.title,
      sessionLabel: `${["Sala 1", "Sala 2", "Sala 3"][index % 3]} · ${["15:00", "19:00", "21:30"][index % 3]}`,
      items: [
        {
          label: unit === ticketPrices.half ? "Meia-entrada" : "Inteira",
          quantity: qty,
          unitPrice: unit,
        },
      ],
      subtotal,
      fee,
      total: status === "cancelled" ? 0 : subtotal + fee,
      paymentMethod: ["Pix", "Cartão de crédito", "Dinheiro", "Cartão de débito"][
        index % 4
      ],
    };
  }
);

export const initialAdminPromotions: AdminPromotion[] = [
  {
    ...promotions[0],
    status: "active",
    startsAt: "2026-01-07",
    endsAt: "2026-08-27",
    discountLabel: "50% no ingresso",
    scope: "Todas as sessões de quarta-feira",
    redemptions: 1842,
  },
  {
    id: "promo-combo",
    title: "Combo da sessão",
    subtitle: "Pipoca média + refrigerante com desconto",
    description:
      "Na compra do ingresso pelo site, o combo clássico sai com preço especial.",
    ctaLabel: "Ver cardápio",
    ctaHref: "/cardapio",
    status: "scheduled",
    startsAt: "2026-09-01",
    endsAt: "2026-09-30",
    discountLabel: "R$ 6 de desconto",
    scope: "Bomboniere · Combo Clássico",
    redemptions: 0,
  },
  {
    id: "promo-ferias",
    title: "Férias no Cineplaza",
    subtitle: "Meia para estudantes o mês inteiro",
    description: "Campanha encerrada da temporada de férias escolares.",
    ctaLabel: "Ver filmes",
    ctaHref: "/filmes",
    status: "ended",
    startsAt: "2026-07-01",
    endsAt: "2026-07-31",
    discountLabel: "Meia-entrada estendida",
    scope: "Ingressos de matinê",
    redemptions: 960,
  },
];

export const initialAdminProducts: AdminProduct[] = products.map(
  (product, index) => {
    const sold = [420, 310, 96, 188, 540, 150, 210, 260][index] ?? 80;
    const stock = [18, 24, 4, 32, 80, 12, 40, 6][index] ?? 20;
    return {
      ...product,
      stock,
      soldPeriod: sold,
      revenuePeriod: sold * product.priceFrom,
      lowStock: stock <= 8,
    };
  }
);

export const initialAdminSettings: AdminSettings = {
  name: cinemaInfo.name,
  tagline: cinemaInfo.tagline,
  email: cinemaInfo.email,
  phone: cinemaInfo.phone,
  whatsapp: cinemaInfo.whatsapp,
  businessHours: cinemaInfo.businessHours,
  address: `${cinemaInfo.address.street}, ${cinemaInfo.address.neighborhood} — ${cinemaInfo.address.city}/${cinemaInfo.address.state}`,
  parking: cinemaInfo.parking,
  accessibility: cinemaInfo.accessibility,
  fullPrice: ticketPrices.full,
  halfPrice: ticketPrices.half,
  promoPrice: ticketPrices.promo,
  serviceFee: ticketPrices.serviceFee,
};

export const dashboardKpis: Record<PeriodKey, DashboardKpis> = {
  today: {
    grossRevenue: { current: 6240.5, previous: 5810.2, change: 7.4 },
    ticketsSold: { current: 286, previous: 264, change: 8.3 },
    averageTicket: { current: 21.82, previous: 22.01, change: -0.9 },
    occupancy: { current: 58.2, previous: 55.1, change: 5.6 },
    concessionRevenue: { current: 1980.4, previous: 1720.0, change: 15.1 },
    sessionsHeld: { current: 14, previous: 14, change: 0 },
  },
  "7d": {
    grossRevenue: { current: 41280.9, previous: 38840.0, change: 6.3 },
    ticketsSold: { current: 1894, previous: 1760, change: 7.6 },
    averageTicket: { current: 21.8, previous: 22.07, change: -1.2 },
    occupancy: { current: 61.1, previous: 59.4, change: 2.9 },
    concessionRevenue: { current: 12140.2, previous: 10890.5, change: 11.5 },
    sessionsHeld: { current: 98, previous: 96, change: 2.1 },
  },
  month: {
    grossRevenue: { current: 184750.8, previous: 170430.2, change: 8.4 },
    ticketsSold: { current: 8462, previous: 8044, change: 5.2 },
    averageTicket: { current: 21.83, previous: 21.38, change: 2.1 },
    occupancy: { current: 63.4, previous: 64.2, change: -1.2 },
    concessionRevenue: { current: 52680.4, previous: 46780.1, change: 12.6 },
    sessionsHeld: { current: 426, previous: 410, change: 3.9 },
  },
  "prev-month": {
    grossRevenue: { current: 170430.2, previous: 162110.0, change: 5.1 },
    ticketsSold: { current: 8044, previous: 7780, change: 3.4 },
    averageTicket: { current: 21.38, previous: 20.84, change: 2.6 },
    occupancy: { current: 64.2, previous: 61.8, change: 3.9 },
    concessionRevenue: { current: 46780.1, previous: 44120.0, change: 6.0 },
    sessionsHeld: { current: 410, previous: 402, change: 2.0 },
  },
  custom: {
    grossRevenue: { current: 28640.0, previous: 25110.0, change: 14.1 },
    ticketsSold: { current: 1310, previous: 1188, change: 10.3 },
    averageTicket: { current: 21.86, previous: 21.14, change: 3.4 },
    occupancy: { current: 60.8, previous: 57.2, change: 6.3 },
    concessionRevenue: { current: 8420.0, previous: 7310.0, change: 15.2 },
    sessionsHeld: { current: 62, previous: 58, change: 6.9 },
  },
};

function buildRevenueSeries(days: number, ticketBase: number, concessionBase: number): RevenuePoint[] {
  const points: RevenuePoint[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const wave = 0.72 + Math.sin(i / 2.2) * 0.18 + (i % 3 === 0 ? 0.12 : 0);
    points.push({
      date: date.toISOString().slice(0, 10),
      tickets: Math.round(ticketBase * wave),
      concession: Math.round(concessionBase * (wave - 0.08)),
    });
  }
  return points;
}

export const revenueSeries: Record<PeriodKey, RevenuePoint[]> = {
  today: buildRevenueSeries(8, 820, 260),
  "7d": buildRevenueSeries(7, 5400, 1600),
  month: buildRevenueSeries(14, 11800, 3400),
  "prev-month": buildRevenueSeries(14, 10900, 3100),
  custom: buildRevenueSeries(10, 2800, 840),
};

export const channelShare: ChannelShare[] = [
  { id: "site", label: "Site", value: 38 },
  { id: "box-office", label: "Bilheteria", value: 30 },
  { id: "totem", label: "Totem", value: 19 },
  { id: "app", label: "Aplicativo", value: 13 },
];

export const occupancySlots: OccupancySlot[] = [
  { id: "matinee", label: "Matinê", value: 48.2 },
  { id: "afternoon", label: "Tarde", value: 61.5 },
  { id: "night", label: "Noite", value: 78.4 },
  { id: "late", label: "Última sessão", value: 54.1 },
];

export const topMovies: TopMovie[] = [
  {
    id: "m1",
    title: "Homem-Aranha: Um Novo Dia",
    posterUrl: "/catalog/homenaranha.jpg",
    ticketsSold: 3120,
    revenue: 84240,
    occupancy: 74.2,
    trend: 8.4,
  },
  {
    id: "m2",
    title: "Patrulha Canina: Uma Aventura Dino",
    posterUrl: "/catalog/patrulhacanina.jpg",
    ticketsSold: 2684,
    revenue: 68420,
    occupancy: 69.1,
    trend: 3.2,
  },
  {
    id: "m3",
    title: "O Fim da Rua",
    posterUrl: "/catalog/ofimdarua.jpg",
    ticketsSold: 1980,
    revenue: 53460,
    occupancy: 58.6,
    trend: -2.1,
  },
  {
    id: "m5",
    title: "Corrida Noturna",
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    ticketsSold: 612,
    revenue: 18360,
    occupancy: 41.0,
    trend: 18.6,
  },
];

export const initialAlerts: AdminAlert[] = [
  {
    id: "a1",
    title: "Sessão próxima da lotação",
    description: "Homem-Aranha às 19:00 na Sala 1 está com 93% de ocupação.",
    severity: "warning",
    time: "há 12 min",
    href: "/admin/sessoes",
    actionLabel: "Ver sessão",
  },
  {
    id: "a2",
    title: "Filme sem sessões futuras",
    description: "Estrelas do Cerrado está em breve, mas ainda não possui sessões.",
    severity: "info",
    time: "há 1 h",
    href: "/admin/programacao",
    actionLabel: "Montar programação",
  },
  {
    id: "a3",
    title: "Estoque baixo na bomboniere",
    description: "Balde Colecionável e Bala Sortida estão abaixo do mínimo.",
    severity: "warning",
    time: "há 2 h",
    href: "/admin/bomboniere",
    actionLabel: "Ver produtos",
  },
  {
    id: "a4",
    title: "Promoção próxima do encerramento",
    description: "Quarta Cineplaza encerra em 10 dias neste calendário demonstrativo.",
    severity: "info",
    time: "hoje",
    href: "/admin/promocoes",
    actionLabel: "Revisar promoção",
  },
  {
    id: "a5",
    title: "Divergência no fechamento de caixa",
    description: "Diferença simulada de R$ 42,00 no caixa da bilheteria de ontem.",
    severity: "critical",
    time: "ontem, 23:10",
    href: "/admin/financeiro",
    actionLabel: "Abrir financeiro",
  },
];

export function getUpcomingSessionRows(
  list: AdminSession[],
  movieList: AdminMovie[]
): UpcomingSessionRow[] {
  const now = new Date();
  return list
    .filter((session) => {
      const [hours, minutes] = session.time.split(":").map(Number);
      const date = new Date(
        `${session.date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
      );
      return date.getTime() >= now.getTime() && !session.cancelled;
    })
    .slice(0, 6)
    .map((session) => {
      const movie = movieList.find((item) => item.id === session.movieId);
      return {
        id: session.id,
        time: `${session.date} ${session.time}`,
        movieTitle: movie?.title ?? "Filme",
        room: session.room,
        format: session.format,
        language: session.language,
        sold: session.sold,
        capacity: session.capacity,
        occupancy: session.occupancy,
        status: session.status,
      };
    });
}

export const financeBreakdown = [
  { label: "Ingressos", value: 184750.8 },
  { label: "Bomboniere", value: 52680.4 },
  { label: "Taxa de serviço", value: 25386.0 },
  { label: "Estornos", value: -1840.0 },
];

export const paymentMethods = [
  { label: "Pix", value: 41 },
  { label: "Cartão de crédito", value: 33 },
  { label: "Cartão de débito", value: 18 },
  { label: "Dinheiro", value: 8 },
];
