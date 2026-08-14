"use client";

import { useEffect, useRef } from "react";
import {
  hasOptionalConsent,
  COOKIE_CONSENT_UPDATED_EVENT,
} from "@/lib/cookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function loadGA(measurementId: string): void {
  if (typeof window === "undefined" || (window as unknown as { gtag?: unknown }).gtag) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag = function gtag(...args: unknown[]) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(args);
  };
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("js", new Date());
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("config", measurementId, {
    send_page_view: true,
    anonymize_ip: true,
  });
}

function loadGTM(containerId: string): void {
  if (typeof window === "undefined" || document.getElementById("gtm-script")) return;
  (window as unknown as { dataLayer: unknown[] }).dataLayer = (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
  (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });
  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
  document.head.appendChild(script);
}

function loadMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || (window as unknown as { fbq?: unknown }).fbq) return;
  const f = (window as unknown as { fbq: (...args: unknown[]) => void }).fbq = function (...args: unknown[]) {
    (f as unknown as { call?: (...a: unknown[]) => void }).call?.(f, ...args);
    (f as unknown as { queue?: unknown[] }).queue = (f as unknown as { queue?: unknown[] }).queue || [];
    (f as unknown as { queue: unknown[] }).queue.push(args);
  };
  if (!(window as unknown as { _fbq?: unknown })._fbq) (window as unknown as { _fbq: unknown })._fbq = f;
  f("set", "autoConfig", false, pixelId);
  f("init", pixelId);
  f("track", "PageView");
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
}

function runAnalytics(): void {
  if (!hasOptionalConsent()) return;
  if (GA_ID) loadGA(GA_ID);
  if (GTM_ID) loadGTM(GTM_ID);
  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);
}

/**
 * Carrega Google Analytics, GTM e Meta Pixel apenas quando o usuário
 * aceitar cookies opcionais (LGPD). Não bloqueia a renderização.
 */
export default function Analytics() {
  const loaded = useRef(false);

  useEffect(() => {
    const load = () => {
      if (loaded.current) return;
      if (hasOptionalConsent()) {
        runAnalytics();
        loaded.current = true;
      }
    };

    load();
    window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, load);
    return () => window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, load);
  }, []);

  return null;
}
