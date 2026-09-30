import type { Metadata } from "next";
import { WorkshopJourney } from "@/components/workshop/WorkshopJourney";
import "./workshop.css";

export const metadata: Metadata = {
  title: "Мастерская X-STYLE — двери и мебель из массива",
  description:
    "Интерактивный маршрут: выбор дерева, этапы изготовления, каталог межкомнатных дверей, адреса салонов.",
};

export default function WorkshopPage() {
  return (
    <div className="relative min-h-screen bg-[#1a1816]">
      <WorkshopJourney />
    </div>
  );
}
