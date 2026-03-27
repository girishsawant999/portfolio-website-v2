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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // --- 1. HERO TEXT SETUP ---
      const splitTextHeader = new SplitText("#hero-title", {
        type: "lines, words",
        linesClass: "overflow-hidden",
        wordsClass: "hero-title-word",
      });

      const splitTextDescription = new SplitText(".hero-desc-text", {
        type: "lines",
        linesClass: "overflow-hidden",
        wordsClass: "hero-desc-line",
      });

      // INITIAL STATES
      gsap.set(".hero-kicker", { opacity: 0, x: -15 });
      gsap.set(".hero-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(splitTextHeader.words, { yPercent: 120 });
      gsap.set(splitTextDescription.lines, { yPercent: 120, opacity: 0 });

      // --- ANIMATION SEQUENCE ---
      // 1. Reveal Header on mount
      tl.to(".hero-kicker", {
        opacity: 1,
        x: 0,
        duration: 1,
      })
        .to(
          ".hero-divider",
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
        );

      // --- 2. HERO IMAGE PARALLAX ---
      gsap.to(".hero-image-wrapper", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // Smooth lag effect
        },
      });

      // --- 3. SECTIONS STAGGER REVEAL ---
      const sections = gsap.utils.toArray<HTMLElement>(".reveal-group");

      sections.forEach((section) => {
        gsap.fromTo(
          section.querySelectorAll(".reveal-text"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // --- 4. LINE DRAWING ANIMATION ---
      gsap.fromTo(
        ".architectural-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: ".architectural-line",
            start: "top 90%",
          },
        },
      );

      return () => {
        splitTextHeader?.revert();
        splitTextDescription?.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <section
        id="hero-section"
        className="flex flex-col md:flex-row items-center justify-between w-full gap-12 lg:gap-24 min-h-[80vh] pt-6 md:pt-12"
      >
        <div className="flex-1 flex flex-col items-start justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-5 w-full">
            <span className="hero-kicker text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Senior Frontend Architect
            </span>
            <div className="hero-divider h-[2px] flex-1 max-w-[100px] bg-secondary/30 dark:bg-secondary/50" />
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-dm-sans font-medium tracking-tight leading-[1.05]"
          >
            Hi, I’m <br />
            Girish Sawant.
          </h1>
          <div className="flex flex-col gap-6 mt-2 w-full max-w-2xl">
            <p className="hero-desc-text text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
              I build robust, scalable frontend architectures that survive
              enterprise traffic. With 6+ years of experience, I’ve scaled
              engineering teams from 0 to 10, transitioned monolithic codebases
              into modern micro-frontend setups, and slashed initial load times
              by 40%. No fluff, just results.
            </p>
            <p className="hero-desc-text text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
              From architecting offline-first Electron platforms to enforcing
              strict company-wide design systems, I bridge the gap between
              abstract product requirements and harsh engineering execution.
            </p>
          </div>
        </div>

        <div className="flex-1 w-full justify-center md:justify-end flex items-center relative hero-image-wrapper">
          <div className="relative rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 w-full max-w-[320px] md:max-w-[420px] aspect-[3/4] will-change-transform shadow-2xl dark:shadow-none">
            <Image
              src="/images/profile.jpeg"
              alt="Profile picture of Girish Sawant"
              fill
              className="object-cover dark:brightness-75 opacity-0 blur-md scale-110"
              priority
              ref={imageRef}
              onLoad={() => {
                gsap.to(imageRef.current, {
                  duration: 1.5,
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                  ease: "expo.out",
                });
              }}
            />
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="flex flex-col gap-12 md:gap-20 pt-32 pb-20"
      >
        <div className="flex items-center gap-6 w-full reveal-group">
          <h2 className="text-3xl md:text-4xl font-dm-sans font-medium tracking-tight reveal-text">
            Core Expertise
          </h2>
          <div className="h-[2px] flex-1 bg-gray-200 dark:bg-gray-800 reveal-text" />
        </div>

        <div className="flex flex-col gap-10 md:gap-16 w-full md:w-5/6 lg:w-4/5 ml-auto">
          {/* Main Skills */}
          <div className="primary-skills flex flex-col md:flex-row gap-4 md:gap-12 reveal-group">
            <h3 className="text-lg md:text-xl font-dm-sans font-medium tracking-tight flex-1 whitespace-nowrap text-foreground reveal-text">
              Core Stack
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed flex-[2.5] reveal-text">
              React, Next.js, TypeScript, Micro-frontends (Module Federation),
              Redux Toolkit, TanStack Query, Tailwind CSS, GSAP.
            </p>
          </div>

          {/* Architecture & Ops */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 reveal-group">
            <h3 className="text-lg md:text-xl font-dm-sans font-medium tracking-tight flex-1 whitespace-nowrap text-foreground reveal-text">
              Architecture & Ops
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed flex-[2.5] reveal-text">
              Node.js, Docker, AWS Amplify, CI/CD Pipeline Automation,
              Offline-first Electron.js Apps, Vitest (enforcing 90%+ coverage),
              System Design.
            </p>
          </div>

          {/* Security & Integrations */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 reveal-group">
            <h3 className="text-lg md:text-xl font-dm-sans font-medium tracking-tight flex-1 whitespace-nowrap text-foreground reveal-text">
              Security & Payments
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed flex-[2.5] reveal-text">
              Strict RBAC, OAuth2/JWT/Okta SSO, Payment Gateway Architectures
              (Razorpay, Stripe, Tabby Pay Later, Apple Pay), Web Security
              (OWASP).
            </p>
          </div>

          {/* AI & Automation */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 reveal-group">
            <h3 className="text-lg md:text-xl font-dm-sans font-medium tracking-tight flex-1 whitespace-nowrap text-foreground reveal-text">
              AI & Emerging Tech
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed flex-[2.5] reveal-text">
              LLM Orchestration (OpenAI/Gemini/Claude APIs), AI-Driven Data
              Extraction Pipelines, Advanced Prompt Engineering for Structured
              Outputs, Agentic Workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="flex flex-col gap-12 md:gap-20 pb-32">
        <div className="flex items-center gap-6 w-full reveal-group">
          <h2 className="text-3xl md:text-4xl font-dm-sans font-medium tracking-tight reveal-text">
            Key Impact
          </h2>
          <div className="h-[2px] flex-1 bg-gray-200 dark:bg-gray-800 reveal-text" />
        </div>

        <div className="flex flex-col gap-10 md:gap-16 w-full md:w-5/6 lg:w-4/5 ml-auto reveal-group">
          <div className="flex flex-col gap-6 w-full text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
            <p className="reveal-text flex items-start gap-4">
              <span className="text-secondary mt-[0.35rem] min-w-3 max-w-3 text-2xl leading-none">
                &bull;
              </span>
              <span>
                Scaled engineering teams from 0 to 10 members, driving technical
                hiring, architectural standards, and mentorship.
              </span>
            </p>
            <p className="reveal-text flex items-start gap-4">
              <span className="text-secondary mt-[0.35rem] min-w-3 max-w-3 text-2xl leading-none">
                &bull;
              </span>
              <span>
                Cut application load times by ~40% and crushed Core Web Vitals
                targets using aggressive code-splitting and Module Federation.
              </span>
            </p>
            <p className="reveal-text flex items-start gap-4">
              <span className="text-secondary mt-[0.35rem] min-w-3 max-w-3 text-2xl leading-none">
                &bull;
              </span>
              <span>
                Enforced merciless code quality standards, mandating 90%+ unit
                test coverage with Vitest to kill technical debt before it
                merges.
              </span>
            </p>
            <p className="reveal-text flex items-start gap-4">
              <span className="text-secondary mt-[0.35rem] min-w-3 max-w-3 text-2xl leading-none">
                &bull;
              </span>
              <span>
                Architected &quot;Biz&quot; (AI-powered B2B SaaS) and
                single-handedly defined &quot;X-Wings&quot; (a shared React UI
                design system across 4+ apps).
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Animated Line */}
      <hr className="architectural-line border-gray-200 dark:border-gray-800 border-t-[2px] origin-left" />

      {/* Contact Section */}
      <section
        id="contact"
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-16 pb-12 gap-y-12 reveal-group group"
      >
        <div className="flex-1 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-medium tracking-tight leading-[1.15] reveal-text text-foreground">
            Ready to architect your <br className="hidden lg:block" />
            next scalable product?
            <span className="inline-flex items-center ml-2 lg:ml-3 align-middle transition-transform duration-300 group-hover:translate-x-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        <div
          id="contacts"
          className="flex flex-col gap-3 lg:gap-4 justify-end items-start reveal-text"
        >
          <a
            href="mailto:girishsawant999.gs@gmail.com"
            className="text-lg md:text-xl lg:text-2xl font-inter font-medium text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
          >
            girishsawant999.gs@gmail.com
          </a>
          <div className="flex flex-wrap justify-between items-center gap-5 lg:gap-8 mt-1 lg:mt-2 w-full text-sm">
            <Link
              href={RESUME_LINK}
              target="_blank"
              className="font-inter font-medium uppercase tracking-widest text-secondary dark:text-secondary hover:opacity-80 transition-opacity cursor-pointer group/link flex items-center gap-1.5"
            >
              VIEW RESUME
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover/link:translate-x-[0.15rem] group-hover/link:-translate-y-[0.15rem] transition-transform"
              >
                <path
                  d="M7 17L17 7M17 7H7M17 7V17"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <a
              href="tel:+918796456149"
              className="font-inter text-base text-gray-600 dark:text-gray-300 hover:text-foreground transition-colors"
            >
              +91 8796456149
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
