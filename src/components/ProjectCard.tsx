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
  };
}

const ProjectCard = ({ index, project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: "sine.in",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          ctx.revert();
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={cardRef} className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-4">
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <h2 className="text-lg font-medium text-heading-2">
            {String(index + 1).padStart(2, "0")} / {project.title}
          </h2>
          <p className="text-lg text-body">{project.description}</p>
          {project.skills && (
            <p className="text-sm text-[#606060]">
              {Array.isArray(project.skills)
                ? project.skills.join(", ")
                : project.skills}
            </p>
          )}
          <div className="flex-grow"></div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-heading-2 flex items-center gap-1 relative w-fit before:content-[''] before:text-inherit before:rounded-md before:h-px before:bottom-0.5 before:bg-current before:transition-[width] before:ease-in before:absolute before:left-0 before:w-0 hover:before:w-full"
          >
            {new URL(project.link).hostname.replace(/^www\./, "")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
            </svg>
          </a>
        </div>
        <div className="lg:col-span-7">
          <FullscreenVideo
            src={`/projects/${project.key}/video.mov`}
            poster={`/projects/${project.key}/image.png`}
          />
        </div>
      </div>
      <div className="w-full border-b-[1.5px] border-gray-900 dark:border-gray-400 mt-6"></div>
    </article>
  );
};

export default ProjectCard;
