import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Busca tu perrito",
  description: "Busca perros por imagen y reporta perros encontrados.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
