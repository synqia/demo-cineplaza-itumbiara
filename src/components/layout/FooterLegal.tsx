"use client";

import Link from "next/link";
import { companyData } from "@/data/companyData";

const linkClassLight =
  "text-text-faint text-[12px] font-body hover:text-primary transition-colors";
const linkClassDark =
  "text-white/45 text-[12px] font-body hover:text-white transition-colors";

export default function FooterLegal({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const currentYear = new Date().getFullYear();
  const isDark = variant === "dark";
  const linkClass = isDark ? linkClassDark : linkClassLight;

  return (
    <div
      className={`border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ${
        isDark ? "border-white/10" : "border-border-subtle"
      }`}
    >
      <p
        className={`text-[12px] font-body ${
          isDark ? "text-white/45" : "text-text-faint"
        }`}
      >
        © {currentYear} {companyData.companyName}. Todos os direitos reservados.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/politica-de-privacidade" className={linkClass}>
          Política de Privacidade
        </Link>
        <Link href="/termos-de-uso" className={linkClass}>
          Termos de Uso
        </Link>
        <Link href="/cookies" className={linkClass}>
          Cookies
        </Link>
      </div>
    </div>
  );
}
