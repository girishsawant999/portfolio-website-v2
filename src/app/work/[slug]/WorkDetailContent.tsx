"use client";

import FullscreenVideo from "@/components/FullscreenVideo";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Project } from "@/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function WorkDetailContent({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const skills = Array.isArray(project.skills)
    ? project.skills
    : project.skills
      ? [project.skills]
      : [];

  useScrollReveal(containerRef);

  useGSAP(
    () => {
      const splitTitle = new SplitText("#work-detail-title", {
        type: "lines, words",
        linesClass: "overflow-hidden",
        wordsClass: "work-detail-title-word",
      });

      gsap.set(".work-detail-kicker", { opacity: 0, x: -15 });
      gsap.set(splitTitle.words, { yPercent: 120 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".work-detail-kicker", { opacity: 1, x: 0, duration: 1 })
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
    <div ref={containerRef} className="flex flex-col gap-16 md:gap-24 pb-20">
      <section className="flex flex-col gap-6 pt-6 md:pt-12">
        <Link
          href="/work"
          data-cursor-hover
          className="reveal-text navigation w-fit hover:text-foreground transition-colors text-sm text-gray-500"
        >
          ← All work
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <span className="work-detail-kicker text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            {project.category}
          </span>
          <span className="work-detail-kicker text-xs sm:text-sm text-gray-500">
            {project.year}
          </span>
        </div>

        <h1
          id="work-detail-title"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-dm-sans font-medium tracking-tight leading-[1.05] max-w-4xl"
        >
          {project.title}
        </h1>
      </section>

      {/* Cover media */}
      <section className="reveal-group">
        <div className="reveal-text rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#141414]">
          <FullscreenVideo projectKey={project.key} />
        </div>
      </section>

      {/* Overview */}
      <section className="reveal-group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        <div className="md:col-span-8 flex flex-col gap-6">
          <h2 className="reveal-text text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
            Overview
          </h2>
          <p className="reveal-text text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col gap-8">
          <div className="reveal-text flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Role
            </span>
            <span className="text-base text-foreground font-dm-sans">
              {project.role}
            </span>
          </div>

          {skills.length > 0 && (
            <div className="reveal-text flex flex-col gap-3">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 bg-gray-100 dark:bg-[#1a1a1a] text-xs font-medium rounded-full border border-gray-200/60 dark:border-gray-800/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="reveal-text group flex items-center gap-3 text-sm font-medium text-foreground w-fit"
          >
            <div className="h-9 w-9 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
              </svg>
            </div>
            <span>Visit project</span>
          </Link>
        </div>
      </section>

      {/* Next project */}
      <section className="architectural-line-wrapper">
        <hr className="architectural-line border-gray-200 dark:border-gray-800 border-t-[2px] origin-left" />
        <Link
          href={`/work/${next.key}`}
          data-cursor-hover
          className="reveal-group group flex items-center justify-between gap-6 pt-10"
        >
          <div className="flex flex-col gap-2">
            <span className="reveal-text text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Next project
            </span>
            <span className="reveal-text text-2xl md:text-3xl font-dm-sans font-medium tracking-tight text-foreground">
              {next.title.split("—")[0].trim()}
            </span>
          </div>
          <span className="reveal-text inline-flex items-center justify-center h-12 w-12 rounded-full border border-gray-300 dark:border-gray-700 transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </section>
    </div>
  );
}
