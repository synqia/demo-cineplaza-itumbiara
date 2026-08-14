import type { Movie } from "@/types/cinema";

/**
 * Catálogo demonstrativo do Cineplaza.
 * Imagens: Unsplash (uso demonstrativo). Trocar por assets oficiais na integração.
 */
export const movies: Movie[] = [
  {
    id: "m1",
    slug: "aurora-do-norte",
    title: "Aurora do Norte",
    originalTitle: "Northern Dawn",
    synopsis:
      "Uma cientista polar descobre um fenômeno luminoso que conecta memórias de gerações diferentes. Em uma estação isolada, ela precisa decidir se revela a verdade ou protege o equilíbrio frágil da região.",
    shortDescription:
      "Um mistério polar sobre memória, luz e escolhas impossíveis.",
    posterUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Drama", "Ficção científica"],
    duration: 128,
    ageRating: "12",
    releaseDate: "2026-08-07",
    status: "now-showing",
    director: "Helena Vargas",
    cast: ["Marina Costa", "Thiago Nunes", "Lia Prado"],
    distributor: "Horizonte Filmes",
    languages: ["Dublado", "Legendado"],
    formats: ["2D", "Premium"],
    featured: true,
    isNewRelease: true,
  },
  {
    id: "m2",
    slug: "corrida-noturna",
    title: "Corrida Noturna",
    originalTitle: "Night Sprint",
    synopsis:
      "Em uma cidade onde o trânsito nunca dorme, um entregador se vê no meio de uma perseguição que mistura humor, adrenalina e reencontros inesperados.",
    shortDescription: "Ação urbana com humor e velocidade de sobra.",
    posterUrl:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Ação", "Comédia"],
    duration: 112,
    ageRating: "14",
    releaseDate: "2026-07-31",
    status: "now-showing",
    director: "Rafael Monteiro",
    cast: ["Diego Alves", "Camila Rocha", "Bruno Pêra"],
    distributor: "Rua Alta Pictures",
    languages: ["Dublado"],
    formats: ["2D", "3D"],
    featured: true,
  },
  {
    id: "m3",
    slug: "o-jardim-secreto-de-clara",
    title: "O Jardim Secreto de Clara",
    originalTitle: "Clara's Secret Garden",
    synopsis:
      "Clara encontra um jardim escondido atrás do prédio onde mora e, com a ajuda de novos amigos, redescobre a magia das pequenas descobertas.",
    shortDescription: "Uma aventura familiar cheia de afeto e imaginação.",
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Família", "Aventura"],
    duration: 98,
    ageRating: "L",
    releaseDate: "2026-08-01",
    status: "now-showing",
    director: "Sofia Belmonte",
    cast: ["Ana Luz", "Pedro Mello", "Irene Paiva"],
    distributor: "Casa Amarela",
    languages: ["Dublado", "Legendado"],
    formats: ["2D"],
    featured: false,
  },
  {
    id: "m4",
    slug: "ecos-de-vidro",
    title: "Ecos de Vidro",
    originalTitle: "Glass Echoes",
    synopsis:
      "Um investigador de crimes silenciosos encontra padrões em reflexos e janelas. Cada pista o aproxima de um passado que ele tentou esquecer.",
    shortDescription: "Suspense psicológico com atmosfera noturna.",
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Suspense", "Drama"],
    duration: 121,
    ageRating: "16",
    releaseDate: "2026-08-10",
    status: "now-showing",
    director: "Igor Salgado",
    cast: ["Renata Vale", "Caio Mendes", "Vera Lima"],
    distributor: "Noir Brasil",
    languages: ["Legendado"],
    formats: ["2D", "Premium"],
    featured: true,
    isNewRelease: true,
  },
  {
    id: "m5",
    slug: "samba-na-chuva-digital",
    title: "Samba na Chuva Digital",
    originalTitle: "Digital Rain Samba",
    synopsis:
      "Uma produtora musical independente precisa salvar o festival do bairro quando a tecnologia da cidade falha na véspera do grande show.",
    shortDescription: "Comédia musical brasileira com ritmo e coração.",
    posterUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Comédia", "Musical"],
    duration: 105,
    ageRating: "10",
    releaseDate: "2026-07-24",
    status: "now-showing",
    director: "Juliana Ferraz",
    cast: ["Bia Nogueira", "Lucas Pires", "Zé do Carmo"],
    distributor: "Batucada Filmes",
    languages: ["Dublado"],
    formats: ["2D"],
    featured: false,
  },
  {
    id: "m6",
    slug: "fronteira-azul",
    title: "Fronteira Azul",
    originalTitle: "Blue Frontier",
    synopsis:
      "Dois irmãos pescadores enfrentam uma tempestade histórica e descobrem que o maior risco não está no mar, mas na decisão de voltar para casa.",
    shortDescription: "Drama de sobrevivência com paisagens imersivas.",
    posterUrl:
      "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Drama", "Aventura"],
    duration: 134,
    ageRating: "12",
    releaseDate: "2026-08-14",
    status: "now-showing",
    director: "Mateus Quaresma",
    cast: ["André Farias", "Otávio Reis", "Nina Borges"],
    distributor: "Atlântico",
    languages: ["Dublado", "Legendado"],
    formats: ["2D", "3D", "Premium"],
    featured: true,
    isNewRelease: true,
  },
  {
    id: "m7",
    slug: "pixel-e-poeira",
    title: "Pixel e Poeira",
    originalTitle: "Pixel & Dust",
    synopsis:
      "Em um futuro próximo, uma restauradora de jogos antigos encontra um cartucho capaz de reescrever memórias digitais — e realidades.",
    shortDescription: "Ficção sci-fi com nostalgia e mistério.",
    posterUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Ficção científica", "Aventura"],
    duration: 118,
    ageRating: "12",
    releaseDate: "2026-08-28",
    status: "pre-sale",
    director: "Karen Duarte",
    cast: ["Felipe Prado", "Yasmin Ortiz", "Hugo Stein"],
    distributor: "Neon Valley",
    languages: ["Dublado", "Legendado"],
    formats: ["2D", "3D"],
    featured: true,
  },
  {
    id: "m8",
    slug: "a-ultima-sessao",
    title: "A Última Sessão",
    originalTitle: "The Last Screening",
    synopsis:
      "Quando um cinema de bairro está prestes a fechar, a equipe organiza uma sessão especial que muda a noite — e o destino — de todos.",
    shortDescription: "Um tributo emocionante ao cinema de rua.",
    posterUrl:
      "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Drama"],
    duration: 110,
    ageRating: "10",
    releaseDate: "2026-09-04",
    status: "pre-sale",
    director: "Paulo Rezende",
    cast: ["Clara Mota", "Sérgio Vale", "Duda Martins"],
    distributor: "Tela Viva",
    languages: ["Dublado"],
    formats: ["2D", "Premium"],
    featured: false,
  },
  {
    id: "m9",
    slug: "estrelas-de-papel",
    title: "Estrelas de Papel",
    originalTitle: "Paper Stars",
    synopsis:
      "Uma professora de artes e seus alunos montam um planetário improvisado e acabam inspirando toda a cidade a olhar para o céu novamente.",
    shortDescription: "Animação delicada sobre criatividade e comunidade.",
    posterUrl:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Animação", "Família"],
    duration: 95,
    ageRating: "L",
    releaseDate: "2026-09-11",
    status: "coming-soon",
    director: "Elisa Nakamura",
    cast: ["Vozes: Bea Torres", "Rafa Gomes", "Leo Kim"],
    distributor: "Lume Kids",
    languages: ["Dublado"],
    formats: ["2D", "3D"],
    featured: false,
  },
  {
    id: "m10",
    slug: "codigo-vermelhao",
    title: "Código Vermelhão",
    originalTitle: "Code Scarlet",
    synopsis:
      "Uma espiã aposentada é forçada a voltar ao jogo quando um antigo código de segurança ressurge em mãos erradas.",
    shortDescription: "Espionagem contemporânea com ritmo intenso.",
    posterUrl:
      "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Ação", "Suspense"],
    duration: 126,
    ageRating: "16",
    releaseDate: "2026-09-18",
    status: "coming-soon",
    director: "Tomás Rivera",
    cast: ["Isabela Cruz", "Mark Owen", "Patrícia Neri"],
    distributor: "Atlas Global",
    languages: ["Dublado", "Legendado"],
    formats: ["2D", "Premium"],
    featured: true,
  },
  {
    id: "m11",
    slug: "noite-de-ensaio",
    title: "Noite de Ensaio",
    originalTitle: "Rehearsal Night",
    synopsis:
      "No ensaio geral de uma peça, os atores começam a viver fora do palco as mesmas cenas que ensaiam — e o limiar entre ficção e realidade se dissolve.",
    shortDescription: "Drama teatral com reviravoltas elegantes.",
    posterUrl:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=600&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1600&q=80",
    trailerUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    genre: ["Drama"],
    duration: 116,
    ageRating: "14",
    releaseDate: "2026-09-25",
    status: "coming-soon",
    director: "Amélia Costa",
    cast: ["Gustavo Lira", "Helena Dias", "João Velloso"],
    distributor: "Palco Aberto",
    languages: ["Original", "Legendado"],
    formats: ["2D"],
    featured: false,
  },
];

export function getMovieById(id: string): Movie | undefined {
  return movies.find((movie) => movie.id === id);
}

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((movie) => movie.slug === slug);
}

export function getMoviesByStatus(status: Movie["status"]): Movie[] {
  return movies.filter((movie) => movie.status === status);
}

export function getFeaturedMovies(): Movie[] {
  return movies.filter((movie) => movie.featured);
}

export function getNowShowingMovies(): Movie[] {
  return getMoviesByStatus("now-showing");
}

export function getComingSoonMovies(): Movie[] {
  return movies.filter(
    (movie) => movie.status === "coming-soon" || movie.status === "pre-sale"
  );
}

export function getRelatedMovies(movie: Movie, limit = 4): Movie[] {
  return movies
    .filter(
      (item) =>
        item.id !== movie.id &&
        item.genre.some((genre) => movie.genre.includes(genre))
    )
    .slice(0, limit);
}

export function getAllMovieSlugs(): string[] {
  return movies.map((movie) => movie.slug);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  return `${hours}h ${mins.toString().padStart(2, "0")}min`;
}
