import Image from "next/image";
import Link from "next/link";
import {
  categories,
  getHomePage,
  mediaUrl,
  stores,
} from "@/lib/content";
import { pickHeroPhoto } from "@/lib/media";
export default function HomePage() {
  const home = getHomePage();
  const heroPhoto = pickHeroPhoto(home.photos);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#c4b5a0]/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#3d4f42]">X-STYLE</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-stone-900 md:text-6xl">
              Мебель, паркет и двери из массива
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600">
              {home.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/workshop"
                className="rounded-full bg-[#56675c] px-8 py-3 text-sm uppercase tracking-[0.12em] text-white transition hover:bg-[#3d4f42]"
              >
                Мастерская — интерактив
              </Link>
              <Link
                href="/doors"
                className="rounded-full bg-stone-900 px-8 py-3 text-sm uppercase tracking-[0.12em] text-[#f7f4ef] transition hover:bg-stone-800"
              >
                Каталог дверей
              </Link>
              <Link
                href="/our-store"
                className="rounded-full border border-stone-800 px-8 py-3 text-sm uppercase tracking-[0.12em] text-stone-900 transition hover:bg-[#faf6f0]/90"
              >
                Салоны
              </Link>
            </div>
          </div>
          {heroPhoto && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-stone-300/50">
              <Image
                src={mediaUrl(heroPhoto)}
                alt="Интерьер X-Style"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-serif text-3xl text-stone-900 md:text-4xl">Направления</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group wood-surface-card rounded-2xl p-8 ring-1 ring-[#a89880]/20 transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="font-serif text-2xl text-stone-900 group-hover:text-[#3d4f42]">
                {cat.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-600">{cat.text}</p>
              <span className="mt-6 inline-block text-xs uppercase tracking-[0.16em] text-stone-800">
                Смотреть →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-stone-900 text-stone-200">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif text-3xl text-white md:text-4xl">Салоны</h2>
          <p className="mt-3 max-w-xl text-stone-400">
            Пятигорск, Краснодар, Москва. Уточняйте наличие образцов по телефону.
          </p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {stores.map((store) => (
              <li
                key={`${store.city}-${store.phone}`}
                className="rounded-xl border border-stone-700/80 bg-stone-800/40 p-6"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{store.city}</p>
                <p className="mt-2 text-sm text-stone-200">{store.address}</p>
                <p className="mt-2 text-xs text-stone-500">{store.hours}</p>
                <a
                  href={`tel:${store.phone.replace(/\s|\(|\)|-/g, "")}`}
                  className="mt-4 block font-medium text-white"
                >
                  {store.phone}
                </a>
                <a href={`mailto:${store.email}`} className="mt-1 block text-sm text-stone-400">
                  {store.email}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
