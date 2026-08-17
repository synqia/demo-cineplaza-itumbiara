import type { Metadata } from "next";

import { AdminProvider } from "@/components/admin/AdminProvider";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Visão geral",
};

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
