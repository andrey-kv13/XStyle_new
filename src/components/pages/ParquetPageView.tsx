"use client";

import Link from "next/link";
import { useState } from "react";
import { getParquetProducts, parquetIntro, type ParquetProduct } from "@/lib/parquet";

function formatParquetDescription(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  const parts = normalized.split(/(?=[А-ЯA-Z][а-яa-z]+(?: [а-яa-z]+)*:)/);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function ParquetModalContent({
  product,
  onClose,
}: {
  product: ParquetProduct;
  onClose: () => void;
}) {
  const [hero, setHero] = useState<string | null>(null);
  const mainImg = hero ?? product.image;
  const bullets = formatParquetDescription(product.description);

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/60 p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#f2ebe3] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-300/80 px-6 py-4">
          <div>
            {product.subtitle && (
              <p className="text-xs uppercase tracking-widest text-[#56675c]">{product.subtitle}</p>
            )}
            <h2 className="font-serif text-2xl text-stone-900 md:text-3xl">{product.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-400 px-3 py-1 text-sm"
          >
            Закрыть
          </button>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          {mainImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mainImg} alt={product.title} className="aspect-square w-full rounded-xl object-cover" />
          )}
          <div>
            <ul className="space-y-2 text-sm leading-relaxed text-stone-700">
              {bullets.map((line) => (
                <li key={line.slice(0, 40)}>{line}</li>
              ))}
            </ul>
            {product.characteristics.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm">
                {product.characteristics.map((c) => (
                  <li key={`${c.title}-${c.value}`} className="flex justify-between gap-4 border-b border-stone-300/60 pb-2">
                    <span className="text-stone-500">{c.title}</span>
                    <span className="font-medium">{c.value}</span>
                  </li>
                ))}
              </ul>
            )}
            <a
              href="tel:+79624224111"
              className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm uppercase tracking-wider text-white"
            >
              Уточнить наличие
            </a>
          </div>
        </div>
        {product.gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-stone-300/80 px-6 py-4">
            {product.gallery.map((g) => (
              <button
                key={g.img}
                type="button"
                onClick={() => setHero(g.img)}
                className="shrink-0 rounded-lg ring-2 ring-transparent focus:ring-[#56675c]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.img} alt="" className="h-20 w-20 object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ParquetModal({
  product,
  onClose,
}: {
  product: ParquetProduct | null;
  onClose: () => void;
}) {
  if (!product) return null;
  return <ParquetModalContent key={product.uid} product={product} onClose={onClose} />;
}

export function ParquetPageView() {
  const products = getParquetProducts();
  const [selected, setSelected] = useState<ParquetProduct | null>(null);

  return (
    <>
      <ParquetModal product={selected} onClose={() => setSelected(null)} />
      <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-600">X-STYLE</p>
        <h1 className="mt-4 font-serif text-4xl text-stone-900 md:text-5xl">{parquetIntro.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700">{parquetIntro.description}</p>
        <p className="mt-4 text-sm text-stone-600">
          Нажмите на карточку — откроется описание, как на сайте x-stl.ru.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  className="aspect-square w-full rounded-xl object-cover"
                />
              )}
              <h2 className="mt-4 font-serif text-xl text-stone-900">{p.title}</h2>
              {p.subtitle && <p className="mt-1 text-sm text-stone-600">{p.subtitle}</p>}
              <span className="mt-4 inline-block text-xs uppercase tracking-wider text-[#56675c]">
                Подробнее →
              </span>
            </button>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/our-store"
            className="rounded-full bg-[#56675c] px-6 py-2 text-sm uppercase tracking-wider text-white"
          >
            Салоны
          </Link>
        </div>
      </article>
    </>
  );
}
