"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section id="hero-section" className="flex justify-between w-full gap-20">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="heading-1 mb-8"
          >
            Hi, I’m <br />
            Girish Sawant, a Frontend Artist
          </motion.h1>
          <p className="heading-2 text-gray">
            My work is mainly focused on crafting intuitive, high-performance
            frontends that merge design clarity with technical depth. I turn
            complex ideas into elegant interfaces—clean, scalable, and built to
            last.
          </p>
          <p className="heading-2 text-gray mt-4">
            Now, I’m working as a Frontend Tech Lead at StampMyVisa, where I
            lead frontend strategy, mentor developers, and craft user
            experiences.
          </p>
        </div>
        <div className="flex-1 justify-items-end relative">
          <div className="relative overflow-hidden">
            <motion.span
              initial={{ height: "500%" }}
              animate={{ height: "40%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-0 inset-x-0 [mask-image:linear-gradient(var(--background),#fff0)] [background:linear-gradient(var(--background),#fff0)] backdrop-blur-[2px]"
            ></motion.span>
            <Image
              src="/images/profile.jpeg"
              alt="Profile picture of Girish Sawant"
              width={421}
              height={590}
            />
            <motion.span
              initial={{ height: "500%" }}
              animate={{ height: "15%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute bottom-0 inset-x-0 [mask-image:linear-gradient(#fff0,var(--background))] [background:linear-gradient(#fff0,var(--background))] backdrop-blur-[2px]"
            ></motion.span>
          </div>
        </div>
      </section>

      <section id="skills" className="flex flex-col gap-20 pt-32 pb-20">
        <div className="flex flex-col gap-20 max-w-1/2">
          <div className="flex gap-16">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap">
              Main Skills
            </h3>
            <p className="body">
              React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS,
              Framer Motion,
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

      <section id="contact" className="flex justify-between pt-16">
        <div className="max-w-1/3">
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

        <div className="flex flex-col gap-7">
          <a href="mailto:girishsawant999.gs@gmail.com" className="heading-2">
            girishsawant999.gs@gmail.com
          </a>

          <button className="body w-fit">View Resume</button>
        </div>
      </section>
    </>
  );
}
