"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Home,
  MapPin,
  Popcorn,
  Ticket,
} from "lucide-react";
import { useTicketPurchase } from "@/components/providers/TicketProvider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Início", icon: Home },
  { href: "/programacao", label: "Programação", icon: Clapperboard },
  { href: "#ingressos", label: "Ingressos", icon: Ticket, primary: true },
  { href: "/cardapio", label: "Cardápio", icon: Popcorn },
  { href: "/o-cineplaza#localizacao", label: "Localização", icon: MapPin },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const { openPurchase } = useTicketPurchase();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      aria-label="Navegação rápida"
    >
      <ul className="grid grid-cols-5 px-1 py-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href.startsWith("#")
                ? false
                : pathname.startsWith(item.href.split("#")[0]);

          if (item.primary) {
            return (
              <li key={item.label} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => openPurchase()}
                  className="flex h-10 min-w-10 flex-col items-center justify-center rounded-xl bg-primary px-1.5 text-white"
                  aria-label="Comprar ingressos"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  <span className="mt-0.5 text-[9px] font-semibold leading-none">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex h-10 flex-col items-center justify-center gap-0.5 rounded-lg px-1 text-[9px] font-medium leading-none",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
