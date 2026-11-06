"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/reportar", label: "Reportar" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-line bg-canvas">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-6 py-3 sm:flex-row sm:justify-between sm:gap-4">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 rounded-ui font-heading text-xl font-extrabold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Icon name="paw" className="h-6 w-6 text-accent" /> Busca tu perrito
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {navigation.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-ui px-3 py-2 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:px-4 sm:text-base ${
                      isActive
                        ? "bg-soft font-semibold text-accent-hover underline underline-offset-4"
                        : "text-muted hover:bg-soft hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
