"use client";

import { RESUME_LINK } from "@/constant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    const splitTextHeader = new SplitText("#hero-title", {
      type: "words",
      wordsClass: "words",
      onSplit: (self) => {
        gsap.set(self.words, {
          y: 20,
        });
      },
    });

    const splitTextDescription = new SplitText("#hero-section p", {
      type: "words",
      wordsClass: "words",
      onSplit: (self) => {
        gsap.set(self.words, {
          opacity: 0.2,
        });
      },
    });

    tl.to(splitTextHeader.words, {
      duration: 0.3,
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "power2.inOut",
    });

    tl.to(
      splitTextDescription.words,
      {
        duration: 0.2,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      "<"
    );
  }, []);

  return (
    <>
      <section
        id="hero-section"
        className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-20"
      >
        <div className="flex-1">
          <h1
            id="hero-title"
            className="heading-1 mb-5 md:mb-8 [&_.words]:opacity-0"
          >
            Hi, I’m <br />
            Girish Sawant, a Frontend Artist
          </h1>
          <p className="heading-2 text-gray [&_.words]:opacity-0">
            Frontend Tech Lead with startup experience, building products from
            scratch using React, TypeScript, and Next.js. I focus on
            performance, scalable architecture, and accessible UI. Skilled in
            SSR, microfrontends, CI/CD, and mentoring dev teams from concept to
            launch.
          </p>
          <p className="heading-2 text-gray [&_.words]:opacity-0 mt-4">
            Beyond code, I mentor engineers, guide architecture decisions, and
            drive delivery excellence from first commit to production.
          </p>
        </div>
        <div className="flex-1 justify-items-end relative">
          <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image
              src="/images/profile.jpeg"
              alt="Profile picture of Girish Sawant"
              width={420}
              height={562}
              className="object-cover dark:brightness-75 opacity-20 blur-xs"
              priority
              ref={imageRef}
              onLoad={() => {
                gsap.to(imageRef.current, {
                  duration: 0.2,
                  opacity: 1,
                  filter: "blur(0px)",
                  ease: "power2.inOut",
                });
              }}
            />
          </div>
        </div>
      </section>

      <section id="skills" className="flex flex-col gap-20 pt-32 pb-20">
        <div className="flex flex-col gap-20 max-w-full md:max-w-1/2">
          <div className="primary-skills flex gap-16">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap">
              Main Skills
            </h3>
            <p className="body">
              React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS,
              GSAP, Framer Motion
            </p>
          </div>
          <div className="flex gap-16">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap">
              Other Skills
            </h3>
            <p className="body">
              {/* Skill other than frontend */}
              Git, GitHub, Figma, Webpack, Vite, Node.js, Express.js, MongoDB,
              PostgreSQL, MySQL, REST APIs, GraphQL, Agile Methodologies,
              Responsive Design, UI/UX Design, Cross-Browser Compatibility,
              Performance Optimization, Testing and Debugging, CI/CD, DevOps,
              Cloud Services (AWS, Azure), SEO, Accessibility (WCAG), Web
              Security, Content Management Systems (CMS), E-commerce Platforms,
              Progressive Web Apps (PWAs), Mobile-First Design, Agile/Scrum
              Methodologies, Version Control (Git), Code Review and
              Collaboration, Continuous Integration/Continuous Deployment
              (CI/CD), Test-Driven Development (TDD), Pair Programming, Agile
              Methodologies, DevOps
            </p>
          </div>
        </div>
      </section>

      <hr className="border-foreground border-t-2" />

      <section
        id="contact"
        className="flex flex-col md:flex-row justify-between pt-16 gap-y-10"
      >
        <div className="max-w-full md:max-w-1/3">
          <h3 className="heading-2">
            I am thrilled to answer to your next project
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block ml-6"
            >
              <path
                d="M-5.24032e-07 9.01154L-3.92898e-07 12.0115L18.3146 12.0115L11.3126 18.9462L13.4097 21L24 10.5115L13.4097 1.32119e-06L11.3126 2.1L18.3146 9.01154L-5.24032e-07 9.01154Z"
                fill="#181717"
              />
            </svg>
          </h3>
        </div>

        <div id="contacts" className="flex flex-col gap-3">
          <a
            href="mailto:girishsawant999.gs@gmail.com"
            className="heading-2 hover:underline"
          >
            girishsawant999.gs@gmail.com
          </a>
          <div className="flex items-center gap-3 justify-between">
            <Link
              href={RESUME_LINK}
              target="_blank"
              className="body w-fit hover:underline cursor-pointer"
            >
              View Resume
            </Link>

            <a href="tel:+918796456149" className="body hover:underline">
              +91 8796456149
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
