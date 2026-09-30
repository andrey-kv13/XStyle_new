import Image from "next/image";
import Link from "next/link";
import type { SitePage } from "@/lib/content";
import { mediaUrl } from "@/lib/content";

type Props = {
  page: SitePage;
  showGallery?: boolean;
};

function splitContent(page: SitePage) {
  const shortHeadings = page.headings.filter(
    (h) => h.length <= 100 && h !== page.title && !h.startsWith("http"),
  );
  const bodyParagraphs = page.headings.filter((h) => h.length > 100);
  return { shortHeadings, bodyParagraphs };
}

export function ContentPageView({ page, showGallery = true }: Props) {
  const lead = page.headings.find((h) => h.length <= 120 && h !== page.title);
  const { shortHeadings, bodyParagraphs } = splitContent(page);

  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-600">X-STYLE</p>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
        {page.title}
      </h1>
      {page.description && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700">{page.description}</p>
      )}
      {lead && lead !== page.title && lead !== page.description && (
        <p className="mt-8 border-l-2 border-[#56675c] pl-5 text-base text-stone-700">{lead}</p>
      )}

      {bodyParagraphs.length > 0 && (
        <div className="mt-10 max-w-3xl space-y-4 text-stone-700 leading-relaxed">
          {bodyParagraphs.map((p) => (
            <p key={p.slice(0, 60)}>{p}</p>
          ))}
        </div>
      )}

      {shortHeadings.length > 0 && (
        <ul className="mt-10 grid gap-3 text-sm text-stone-700 md:grid-cols-2">
          {shortHeadings.slice(0, 12).map((h) => (
            <li key={h} className="wood-surface-card rounded-lg px-4 py-3 ring-1 ring-[#a89880]/20">
              {h}
            </li>
          ))}
        </ul>
      )}

      {showGallery && page.photos.length > 0 && (
        <section className="mt-16">
          <h2 className="font-serif text-2xl text-stone-900">Фотографии</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.photos.map((photo) => (
              <div
                key={photo}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200/80"
              >
                <Image
                  src={mediaUrl(photo)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-full border border-stone-800 px-6 py-2 text-sm uppercase tracking-wider text-stone-800 hover:bg-stone-900 hover:text-white"
        >
          На главную
        </Link>
        {(page.slug === "doors" || page.slug.startsWith("mezhkomnatnye")) && (
          <Link
            href="/workshop"
            className="rounded-full bg-[#56675c] px-6 py-2 text-sm uppercase tracking-wider text-white"
          >
            Каталог в «Мастерской»
          </Link>
        )}
        <Link
          href="/our-store"
          className="rounded-full border border-stone-800 px-6 py-2 text-sm uppercase tracking-wider text-stone-800"
        >
          Контакты
        </Link>
      </div>
    </article>
  );
}
