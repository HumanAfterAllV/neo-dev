// app/GsapRouteAirbag.tsx
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function GsapRouteAirbag() {
  const pathname = usePathname();
  const prev = useRef(pathname);

  useEffect(() => {
    if (prev.current !== pathname) {
      // Mata todos los ScrollTriggers residuales
      ScrollTrigger.getAll().forEach((t) => t.kill());
      // (Opcional) limpia timelines globales colgados
      gsap.globalTimeline.clear();
      prev.current = pathname;
      // Refresca por si hay nuevos pins en la nueva página
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [pathname]);

  return null;
}
