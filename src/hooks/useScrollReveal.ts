"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades/slides in any ".reveal-text" nodes grouped under a ".reveal-group"
 * ancestor as they scroll into view. Shared across Home/About/Work pages.
 */
export function useScrollReveal(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const groups = gsap.utils.toArray<HTMLElement>(".reveal-group");

      groups.forEach((group) => {
        gsap.fromTo(
          group.querySelectorAll(".reveal-text"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".architectural-line").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: { trigger: line, start: "top 90%" },
          },
        );
      });
    },
    { scope: scopeRef },
  );
}
