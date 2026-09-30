"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  type CatalogProduct,
  type WoodId,
  WOOD_OPTIONS,
  getProductsByWood,
  getWoodCount,
} from "@/lib/catalog";
import { storeLocations, ourStoreIntro } from "@/lib/brand-content";
import { stores } from "@/lib/content";
import { ProductModal } from "./ProductModal";
import { StationNav } from "./StationNav";
import { scrollToStation, useHorizontalScroll } from "./useHorizontalScroll";

const FORM_STEPS = [
  {
    step: "1",
    title: "Эскиз и размеры",
    text: "Снимаем проём, согласуем модель, высоту полотна и направление открывания.",
  },
  {
    step: "2",
    title: "Раскрой и сборка",
    text: "Работаем массивом: подбор щита, фрезеровка филёнки, сухая стыковка без скручивания.",
  },
  {
    step: "3",
    title: "Шлифовка и масло",
    text: "Ручная доводка, финиш маслом или лаком — защита и подчёркнутая текстура дерева.",
  },
] as const;

export function WorkshopJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [station, setStation] = useState(0);
  const [wood, setWood] = useState<WoodId>("dub");
  const [product, setProduct] = useState<CatalogProduct | null>(null);

  const products = useMemo(() => getProductsByWood(wood), [wood]);

  useHorizontalScroll(rootRef, trackRef, setStation);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const max = 5;
      if (e.key === "ArrowRight") scrollToStation(Math.min(station + 1, max));
      if (e.key === "ArrowLeft") scrollToStation(Math.max(station - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [station]);

  const goToCollection = (selected: WoodId) => {
    setWood(selected);
    scrollToStation(4);
  };

  return (
    <>
      <StationNav activeIndex={station} onSelect={scrollToStation} />
      <div
        ref={rootRef}
        className="workshop-pin-root workshop-root relative mt-[72px] h-[calc(100vh-72px)] w-full bg-[#2a2622]"
      >
        <div
          ref={trackRef}
          className="workshop-track flex h-full w-max will-change-transform"
        >
          <StationIntro onStart={() => scrollToStation(1)} />
          <StationWood
            selected={wood}
            onSelect={(id) => setWood(id)}
            onShowCatalog={goToCollection}
          />
          <StationForm />
          <StationCharacter />
          <StationCollection
            wood={wood}
            products={products}
            onWoodChange={setWood}
            onOpenProduct={setProduct}
          />
          <StationHome />
        </div>

        <div className="pointer-events-none fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">
            прокрутка колёсиком или свайп →
          </span>
          <span className="hidden text-[10px] text-white/40 sm:inline">
            либо нажмите раздел в меню сверху
          </span>
        </div>
      </div>

      <ProductModal product={product} onClose={() => setProduct(null)} />
    </>
  );
}

