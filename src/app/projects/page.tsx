"use client";

import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Projects = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let splitTextHeader: SplitText | null = null;
    let splitTextDescription: SplitText | null = null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      splitTextHeader = new SplitText(".project-page-title", {
        type: "lines, words",
        linesClass: "overflow-hidden",
        wordsClass: "project-title-word",
      });

      splitTextDescription = new SplitText(".projects-page-description", {
        type: "lines",
        linesClass: "overflow-hidden",
        wordsClass: "project-desc-line",
      });

      // Initial states to prevent flicker
      gsap.set(".projects-kicker", { opacity: 0, x: -15 });
      gsap.set(".projects-divider", {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(splitTextHeader.words, { yPercent: 120 });
      gsap.set(splitTextDescription.lines, { yPercent: 120, opacity: 0 });
      gsap.set(".scroll-prompt-text", { opacity: 0, y: 15 });
      gsap.set(".projects-arrow-icon", { scale: 0, opacity: 0 });

      tl.to(".projects-kicker", {
        opacity: 1,
        x: 0,
        duration: 1,
      })
        .to(
          ".projects-divider",
          { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
          "<0.1",
        )
        .to(
          splitTextHeader.words,
          {
            yPercent: 0,
            stagger: 0.05,
            duration: 1.2,
          },
          "<0.2",
        )
        .to(
          splitTextDescription.lines,
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.2,
          },
          "<0.3",
        )
        .to(
          ".scroll-prompt-text",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "<0.5",
        )
        .to(
          ".projects-arrow-icon",
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(2)",
          },
          "<0.1",
        );

      // Subtle bounce for arrow
      gsap.to(".projects-arrow-icon svg", {
        y: 4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 2,
      });
    }, pageRef);

    return () => {
      splitTextHeader?.revert();
      splitTextDescription?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef}>
      <section className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 md:mb-32 pt-6 md:pt-12">
        <div className="flex-1 flex flex-col items-start justify-start gap-6 md:gap-8">
          <div className="flex items-center gap-6 w-full">
            <span className="projects-kicker text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Featured Works
            </span>
            <div className="projects-divider h-0.5 flex-1 max-w-25 bg-secondary/30 dark:bg-secondary/50" />
          </div>
          <h1 className="project-page-title text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-dm-sans font-medium tracking-tight leading-[1.05]">
            Architecting <br className="hidden sm:block" /> Scalable Solutions.
          </h1>
        </div>

        <div className="flex-1 flex flex-col justify-end gap-10 lg:pb-2">
          <p className="projects-page-description text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed max-w-xl">
            Real-world enterprise solutions without the marketing speak. From
            writing offline-first Electron desktops for ops teams to scaling
            high-performance micro-frontends—this is how I turn abstract
            business logic into stable, scalable software.
          </p>

          <div className="flex items-center gap-5 text-sm font-dm-sans font-semibold uppercase tracking-widest group w-fit cursor-default">
            <span className="scroll-prompt-text text-foreground">
              Explore Output
            </span>
            <div className="projects-arrow-icon w-11 h-11 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center bg-transparent group-hover:bg-foreground group-hover:text-background transition-all duration-300">
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 1V13.5M7 13.5L13 7.5M7 13.5L1 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.key} index={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;
