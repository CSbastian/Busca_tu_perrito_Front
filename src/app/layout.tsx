import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const displayFont = localFont({
  src: "../../public/fonts/dm-serif-display-400.ttf",
  variable: "--font-display",
  weight: "400",
  display: "swap",
});
const bodyFont = localFont({
  src: [
    { path: "../../public/fonts/nunito-400.ttf", weight: "400" },
    { path: "../../public/fonts/nunito-600.ttf", weight: "600" },
    { path: "../../public/fonts/nunito-700.ttf", weight: "700" },
    { path: "../../public/fonts/nunito-800.ttf", weight: "800" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Busca tu perrito",
  description: "Busca perros por imagen y reporta perros encontrados.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="flex min-h-screen flex-col bg-canvas text-ink">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
