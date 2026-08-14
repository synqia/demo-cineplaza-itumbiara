/**
 * Utilitários de consentimento de cookies (LGPD).
 * Compartilhado entre CookieConsent e scripts de analytics.
 */

export const COOKIE_CONSENT_STORAGE_KEY = "cookie_consent";
const VALIDITY_MONTHS = 12;

export interface CookieConsentState {
  essential: boolean;
  optional: boolean;
  timestamp: number;
}

export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsentState;
    if (!parsed || typeof parsed.essential !== "boolean") return null;
    const expiry = parsed.timestamp + VALIDITY_MONTHS * 30 * 24 * 60 * 60 * 1000;
    if (Date.now() > expiry) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasOptionalConsent(): boolean {
  const consent = getStoredConsent();
  return consent?.optional === true;
}

/** Nome do evento disparado quando o usuário atualiza preferências de cookies. */
export const COOKIE_CONSENT_UPDATED_EVENT = "cookie-consent-updated";
