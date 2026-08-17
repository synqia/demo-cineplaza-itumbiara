"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isAdminPath } from "@/lib/admin";
import {
  getStoredConsent,
  COOKIE_CONSENT_STORAGE_KEY,
  COOKIE_CONSENT_UPDATED_EVENT,
  type CookieConsentState,
} from "@/lib/cookieConsent";


function setStoredConsent(essential: boolean, optional: boolean): void {
  try {
    localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify({
        essential,
        optional,
        timestamp: Date.now(),
      } satisfies CookieConsentState)
    );
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_UPDATED_EVENT));
  } catch {
    // ignore
  }
}

function shouldShowBanner(): boolean {
  const consent = getStoredConsent();
  if (consent) return false;
  if (typeof window === "undefined") return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get("cookies") === "preferencias") return true;
  return true;
}

export default function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(shouldShowBanner());
    }, 100);
  }, []);

  const acceptEssentialOnly = () => {
    setStoredConsent(true, false);
    setVisible(false);
  };

  const acceptAll = () => {
    setStoredConsent(true, true);
    setVisible(false);
  };

  if (isAdminPath(pathname) || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed bottom-0 left-0 right-0 z-100 border-t border-border-default bg-bg-base p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]"
    >
      <div className="mx-auto flex max-w-300 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-text-faint text-sm font-body leading-relaxed">
          Utilizamos cookies para garantir o funcionamento do site e, com sua
          autorização, para melhorar sua experiência (conforme a LGPD). Você
          pode aceitar apenas os essenciais ou todos.{" "}
          <Link
            href="/cookies"
            className="text-primary underline underline-offset-2 hover:no-underline"
          >
            Entenda sobre cookies
          </Link>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" size="default" onClick={acceptAll}>
            Aceitar cookies
          </Button>
          <Button
            type="button"
            variant="outline"
            size="xs"
            onClick={acceptEssentialOnly}
          >
            Aceitar essenciais
          </Button>
        </div>
      </div>
    </div>
  );
}
