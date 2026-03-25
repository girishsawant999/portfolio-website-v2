"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import FullscreenVideo from "./FullscreenVideo";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  index: number;
  project: {
    key: string;
    title: string;
    description: string;
    skills?: string[] | string;
    link: string;
    wip?: boolean;
    color?: string; // Optional: background color for variety
  };
}

const ProjectCard = ({ index, project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Fade & slide up entrance, simplified for maximum readability
      gsap.fromTo(
        cardRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex items-center justify-center pb-12 md:pb-24">
      <article
        ref={cardRef}
        className="w-full h-auto bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl dark:shadow-none flex flex-col relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
          {/* Text Content */}
          <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-white dark:bg-[#111111] z-10 w-full h-full">
            <div className="flex-1">
              <span className="text-sm font-bold font-dm-sans tracking-widest uppercase text-gray-400 mb-3 block">
                {String(index + 1).padStart(2, "0")} / {project.title}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-heading-1 leading-tight mb-4">
                {project.title}
              </h2>
              <p className="text-sm lg:text-base text-body mb-6 leading-relaxed line-clamp-4">
                {project.description}
              </p>

              {project.skills && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {Array.isArray(project.skills) ? (
                    project.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-gray-100 dark:bg-[#1a1a1a] text-[10px] sm:text-xs font-medium text-heading-2 rounded-full border border-gray-200/60 dark:border-gray-800/60"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-[#1a1a1a] text-[10px] sm:text-xs font-medium text-heading-2 rounded-full border border-gray-200/60 dark:border-gray-800/60">
                      {project.skills}
                    </span>
                  )}
                </div>
              )}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm font-medium text-heading-1 w-fit mt-auto pt-2"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
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
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                  {project.link.replace(/https?:\/\//, "")}
                </span>
                <span className="block absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-gray-500">
                  Visit project
                </span>
              </span>
            </a>
          </div>

          {/* Video / Image Display */}
          <div className="lg:col-span-7 relative bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-6 lg:p-8 lg:border-l border-gray-200 dark:border-gray-800">
            {project.wip && (
              <div className="project-card-ribbon absolute right-0 top-0 h-16 w-16 sm:h-20 sm:w-20 z-20 overflow-hidden\">
                <div className="absolute transform rotate-45 bg-yellow-400 text-black text-[10px] font-bold tracking-widest py-1 -right-7 top-5 w-[130px] text-center shadow-lg\">
                  WIP
                </div>
              </div>
            )}
            <div className="w-full relative rounded-lg overflow-hidden shadow-xl border border-gray-200/80 dark:border-gray-800/80 aspect-video flex items-center bg-black">
              <FullscreenVideo projectKey={project.key} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProjectCard;
