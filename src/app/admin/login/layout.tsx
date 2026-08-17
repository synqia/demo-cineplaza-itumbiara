import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acesso ao painel",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
