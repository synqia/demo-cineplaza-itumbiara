"use client";

import PromoBar from "@/components/layout/PromoBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNavigation from "@/components/layout/MobileNavigation";
import { TicketProvider } from "@/components/providers/TicketProvider";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <TicketProvider>
      <PromoBar />
      <Header />
      <div className="pb-mobile-nav">{children}</div>
      <Footer />
      <MobileNavigation />
    </TicketProvider>
  );
}
