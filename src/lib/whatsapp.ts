/**
 * Constrói a mensagem padrão do WhatsApp com UTM da página atual (quando disponível).
 * UTM é incluído para rastreio de origem do lead.
 */
export function buildWhatsAppMessage(
  baseMessage: string,
  utmQueryString?: string | null
): string {
  if (!utmQueryString || !utmQueryString.trim()) return baseMessage;
  const params = new URLSearchParams(utmQueryString.trim());
  const utmSource = params.get("utm_source");
  const utmMedium = params.get("utm_medium");
  const utmCampaign = params.get("utm_campaign");
  if (!utmSource && !utmMedium && !utmCampaign) return baseMessage;
  const parts = [baseMessage];
  const utmParts: string[] = [];
  if (utmSource) utmParts.push(`utm_source=${utmSource}`);
  if (utmMedium) utmParts.push(`utm_medium=${utmMedium}`);
  if (utmCampaign) utmParts.push(`utm_campaign=${utmCampaign}`);
  if (utmParts.length) parts.push(`(${utmParts.join(" | ")})`);
  return parts.join("\n");
}

export function buildWhatsAppUrl(number: string, text?: string): string {
  const digits = number.replace(/\D/g, "") || "0";
  const base = `https://wa.me/${digits}`;
  if (text?.trim()) {
    return `${base}?text=${encodeURIComponent(text.trim())}`;
  }
  return base;
}
