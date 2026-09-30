import Link from "next/link";
import { ourStoreIntro, storeLocations } from "@/lib/brand-content";

function telHref(phone: string) {
  return `tel:${phone.replace(/\s|\(|\)|-/g, "")}`;
}

export function OurStorePageView() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-600">Контакты</p>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
        Салоны X-STYLE
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700">{ourStoreIntro}</p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {storeLocations.map((store) => (
          <li
            key={store.id}
            className="wood-surface-card rounded-2xl p-8 ring-1 ring-[#a89880]/25"
          >
            <h2 className="font-serif text-xl text-stone-900">{store.name}</h2>
            <div className="mt-4 space-y-1 text-sm leading-relaxed text-stone-700">
              {store.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              {store.phones.map((phone) => (
                <a
                  key={phone}
                  href={telHref(phone)}
                  className="block text-base font-medium text-[#3d4f42] hover:underline"
                >
                  {phone}
                </a>
              ))}
              {store.emails.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="block text-sm text-stone-600 hover:underline"
                >
                  {email}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-stone-600">
              <span className="font-medium text-stone-800">Часы работы:</span> {store.hours}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Link
          href="/oplata"
          className="rounded-full border border-stone-800 px-6 py-2 text-sm uppercase tracking-wider text-stone-800 hover:bg-stone-900 hover:text-white"
        >
          Оплата и доставка
        </Link>
      </div>
    </article>
  );
}
