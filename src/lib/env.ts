/**
 * Variáveis de ambiente usadas apenas para:
 * - URL pública do site (metadata, sitemap, robots)
 * - Analytics (Meta Pixel, Google Analytics, GTM — opcional)
 */

function getEnv(key: string): string {
  if (typeof process === "undefined") return "";
  return (process.env[key] ?? "").trim();
}

/** Base URL do site (do .env). Usado em metadata, sitemap e robots. */
export function getBaseUrl(): string {
  return getEnv("NEXT_PUBLIC_SITE_URL") || "";
}

/** IDs de analytics (opcionais). Carregados apenas após consentimento de cookies. */
export function getAnalyticsIds(): {
  gaId: string;
  gtmId: string;
  metaPixelId: string;
} {
  return {
    gaId: getEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
    gtmId: getEnv("NEXT_PUBLIC_GTM_ID"),
    metaPixelId: getEnv("NEXT_PUBLIC_META_PIXEL_ID"),
  };
}
