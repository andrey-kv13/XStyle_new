import catalog from "@/data/parquet-catalog.json";

export type ParquetProduct = {
  uid: number;
  title: string;
  subtitle: string | null;
  price: number | null;
  description: string;
  image: string | null;
  gallery: { img: string }[];
  characteristics: { title: string; value: string }[];
};

const data = catalog as { products: ParquetProduct[] };

export function getParquetProducts(): ParquetProduct[] {
  return data.products;
}

export const parquetIntro = {
  title: "Паркетная доска",
  description:
    "Паркетная доска из массива дуба для стильных интерьеров. Разнообразие оттенков, текстур и форматов — для квартиры, дома или коммерческого пространства.",
};
