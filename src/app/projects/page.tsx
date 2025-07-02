"use client";

import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Projects = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    const splitTextHeader = new SplitText(".project-page-title", {
      type: "words",
    });

    const splitTextDescription = new SplitText(".projects-page-description", {
      type: "words",
    });

    tl.from(splitTextHeader.words, {
      duration: 0.3,
      y: 20,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    tl.from(".projects-arrow-icon", {
      duration: 0.3,
      y: -40,
      opacity: 0,
      ease: "power2.inOut",
    });

    tl.from(splitTextDescription.words, {
      duration: 0.2,
      opacity: 0.2,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    return () => {
      splitTextDescription.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 md:mb-24">
        <div className="flex flex-row md:flex-col items-center md:items-start justify-center text-heading-1 mb-5 md:mb-8 gap-5 md:gap-10">
          <h1 className="project-page-title heading-1">
            Recent Work and Projects
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
            From concept to execution—here’s a look at what I’ve been building
            lately. Each project reflects my focus on clean design, performance,
            and user experience.
          </p>
        </div>
      </section>

      {PROJECTS.map((project, index) => (
        <ProjectCard key={project.key} index={index} project={project} />
      ))}
    </>
  );
};

export default Projects;
