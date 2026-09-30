import Link from "next/link";
import { getNav } from "@/lib/content";

export function SiteHeader({ woodTheme = false }: { woodTheme?: boolean }) {
  const nav = getNav().filter((item) => item.href !== "/");

  return (
    <header
      className={
        woodTheme
          ? "sticky top-0 z-50 border-b border-[#c4b5a0]/50 bg-[#e9e0d2]/88 backdrop-blur-md"
          : "sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f4ef]/90 backdrop-blur-md"
      }
    >      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-serif text-2xl tracking-[0.18em] text-stone-900">
          X-STYLE
        </Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.14em] text-stone-700 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-stone-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/workshop"
          className="rounded-full border border-stone-800 px-4 py-2 text-xs uppercase tracking-[0.12em] text-stone-900 transition hover:bg-stone-900 hover:text-[#f7f4ef]"
        >
          Мастерская
        </Link>
      </div>
    </header>
  );
}
