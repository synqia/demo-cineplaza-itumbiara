import type { Movie } from "@/types/cinema";

/**
 * Programação atual do Cineplaza Itumbiara.
 * Pôsteres oficiais em /public/catalog.
 */
export const movies: Movie[] = [
  {
    id: "m1",
    slug: "homem-aranha-um-novo-dia",
    title: "Homem-Aranha: Um Novo Dia",
    originalTitle: "Spider-Man: Brand New Day",
    synopsis:
      "Após os acontecimentos de Homem-Aranha: Sem Volta Para Casa, Peter Parker vive anonimamente em Nova York, tentando conciliar a rotina com a missão de proteger a cidade. Sem poder contar com seus amigos, ele enfrenta uma nova ameaça e vê seus poderes evoluírem — uma jornada de recomeço em que precisa redescobrir o que faz dele o Homem-Aranha.",
    shortDescription:
      "Peter Parker recomeça do zero para proteger Nova York como o amigão da vizinhança.",
    posterUrl: "/catalog/homenaranha.jpg",
    backdropUrl: "/catalog/homenaranha.jpg",
    trailerUrl: "https://www.youtube.com/embed/PlulyWs1kS4",
    genre: ["Ação"],
    duration: 145,
    ageRating: "12",
    releaseDate: "2026-07-29",
    status: "now-showing",
    director: "Destin Daniel Cretton",
    cast: [
      "Tom Holland",
      "Zendaya",
      "Sadie Sink",
      "Jacob Batalon",
      "Jon Bernthal",
      "Florence Pugh",
      "Marisa Tomei",
      "Mark Ruffalo",
    ],
    distributor: "Sony Pictures",
    languages: ["Dublado"],
    formats: ["2D"],
    featured: true,
    isNewRelease: true,
  },
  {
    id: "m2",
    slug: "patrulha-canina-uma-aventura-dino",
    title: "Patrulha Canina: Uma Aventura Dino",
    originalTitle: "PAW Patrol: The Dino Movie",
    synopsis:
      "Depois de uma tempestade, a Patrulha Canina aterrissa em uma misteriosa ilha de dinossauros e encontra Rex, um filhote perdido. Quando a mineração imprudente de Humdinger provoca a erupção de um vulcão, a equipe enfrenta sua maior missão de resgate para salvar a ilha.",
    shortDescription:
      "A patrulha parte para uma ilha de dinossauros em sua maior missão de resgate.",
    posterUrl: "/catalog/patrulhacanina.jpg",
    backdropUrl: "/catalog/patrulhacanina.jpg",
    trailerUrl: "https://www.youtube.com/embed/-b2Jw90vI-Y",
    genre: ["Animação"],
    duration: 88,
    ageRating: "L",
    releaseDate: "2026-08-13",
    status: "now-showing",
    director: "Cal Brunker",
    cast: [
      "Carter Young",
      "Mckenna Grace",
      "Terry Crews",
      "Jennifer Hudson",
      "Jameela Jamil",
    ],
    distributor: "Paramount Pictures",
    languages: ["Dublado"],
    formats: ["2D"],
    featured: true,
  },
  {
    id: "m3",
    slug: "o-fim-da-rua",
    title: "O Fim da Rua",
    originalTitle: "The End of Oak Street",
    synopsis:
      "Nos anos 1980, Denise e Greg enfrentam uma crise no relacionamento enquanto cuidam dos dois filhos adolescentes. Tudo muda quando uma tempestade transporta a vizinhança inteira para a era dos dinossauros. Isolados, os quatro precisam cooperar para sobreviver e voltar para 1980.",
    shortDescription:
      "Uma família dos anos 1980 é transportada para um mundo de dinossauros.",
    posterUrl: "/catalog/ofimdarua.jpg",
    backdropUrl: "/catalog/ofimdarua.jpg",
    trailerUrl: "https://www.youtube.com/embed/SESBdSGgg2k",
    genre: ["Aventura"],
    duration: 100,
    ageRating: "14",
    releaseDate: "2026-08-13",
    status: "now-showing",
    director: "David Robert Mitchell",
    cast: ["Anne Hathaway", "Ewan McGregor", "Maisy Stella", "Christian Convery"],
    distributor: "Warner Bros.",
    languages: ["Dublado"],
    formats: ["2D"],
    featured: true,
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
