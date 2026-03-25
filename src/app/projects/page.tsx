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
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      splitTextHeader = new SplitText(".project-page-title", {
        type: "lines, words",
        linesClass: "project-title-line",
        wordsClass: "words",
        onSplit: (self) => {
          gsap.set(self.lines, { overflow: "hidden" });
          gsap.set(self.words, {
            yPercent: 115,
            rotate: 4,
            opacity: 0,
            transformOrigin: "left bottom",
          });
        },
      });

      splitTextDescription = new SplitText(".projects-page-description", {
        type: "lines",
        linesClass: "project-description-line",
        onSplit: (self) => {
          gsap.set(self.lines, { overflow: "hidden" });
          gsap.set(self.lines, {
            yPercent: 100,
            opacity: 0,
          });
        },
      });

      tl.from(".projects-kicker", {
        y: 18,
        opacity: 0,
        duration: 0.45,
      })
        .from(
          ".projects-divider",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
          },
          "<0.1",
        )
        .to(
          splitTextHeader.words,
          {
            duration: 0.9,
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.04,
            ease: "power4.out",
          },
          "<0.1",
        )
        .from(
          ".projects-arrow-icon",
          {
            duration: 0.7,
            y: -28,
            x: -10,
            rotate: -18,
            opacity: 0,
          },
          "<0.2",
        )
        .to(
          splitTextDescription.lines,
          {
            duration: 0.7,
            yPercent: 0,
            opacity: 1,
            stagger: 0.1,
          },
          "<0.1",
        );

      gsap.to(".projects-arrow-icon", {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: tl.duration() - 0.2,
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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 md:mb-24">
        <div className="flex flex-row md:flex-col items-center md:items-start justify-center text-heading-1 mb-5 md:mb-8 gap-5 md:gap-10">
          <div className="flex flex-col gap-4 md:gap-6">
            <span className="projects-kicker text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-500">
              Project archive
            </span>
            <div className="projects-divider h-px w-28 bg-gray-300 dark:bg-gray-700" />
          </div>
          <h1 className="project-page-title heading-1">
            Selected Work <br className="hidden md:block" />& Case Studies
          </h1>
          <div className="flex justify-start">
            <svg
              width={34}
              height={39}
              viewBox="0 0 34 39"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="projects-arrow-icon"
            >
              <path
                d="M19.2187 0.181824H14.4176V29.2102L3.31959 18.1122L0.0326538 21.4361L16.8182 38.2216L33.6406 21.4361L30.2798 18.1122L19.2187 29.2102V0.181824Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="heading-2 text-gray projects-page-description">
            A look at how I solve complex engineering problems. From
            architecting scalable micro-frontends to building high-performance
            Electron apps, these case studies highlight my focus on stability,
            architecture, and business impact.
          </p>
        </div>
      </section>

      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.key} index={index} project={project} />
      ))}
    </div>
  );
};

export default Projects;
