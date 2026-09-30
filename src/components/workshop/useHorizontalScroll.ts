"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIN_ID = "workshop-pin";

export function useHorizontalScroll(
  rootRef: React.RefObject<HTMLElement | null>,
  trackRef: React.RefObject<HTMLElement | null>,
  onProgress?: (index: number) => void,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add("workshop-reduced");
      return;
    }

    const panels = gsap.utils.toArray<HTMLElement>("[data-station]", track);
    const panelCount = Math.max(panels.length, 1);

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        id: PIN_ID,
        trigger: root,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        pinSpacing: true,
        end: () => "+=" + Math.max(track.scrollWidth - window.innerWidth, 1),
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!onProgress || panelCount < 2) return;
          const idx = Math.round(self.progress * (panelCount - 1));
          onProgress(idx);
        },
      },
    });

    panels.forEach((panel) => {
      const layers = panel.querySelectorAll<HTMLElement>("[data-parallax]");
      layers.forEach((layer, i) => {
        gsap.to(layer, {
          x: () => -(track.scrollWidth - window.innerWidth) * (0.08 + i * 0.06),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => "+=" + Math.max(track.scrollWidth - window.innerWidth, 1),
            scrub: true,
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [rootRef, trackRef, onProgress]);
}

export function scrollToStation(index: number) {
  const track = document.querySelector(".workshop-track") as HTMLElement | null;
  const panels = document.querySelectorAll("[data-station]");
  if (!track || panels.length < 2) return;

  const max = panels.length - 1;
  const clamped = Math.max(0, Math.min(index, max));
  const progress = clamped / max;

  const st = ScrollTrigger.getById(PIN_ID);
  if (st) {
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  const maxX = track.scrollWidth - window.innerWidth;
  gsap.to(track, {
    x: -maxX * progress,
    duration: 0.55,
    ease: "power2.out",
    overwrite: "auto",
  });
}
