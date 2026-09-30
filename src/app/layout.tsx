import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "X-STYLE — мебель, паркет и двери из массива",
    template: "%s | X-STYLE",
  },
  description: "Мебель, паркет и межкомнатные двери из массива дуба, ольхи и сосны.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${serif.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-[#f7f4ef] font-sans text-stone-900 antialiased">{children}</body>
    </html>
  );
}
