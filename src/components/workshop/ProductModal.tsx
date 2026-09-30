"use client";

import { useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";

type Props = {
  product: CatalogProduct | null;
  onClose: () => void;
};

function ProductModalContent({
  product,
  onClose,
}: {
  product: CatalogProduct;
  onClose: () => void;
}) {
  const [hero, setHero] = useState<string | null>(null);
  const mainImg = hero ?? product.image;
  const gallery =
    product.gallery.length > 0
      ? product.gallery
      : product.image
        ? [{ img: product.image }]
        : [];

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/60 p-4 md:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#f2ebe3] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-300/80 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#56675c]">{product.wood}</p>
            <h2 id="product-title" className="font-serif text-2xl text-stone-900 md:text-3xl">
              {product.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-400 px-3 py-1 text-sm text-stone-700 hover:bg-white"
          >
            Закрыть
          </button>
        </div>
        <div className="grid gap-6 p-6 md:grid-cols-2">
          {mainImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mainImg}
              alt={product.title}
              className="aspect-[3/4] w-full rounded-xl object-cover"
            />
          )}
          <div>
            <p className="text-sm leading-relaxed text-stone-700">{product.description}</p>
            {product.characteristics.length > 0 && (
              <ul className="mt-6 space-y-2 text-sm">
                {product.characteristics.map((c) => (
                  <li
                    key={`${c.title}-${c.value}`}
                    className="flex justify-between gap-4 border-b border-stone-300/60 pb-2"
                  >
                    <span className="text-stone-500">{c.title}</span>
                    <span className="font-medium text-stone-900">{c.value}</span>
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
        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-stone-300/80 px-6 py-4">
            {gallery.map((g) => (
              <button
                key={g.img}
                type="button"
                onClick={() => setHero(g.img)}
                className={`shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                  mainImg === g.img ? "ring-[#56675c]" : "ring-transparent hover:ring-stone-400"
                }`}
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

export function ProductModal({ product, onClose }: Props) {
  if (!product) return null;
  return <ProductModalContent key={product.uid} product={product} onClose={onClose} />;
}
