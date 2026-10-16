"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/reportar", label: "Reportar" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-4 sm:flex-row sm:justify-between">
        <Link
          href="/"
          className="rounded text-xl font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
        >
          Busca tu perrito
        </Link>
        <nav aria-label="Navegación principal">
          <ul className="flex flex-wrap justify-center gap-2">
            {navigation.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-block rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                      isActive
                        ? "bg-blue-50 font-semibold text-blue-700 underline underline-offset-4"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
