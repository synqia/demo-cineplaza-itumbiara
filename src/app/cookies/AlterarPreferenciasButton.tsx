"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie_consent";

export default function AlterarPreferenciasButton() {
  const router = useRouter();

  const handleClick = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    router.push("/?cookies=preferencias");
  };

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleClick}>
      Alterar preferências de cookies
    </Button>
  );
}
