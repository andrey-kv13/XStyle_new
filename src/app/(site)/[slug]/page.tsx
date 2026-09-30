import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageView } from "@/components/pages/AboutPageView";
import { DoorsPageView } from "@/components/pages/DoorsPageView";
import { ParquetPageView } from "@/components/pages/ParquetPageView";
import { OplataPageView } from "@/components/pages/OplataPageView";
import { OurStorePageView } from "@/components/pages/OurStorePageView";
import { ContentPageView } from "@/components/ContentPageView";
import { aboutContent, ourStoreIntro } from "@/lib/brand-content";
import { isDoorsCatalogSlug } from "@/lib/catalog";
import { getAllPages, getPageBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

const META: Record<string, { title: string; description?: string }> = {
  "our-store": { title: "Контакты", description: ourStoreIntro },
  oplata: {
    title: "Оплата и доставка",
    description: "Способы оплаты, доставка курьером и самовывоз из салонов X-STYLE.",
  },
  about: {
    title: "О компании X-STYLE",
    description: aboutContent.history[0],
  },
};

export async function generateStaticParams() {
  return getAllPages()
    .filter((p) => p.slug !== "home")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const branded = META[slug];
  if (branded) {
    return { title: branded.title, description: branded.description };
  }
  const page = getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title ?? "X-STYLE",
    description: page.description ?? undefined,
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "our-store") return <OurStorePageView />;
  if (slug === "oplata") return <OplataPageView />;
  if (slug === "about") return <AboutPageView />;
  if (slug === "parquet") return <ParquetPageView />;

  const page = getPageBySlug(slug);
  if (!page) notFound();
  if (isDoorsCatalogSlug(slug)) return <DoorsPageView page={page} />;
  return <ContentPageView page={page} />;
}
