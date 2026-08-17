import type { Session, SessionFormat, SessionLanguage, SessionStatus } from "@/types/cinema";
import { movies } from "@/data/movies";

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Gera datas relativas a partir de hoje para o protótipo permanecer atual. */
export function getScheduleDates(days = 7): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  for (let i = 0; i < days; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(toDateKey(date));
  }
  return dates;
}

export function getTodayKey(): string {
  return getScheduleDates(1)[0];
}

type SessionTemplate = {
  movieId: string;
  time: string;
  room: string;
  format: SessionFormat;
  language: SessionLanguage;
  accessibility?: boolean;
  price: number;
  dayOffset?: number[];
};

const templates: SessionTemplate[] = [
  { movieId: "m1", time: "15:00", room: "Sala 1", format: "2D", language: "Dublado", price: 30, accessibility: true },
  { movieId: "m1", time: "19:00", room: "Sala 1", format: "2D", language: "Dublado", price: 30 },
  { movieId: "m1", time: "21:30", room: "Sala 1", format: "2D", language: "Dublado", price: 30 },
  { movieId: "m2", time: "15:00", room: "Sala 2", format: "2D", language: "Dublado", price: 30, accessibility: true },
  { movieId: "m2", time: "19:00", room: "Sala 2", format: "2D", language: "Dublado", price: 30 },
  { movieId: "m3", time: "15:00", room: "Sala 3", format: "2D", language: "Dublado", price: 30, accessibility: true },
  { movieId: "m3", time: "19:00", room: "Sala 3", format: "2D", language: "Dublado", price: 30 },
  { movieId: "m3", time: "21:30", room: "Sala 3", format: "2D", language: "Dublado", price: 30 },
];

function resolveStatus(
  dateKey: string,
  time: string,
  index: number
): SessionStatus {
  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const sessionDate = new Date(`${dateKey}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`);

  if (sessionDate.getTime() < now.getTime() - 15 * 60 * 1000) {
    return "ended";
  }

  const pattern = index % 7;
  if (pattern === 0) return "few-seats";
  if (pattern === 3) return "sold-out";
  return "available";
}

function buildSessions(): Session[] {
  const dates = getScheduleDates(7);
  const result: Session[] = [];
  let counter = 1;

  templates.forEach((template) => {
    const movie = movies.find((item) => item.id === template.movieId);
    if (!movie) return;

    dates.forEach((dateKey, dayIndex) => {
      if (template.dayOffset && !template.dayOffset.includes(dayIndex)) {
        return;
      }

      if (
        movie.status === "now-showing" &&
        template.dayOffset === undefined &&
        dayIndex > 6
      ) {
        return;
      }

      result.push({
        id: `s${counter}`,
        movieId: template.movieId,
        date: dateKey,
        time: template.time,
        room: template.room,
        format: template.format,
        language: template.language,
        status: resolveStatus(dateKey, template.time, counter + dayIndex),
        accessibility: Boolean(template.accessibility),
        price: template.price,
      });
      counter += 1;
    });
  });

  return result;
}

export const sessions: Session[] = buildSessions();

export function getSessionsByDate(date: string): Session[] {
  return sessions.filter((session) => session.date === date);
}

export function getSessionsByMovie(
  movieId: string,
  date?: string
): Session[] {
  return sessions.filter((session) => {
    if (session.movieId !== movieId) return false;
    if (date && session.date !== date) return false;
    return true;
  });
}

export function getSessionById(id: string): Session | undefined {
  return sessions.find((session) => session.id === id);
}

export function filterSessions(params: {
  date?: string;
  movieId?: string;
  genre?: string;
  language?: string;
  format?: string;
}): Session[] {
  const movieMap = new Map(movies.map((movie) => [movie.id, movie]));

  return sessions.filter((session) => {
    const movie = movieMap.get(session.movieId);
    if (!movie) return false;
    if (params.date && session.date !== params.date) return false;
    if (params.movieId && session.movieId !== params.movieId) return false;
    if (params.language && session.language !== params.language) return false;
    if (params.format && session.format !== params.format) return false;
    if (params.genre && !movie.genre.includes(params.genre)) return false;
    return true;
  });
}
