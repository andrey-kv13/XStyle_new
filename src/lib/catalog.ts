import catalog from "@/data/doors-catalog.json";

export type CatalogProduct = {
  uid: number;
  title: string;
  model: string;
  wood: string;
  woodId: string;
  price: number | null;
  description: string;
  image: string | null;
  gallery: { img: string }[];
  characteristics: { title: string; value: string }[];
};

export type WoodId = "dub" | "olha" | "sosna";

export const WOOD_OPTIONS: {
  id: WoodId;
  name: string;
  feel: string;
  tone: string;
}[] = [
  {
    id: "dub",
    name: "Дуб",
    feel: "Плотный, тёплый, с глубоким рисунком. Хорошая звукоизоляция.",
    tone: "#8b7355",
  },
  {
    id: "olha",
    name: "Ольха",
    feel: "Ровный светлый тон, мягкая фактура, спокойный современный интерьер.",
    tone: "#c4a574",
  },
  {
    id: "sosna",
    name: "Сосна",
    feel: "Светлая, с живым узором и ароматом смолы, уютная атмосфера.",
    tone: "#d4a853",
  },
];

const data = catalog as {
  products: CatalogProduct[];
  byWood: Record<string, CatalogProduct[]>;
  counts: Record<string, number>;
};

export function getProductsByWood(woodId: WoodId): CatalogProduct[] {
  return (data.byWood[woodId] ?? []) as CatalogProduct[];
}

export function getWoodCount(woodId: WoodId): number {
  return data.counts[woodId] ?? 0;
}

const SLUG_TO_WOOD: Record<string, WoodId> = {
  "mezhkomnatnye-dveri-iz-massiva-duba": "dub",
  "mezhkomnatnye-dveri-iz-massiva-olhi": "olha",
  "mezhkomnatnye-dveri-iz-massiva-sosny": "sosna",
};

export function woodIdFromPageSlug(slug: string): WoodId | null {
  if (slug === "doors") return "dub";
  return SLUG_TO_WOOD[slug] ?? null;
}

export function isDoorsCatalogSlug(slug: string): boolean {
  return slug === "doors" || slug.startsWith("mezhkomnatnye-dveri");
}

export function getProductByUid(uid: number): CatalogProduct | undefined {
  return data.products.find((p) => p.uid === uid);
}

export const STATIONS = [
  { id: "intro", label: "Начало", short: "01" },
  { id: "wood", label: "Дерево", short: "02" },
  { id: "form", label: "Изготовление", short: "03" },
  { id: "character", label: "Мастера", short: "04" },
  { id: "collection", label: "Каталог", short: "05" },
  { id: "home", label: "Салоны", short: "06" },
] as const;
