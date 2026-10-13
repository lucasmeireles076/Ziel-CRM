import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluxo | CRM",
  description: "Mini CRM inteligente com atendimento via WhatsApp",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
