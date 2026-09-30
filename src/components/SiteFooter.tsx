import Link from "next/link";

export function SiteFooter({ woodTheme = false }: { woodTheme?: boolean }) {
  return (
    <footer
      className={
        woodTheme
          ? "border-t border-[#a89880]/40 bg-[#3d3832] text-stone-300"
          : "border-t border-stone-300 bg-stone-900 text-stone-300"
      }
    >      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-xl tracking-[0.16em] text-stone-100">X-STYLE</p>
          <p className="mt-2 max-w-md text-sm text-stone-400">
            Мебель, паркет и межкомнатные двери из массива. Салоны в Пятигорске, Краснодаре и
            Москве.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/about" className="hover:text-white">
            О бренде
          </Link>
          <Link href="/oplata" className="hover:text-white">
            Оплата
          </Link>
          <Link href="/our-store" className="hover:text-white">
            Контакты
          </Link>
        </div>
      </div>
    </footer>
  );
}
