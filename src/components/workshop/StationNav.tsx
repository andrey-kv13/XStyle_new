"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { STATIONS } from "@/lib/catalog";

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function StationNav({ activeIndex, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (index: number) => {
    onSelect(index);
    setOpen(false);
  };

  return (
    <>
      <header className="pointer-events-auto fixed left-0 right-0 top-0 z-[9999] border-b border-white/10 bg-[#1a1816]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="workshop-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню маршрута"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/25 bg-white/5"
          >
            <span
              className={`h-0.5 w-5 origin-center bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-white transition-all duration-300 ease-out ${
                open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-5 origin-center bg-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.14em] text-[#f2ebe3] md:text-xl"
          >
            X-STYLE
          </Link>
          <p className="ml-auto hidden text-xs text-white/50 sm:block">
            {STATIONS[activeIndex]?.label ?? "Маршрут"}
          </p>
        </div>
        <div className="h-0.5 bg-white/10">
          <div
            className="h-full bg-[#8b7355] transition-all duration-500 ease-out"
            style={{ width: `${(activeIndex / (STATIONS.length - 1)) * 100}%` }}
          />
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-500 ease-out ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <nav
        id="workshop-menu"
        className={`fixed left-0 top-0 z-[9999] flex h-full w-[min(100%,320px)] flex-col border-r border-white/10 bg-[#1a1816] pt-20 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"
        }`}
        aria-label="Разделы маршрута"
        aria-hidden={!open}
      >
        <ul className="space-y-1 px-3">
          <li>
            <Link
              href="/"
              className="block w-full rounded-xl px-4 py-3 text-base font-medium text-white/80 transition hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              Главная
            </Link>
          </li>
        </ul>
        <p className="mt-6 px-5 text-[10px] uppercase tracking-[0.25em] text-white/40">Маршрут</p>
        <ul className="mt-3 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {STATIONS.map((st, index) => (
            <li key={st.id}>
              <button
                type="button"
                onClick={() => go(index)}
                className={`w-full rounded-xl px-4 py-3 text-left text-base font-medium transition duration-200 ${
                  activeIndex === index
                    ? "bg-[#56675c] text-white"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {st.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 px-5 py-4">
          <Link
            href="/our-store"
            className="block rounded-full border border-white/30 py-2.5 text-center text-sm text-white transition hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Контакты и салоны
          </Link>
        </div>
      </nav>
    </>
  );
}
