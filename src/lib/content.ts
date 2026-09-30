import siteContent from "@/data/site-content.json";
import { storeLocations } from "@/lib/brand-content";
import { filterGalleryPhotos } from "@/lib/media";
export type SitePage = {
  slug: string;
  url: string;
  title: string | null;
  description: string | null;
  headings: string[];
  photos: string[];
};

export type NavItem = { href: string; label: string };

const data = siteContent as {
  pages: SitePage[];
  nav: NavItem[];
  imageCount: number;
};

export function getNav(): NavItem[] {
  return data.nav;
}

export function getAllPages(): SitePage[] {
  return data.pages;
}

export function getPageBySlug(slug: string): SitePage | undefined {
  const page = data.pages.find((p) => p.slug === slug);
  if (!page) return undefined;
  return { ...page, photos: filterGalleryPhotos(page.photos) };
}
/** content/images/foo.jpg → /media/foo.jpg */
export function mediaUrl(relativePath: string): string {
  const name = relativePath.replace(/^content\/images\//, "");
  return `/media/${name}`;
}

export function getHomePage(): SitePage {
  const page = getPageBySlug("home") ?? data.pages[0];
  return { ...page, photos: filterGalleryPhotos(page.photos) };
}
export const categories = [
  {
    title: "Мебель",
    href: "/furniture",
    text: "Столы, стулья, кровати и системы хранения из массива дуба.",
  },
  {
    title: "Двери",
    href: "/doors",
    text: "Межкомнатные двери из дуба, ольхи и сосны — с чистой фактурой дерева.",
  },
  {
    title: "Паркет",
    href: "/parquet",
    text: "Паркетная доска с выразительным рисунком и долгим сроком службы.",
  },
] as const;

export const stores = storeLocations.map((s) => ({
  city: s.name.replace(/^Магазин в /, "").replace(/^Москва — /, "Москва · "),
  address: s.address.join(", "),
  phone: s.phones[0],
  email: s.emails[0],
  hours: s.hours,
}));
