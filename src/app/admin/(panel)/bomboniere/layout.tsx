import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bomboniere" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
