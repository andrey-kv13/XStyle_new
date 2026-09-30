import Link from "next/link";
import { aboutContent as c } from "@/lib/brand-content";

export function AboutPageView() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-600">О компании</p>
      <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-stone-900 md:text-5xl">
        {c.heroTitle}
      </h1>

      <div className="mt-10 flex flex-wrap gap-8">
        {c.stats.map((s) => (
          <div key={s.label} className="wood-surface-card rounded-2xl px-8 py-6 ring-1 ring-[#a89880]/20">
            <p className="font-serif text-3xl text-[#56675c]">{s.value}</p>
            <p className="mt-2 max-w-[12rem] text-sm text-stone-600">{s.label}</p>
          </div>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-stone-900">История бренда X-Style</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-stone-700 leading-relaxed">
          {c.history.map((p) => (
            <p key={p.slice(0, 50)}>{p}</p>
          ))}
        </div>
      </section>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {c.benefits.map((b) => (
          <li
            key={b}
            className="wood-surface-card rounded-lg px-4 py-3 text-sm text-stone-800 ring-1 ring-[#a89880]/20"
          >
            {b}
          </li>
        ))}
      </ul>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-stone-900">Наша философия</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-stone-700 leading-relaxed">
          {c.philosophy.map((p) => (
            <p key={p.slice(0, 50)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-stone-900">Материалы</h2>
        <p className="mt-4 max-w-3xl text-stone-700 leading-relaxed">{c.materialsIntro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {c.materials.map((m) => (
            <span
              key={m}
              className="rounded-full border border-[#a89880]/40 bg-[#faf6f0]/80 px-4 py-2 text-xs uppercase tracking-wider text-stone-800"
            >
              {m}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl text-stone-900">Наша команда</h2>
        <p className="mt-4 max-w-3xl text-stone-700 leading-relaxed">{c.team.intro}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {c.team.members.map((m) => (
            <li
              key={m.name}
              className="wood-surface-card overflow-hidden rounded-xl ring-1 ring-[#a89880]/20"
            >
              {"photo" in m && m.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.photo}
                  alt={m.name}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              ) : null}
              <div className="p-6">
                <p className="font-serif text-xl text-stone-900">{m.name}</p>
                <p className="mt-1 text-sm text-stone-600">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/our-store"
          className="rounded-full bg-[#56675c] px-6 py-2 text-sm uppercase tracking-wider text-white"
        >
          Контакты
        </Link>
        <Link
          href="/workshop"
          className="rounded-full border border-stone-800 px-6 py-2 text-sm uppercase tracking-wider text-stone-800"
        >
          Мастерская
        </Link>
      </div>
    </article>
  );
}
