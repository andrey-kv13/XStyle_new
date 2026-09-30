"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const WOOD_PATHS = new Set([
  "/",
  "/furniture",
  "/doors",
  "/parquet",
  "/our-store",
  "/about",
  "/oplata",
]);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const woodTheme = WOOD_PATHS.has(pathname);

  return (
    <div
      className={
        woodTheme ? "wood-page-theme min-h-full" : "min-h-full bg-[#f7f4ef]"
      }
    >
      <SiteHeader woodTheme={woodTheme} />
      <main className="flex-1">{children}</main>
      <SiteFooter woodTheme={woodTheme} />
    </div>
  );
}