function StationIntro({ onStart }: { onStart: () => void }) {
  return (
    <section
      data-station="intro"
      className="relative flex h-full w-screen shrink-0 items-center overflow-hidden bg-[#2a2622] px-8 text-[#f2ebe3] md:px-20"
    >
      <div data-parallax className="workshop-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="workshop-interactive relative z-20 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-[#8b7355]">Мебель и двери из массива</p>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
          Мастерская
          <br />
          X-STYLE
        </h1>
        <p className="mt-8 max-w-lg text-lg text-white/75">
          Пройдите путь от выбора породы дерева до готовой двери в вашем интерьере. В каталоге —
          актуальные модели межкомнатных дверей бренда.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-10 rounded-full bg-[#56675c] px-10 py-4 text-sm uppercase tracking-[0.14em] text-white transition hover:bg-[#6a7d6f]"
        >
          Начать — выбор дерева
        </button>
      </div>
    </section>
  );
}

function StationWood({
  selected,
  onSelect,
  onShowCatalog,
}: {
  selected: WoodId;
  onSelect: (id: WoodId) => void;
  onShowCatalog: (id: WoodId) => void;
}) {
  return (
    <StationShell id="wood" label="Шаг 1" title="Выберите породу дерева">
      <p className="mb-6 max-w-xl text-stone-600">
        Нажмите на образец — он подсветится. Затем откройте каталог моделей в выбранном массиве.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {WOOD_OPTIONS.map((w) => {
          const active = selected === w.id;
          const count = getWoodCount(w.id);
          return (
            <div key={w.id} className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onSelect(w.id)}
                className={`rounded-2xl border p-6 text-left transition ${
                  active
                    ? "border-[#56675c] bg-white shadow-lg ring-2 ring-[#56675c]/40"
                    : "border-stone-300/80 bg-white/60 hover:bg-white"
                }`}
              >
                <span
                  className="mb-3 inline-block h-2 w-12 rounded-full"
                  style={{ backgroundColor: w.tone }}
                />
                <span className="block font-serif text-2xl">{w.name}</span>
                <span className="mt-2 block text-sm text-stone-600">{w.feel}</span>
                <span className="mt-4 block text-xs text-stone-500">{count} моделей в каталоге</span>
                {active && (
                  <span className="mt-2 block text-[10px] font-semibold uppercase tracking-widest text-[#56675c]">
                    ✓ выбрано
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => onShowCatalog(w.id)}
                className="rounded-full border border-stone-800 py-2.5 text-xs uppercase tracking-wider text-stone-900 transition hover:bg-stone-900 hover:text-white"
              >
                Смотреть модели · {w.name}
              </button>
            </div>
          );
        })}
      </div>
    </StationShell>
  );
}

function StationForm() {
  return (
    <StationShell id="form" label="Шаг 2" title="Как рождается дверь" tone="dark">
      <p className="mb-8 max-w-2xl text-lg text-white/80">
        Анимация — метафора реального цикла в нашей мастерской: от замера до финиша. Так же
        изготавливается каждая модель из каталога X-STYLE.
      </p>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <svg viewBox="0 0 200 280" className="mx-auto h-56 w-40 text-[#8b7355] lg:h-64 lg:w-48" aria-hidden>
          <rect
            className="workshop-sketch"
            x="40"
            y="20"
            width="120"
            height="240"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle
            className="workshop-sketch workshop-sketch-delay"
            cx="100"
            cy="230"
            r="8"
            fill="none"
            stroke="currentColor"
          />
        </svg>
        <ol className="space-y-4">
          {FORM_STEPS.map((s) => (
            <li
              key={s.step}
              className="rounded-xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8b7355]">
                Этап {s.step}
              </span>
              <p className="mt-2 font-serif text-xl text-white">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </StationShell>
  );
}

function StationCharacter() {
  return (
    <StationShell id="character" label="Шаг 3" title="Люди мастерской">
      <blockquote className="border-l-2 border-[#56675c] pl-6 font-serif text-2xl leading-snug md:text-3xl">
        «Мы подбираем дверь под ваш дом: массив, оттенок, фурнитуру и свет в коридоре — не
        продаём “типовой SKU”.»
      </blockquote>
      <p className="mt-6 max-w-xl text-stone-600">
        Столяры X-STYLE контролируют влажность древесины, геометрию полотна и качество покрытия.
        Консультанты в салонах помогут с образцами и замером.
      </p>
      <Link
        href="/about"
        className="mt-8 inline-block rounded-full border border-stone-800 px-8 py-3 text-sm uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white"
      >
        О компании
      </Link>
    </StationShell>
  );
}

function StationCollection({
  wood,
  products,
  onWoodChange,
  onOpenProduct,
}: {
  wood: WoodId;
  products: CatalogProduct[];
  onWoodChange: (w: WoodId) => void;
  onOpenProduct: (p: CatalogProduct) => void;
}) {
  const woodName = WOOD_OPTIONS.find((w) => w.id === wood)?.name ?? "";

  return (
    <section
      data-station="collection"
      className="workshop-interactive relative flex h-full w-screen shrink-0 flex-col justify-center bg-[#eae3da] px-4 py-6 md:px-10"
    >
      <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#56675c]">Шаг 4</p>
          <h2 className="font-serif text-3xl text-[#2c2825] md:text-5xl">Каталог дверей</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {WOOD_OPTIONS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => onWoodChange(w.id)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                wood === w.id
                  ? "bg-[#56675c] text-white"
                  : "bg-white text-stone-700 ring-1 ring-stone-300 hover:ring-stone-500"
              }`}
            >
              {w.name} ({getWoodCount(w.id)})
            </button>
          ))}
        </div>
      </div>
      <p className="mb-4 text-sm text-stone-600">
        Массив: <strong>{woodName}</strong> · {products.length}{" "}
        {products.length === 1 ? "модель" : "моделей"}. Нажмите на карточку для описания и заявки.
      </p>
      {products.length === 0 ? (
        <p className="rounded-xl bg-white p-8 text-stone-600">
          Для этой породы модели временно не отображаются. Выберите другой массив или позвоните в
          салон.
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]">
          {products.map((p) => (
            <button
              key={p.uid}
              type="button"
              onClick={() => onOpenProduct(p)}
              className="w-[min(85vw,260px)] shrink-0 rounded-2xl bg-white p-3 text-left shadow-md ring-1 ring-stone-200/80 transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#56675c]"
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
              )}
              <p className="mt-3 font-serif text-lg">{p.title}</p>
              <p className="text-sm text-stone-500">{p.wood}</p>
              <span className="mt-3 inline-block text-xs uppercase tracking-wider text-[#56675c]">
                Подробнее →
              </span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

function StationHome() {
  const primary = stores[0];
  return (
    <StationShell id="home" label="Шаг 5" title="Салоны и заказ" tone="dark">
      <p className="max-w-xl text-lg text-white/75">{ourStoreIntro}</p>
      <div className="mt-8 grid max-h-[40vh] gap-4 overflow-y-auto sm:grid-cols-2">
        {storeLocations.map((s) => (
          <div key={s.id} className="rounded-xl border border-white/15 p-4">
            <p className="text-xs uppercase tracking-widest text-white/50">{s.name}</p>
            <p className="mt-1 text-sm text-white/80">{s.address.join(", ")}</p>
            <p className="mt-1 text-xs text-white/50">{s.hours}</p>
            <a
              href={`tel:${s.phones[0].replace(/\s|\(|\)|-/g, "")}`}
              className="mt-2 block text-white"
            >
              {s.phones[0]}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href={`tel:${primary.phone.replace(/\s|\(|\)|-/g, "")}`}
          className="rounded-full bg-[#f2ebe3] px-8 py-3 text-sm uppercase tracking-widest text-[#2c2825]"
        >
          Позвонить
        </a>
        <Link
          href="/our-store"
          className="rounded-full border border-white/40 px-8 py-3 text-sm uppercase tracking-widest text-white"
        >
          Все салоны
        </Link>
        <Link
          href="/doors"
          className="rounded-full border border-white/40 px-8 py-3 text-sm uppercase tracking-widest text-white"
        >
          Раздел «Двери»
        </Link>
      </div>
    </StationShell>
  );
}

function StationShell({
  id,
  label,
  title,
  children,
  tone = "light",
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      data-station={id}
      className={`relative flex h-full w-screen shrink-0 flex-col justify-center overflow-y-auto overflow-x-hidden px-6 py-8 md:px-14 ${
        dark ? "bg-[#1f1c19] text-[#f2ebe3]" : "bg-[#f2ebe3] text-[#2c2825]"
      }`}
    >
      <div
        data-parallax
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[#8b7355]/20 blur-3xl"
      />
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#56675c]">{label}</p>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">{title}</h2>
      <div className="relative z-10 mt-8 max-w-5xl workshop-interactive">{children}</div>
    </section>
  );
}
