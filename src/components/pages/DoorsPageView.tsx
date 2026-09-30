"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductModal } from "@/components/workshop/ProductModal";
import {
  WOOD_OPTIONS,
  getProductsByWood,
  getWoodCount,
  woodIdFromPageSlug,
  type CatalogProduct,
  type WoodId,
} from "@/lib/catalog";
import type { SitePage } from "@/lib/content";

type Props = {
  page: SitePage;
};

export function DoorsPageView({ page }: Props) {
  const initialWood = woodIdFromPageSlug(page.slug) ?? "dub";
  const [wood, setWood] = useState<WoodId>(initialWood);
  const [selected, setSelected] = useState<CatalogProduct | null>(null);

  const products = useMemo(() => {
    if (page.slug === "mezhkomnatnye-dveri-iz-massiva-so-steklom") {
      const seen = new Set<number>();
      return getProductsByWood("dub")
        .concat(getProductsByWood("olha"), getProductsByWood("sosna"))
        .filter((p) => {
          if (seen.has(p.uid)) return false;
          seen.add(p.uid);
          return (
            /стекл/i.test(p.title + p.description) ||
            p.characteristics.some((c) => /стекл/i.test(c.value + c.title))
          );
        });
    }
    return getProductsByWood(wood);
  }, [page.slug, wood]);

  const showWoodTabs = page.slug === "doors" || page.slug.startsWith("mezhkomnatnye-dveri-iz-massiva");

  return (
    <>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
      <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-600">X-STYLE</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
          {page.title}
        </h1>
        {page.description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700">{page.description}</p>
        )}

        {showWoodTabs && page.slug !== "mezhkomnatnye-dveri-iz-massiva-so-steklom" && (
          <div className="mt-10 flex flex-wrap gap-2">
            {WOOD_OPTIONS.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setWood(w.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  wood === w.id
                    ? "bg-[#56675c] text-white"
                    : "bg-white/80 text-stone-700 ring-1 ring-[#a89880]/30 hover:ring-[#56675c]"
                }`}
              >
                {w.name} ({getWoodCount(w.id)})
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-stone-600">
          {products.length}{" "}
          {products.length === 1 ? "модель" : "моделей"}. Нажмите на карточку — откроется описание и
          фото, как в каталоге на x-stl.ru.
        </p>

        {products.length === 0 ? (
          <p className="mt-8 rounded-xl bg-white/80 p-8 text-stone-600 ring-1 ring-[#a89880]/20">
            По этому фильтру модели не найдены. Позвоните в салон — подберём вариант.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <button
                key={p.uid}
                type="button"
                onClick={() => setSelected(p)}
                className="wood-surface-card rounded-2xl p-4 text-left ring-1 ring-[#a89880]/25 transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#56675c]"
              >
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[3/4] w-full rounded-xl object-cover"
                  />
                )}
                <h2 className="mt-4 font-serif text-xl text-stone-900">{p.title}</h2>
                <p className="mt-1 text-sm text-stone-600">{p.wood}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-wider text-[#56675c]">
                  Подробнее →
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/workshop"
            className="rounded-full bg-[#56675c] px-6 py-2 text-sm uppercase tracking-wider text-white"
          >
            Маршрут «Мастерская»
          </Link>
          <Link
            href="/our-store"
            className="rounded-full border border-stone-800 px-6 py-2 text-sm uppercase tracking-wider text-stone-800"
          >
            Контакты
          </Link>
        </div>
      </article>
    </>
  );
}
