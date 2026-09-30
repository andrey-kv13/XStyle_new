import Link from "next/link";
import { paymentDeliveryContent as c } from "@/lib/brand-content";

export function OplataPageView() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-stone-600">X-STYLE</p>
      <h1 className="mt-4 font-serif text-4xl text-stone-900 md:text-5xl">{c.title}</h1>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-stone-900">{c.payment.title}</h2>
        <p className="mt-4 text-stone-700">{c.payment.intro}</p>
        <ul className="mt-6 space-y-4">
          {c.payment.onlineMethods.map((m) => (
            <li key={m.title} className="wood-surface-card rounded-xl p-5 ring-1 ring-[#a89880]/20">
              <p className="font-medium text-stone-900">{m.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-stone-600">{m.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-stone-600">{c.payment.security}</p>

        <div className="mt-10 wood-surface-card rounded-2xl p-6 ring-1 ring-[#a89880]/20">
          <h3 className="font-serif text-xl text-stone-900">{c.payment.onDelivery.title}</h3>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
            {c.payment.onDelivery.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 border-t border-[#c4b5a0]/40 pt-12">
        <h2 className="font-serif text-2xl text-stone-900">{c.delivery.title}</h2>
        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-lg font-medium text-stone-900">{c.delivery.courier.title}</h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-700">
              {c.delivery.courier.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="wood-surface-card rounded-2xl p-6 ring-1 ring-[#a89880]/20">
            <h3 className="text-lg font-medium text-stone-900">{c.delivery.pickup.title}</h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-stone-700">
              {c.delivery.pickup.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12">
        <Link
          href="/our-store"
          className="rounded-full bg-[#56675c] px-6 py-2 text-sm uppercase tracking-wider text-white"
        >
          Адреса салонов
        </Link>
      </div>
    </article>
  );
}
