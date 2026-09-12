"use client";

import { PROJECTS } from "@/constant";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function WorkListContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollReveal(containerRef);

  useGSAP(
    () => {
      const splitTitle = new SplitText("#work-title", {
        type: "lines, words",
        linesClass: "overflow-hidden",
        wordsClass: "work-title-word",
      });

      gsap.set(".work-kicker", { opacity: 0, x: -15 });
      gsap.set(".work-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(splitTitle.words, { yPercent: 120 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".work-kicker", { opacity: 1, x: 0, duration: 1 })
        .to(
          ".work-divider",
          { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
          "<0.1",
        )
        .to(
          splitTitle.words,
          { yPercent: 0, stagger: 0.05, duration: 1.2 },
          "<0.2",
        );

      return () => splitTitle.revert();
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-20 pb-20">
      <section className="flex flex-col gap-8 pt-6 md:pt-12">
        <div className="flex items-center gap-5 w-full">
          <span className="work-kicker text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Selected Work
          </span>
          <div className="work-divider h-[2px] flex-1 max-w-[100px] bg-secondary/30 dark:bg-secondary/50" />
        </div>
        <h1
          id="work-title"
          className="text-4xl sm:text-5xl md:text-6xl font-dm-sans font-medium tracking-tight leading-[1.05] max-w-3xl"
        >
          Products, platforms, and side projects across 6+ years.
        </h1>
        <p className="reveal-text text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed max-w-2xl">
          A selection of case studies across enterprise SaaS platforms,
          Electron desktop apps, design systems, and experiments — built with
          teams that care about how things work.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20">
        {PROJECTS.map((project, index) => (
          <Link
            key={project.key}
            href={`/work/${project.key}`}
            data-cursor-hover
            className="reveal-group group flex flex-col gap-4"
          >
            <div className="reveal-text relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#141414]">
              <Image
                src={`/projects/${project.key}/image.png`}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              {project.wip && (
                <span className="absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-secondary">
                  In progress
                </span>
              )}
            </div>
            <div className="reveal-text flex flex-col gap-1">
              <div className="flex items-center justify-between gap-3">
                <span className="font-dm-sans font-medium text-base md:text-lg text-foreground">
                  {String(index + 1).padStart(2, "0")} —{" "}
                  {project.title.split("—")[0].trim()}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-500 flex-shrink-0">
                  {project.category}
                </span>
              </div>
              <p className="text-sm text-gray-500">{project.year}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
