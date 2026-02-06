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
      const tl = gsap.timeline();

      // --- 1. HERO TEXT SETUP ---
      const splitTextHeader = new SplitText("#hero-title", {
        type: "words",
        wordsClass: "hero-words",
      });

      const splitTextDescription = new SplitText("#hero-section p", {
        type: "words",
        wordsClass: "hero-desc-words",
      });

      // INITIAL STATES
      // Header: Down and invisible
      gsap.set(splitTextHeader.words, { y: 50, opacity: 0 });
      // Description: COMPLETELY INVISIBLE (Stage 1: Opacity 0)
      gsap.set(splitTextDescription.words, { opacity: 0 });

      // --- ANIMATION SEQUENCE ---
      tl
        // 1. Reveal Header
        .to(splitTextHeader.words, {
          duration: 0.8,
          y: 0,
          opacity: 1,
          stagger: 0.05,
          ease: "power3.out",
        })
        // 2. Fade Description to "Ghost State" (Stage 2: Opacity 0.2)
        .to(
          splitTextDescription.words,
          {
            duration: 1,
            opacity: 0.2, // The "Ghost" text
            ease: "power2.out",
          },
          "-=0.5" // Start while header is finishing
        )
        // 3. Ripple to Full Visibility (Stage 3: Opacity 1)
        .to(splitTextDescription.words, {
          duration: 0.6,
          opacity: 1,
          stagger: 0.03, // The "Reading" effect
          ease: "power1.out",
        });

      // --- 2. HERO IMAGE PARALLAX ---
      gsap.to(".hero-image-wrapper", {
        yPercent: 20,
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
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // --- 4. LINE DRAWING ANIMATION ---
      gsap.from(".architectural-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".architectural-line",
          start: "top 90%",
        },
      });

    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        id="hero-section"
        className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-20 min-h-[80vh]"
      >
        <div className="flex-1 flex flex-col justify-center">
          <h1
            id="hero-title"
            className="heading-1 mb-5 md:mb-8 overflow-hidden"
          >
            Hi, I’m <br />
            Girish Sawant, a Senior Frontend Engineer & Architect
          </h1>
          {/* Added min-h to prevent layout shift during font loading/splitting */}
          <div className="overflow-visible min-h-[120px]">
            <p className="heading-2 text-gray">
              Senior Tech Lead with 6+ years of experience scaling engineering
              teams (0 to 10) and delivering enterprise-grade products from 0 to
              1. I specialize in React/TypeScript architectures, having reduced
              application load times by ~40% through micro-frontend implementation
              and optimized build pipelines.
            </p>
          </div>
          <div className="overflow-visible mt-4">
            <p className="heading-2 text-gray">
              From architecting the &quot;Nucleus&quot; electron platform to
              defining company-wide design systems, I bridge the gap between
              complex product requirements and engineering execution.
            </p>
          </div>
        </div>
        
        <div className="flex-1 justify-items-end relative hero-image-wrapper">
          <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 w-full md:w-[420px] aspect-[3/4] will-change-transform">
            <Image
              src="/images/profile.jpeg"
              alt="Profile picture of Girish Sawant"
              fill
              className="object-cover dark:brightness-75 opacity-0 blur-md scale-110"
              priority
              ref={imageRef}
              onLoad={() => {
                gsap.to(imageRef.current, {
                  duration: 1.2,
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                  ease: "power2.out",
                });
              }}
            />
          </div>
        </div>
      </section>

      <section id="skills" className="flex flex-col gap-20 pt-32 pb-20">
        <div className="flex flex-col gap-20 max-w-full md:max-w-3/4">
          
          {/* Main Skills */}
          <div className="primary-skills flex flex-col md:flex-row gap-8 md:gap-16 reveal-group">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap reveal-text">
              Core Stack
            </h3>
            <p className="body flex-[3] reveal-text">
              React, Next.js, TypeScript, Micro-frontends, Redux, TanStack
              Query, Tailwind CSS, GSAP.
            </p>
          </div>

          {/* Architecture & Ops */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 reveal-group">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap reveal-text">
              Architecture & Ops
            </h3>
            <p className="body flex-[3] reveal-text">
              Node.js, Docker, AWS Amplify, CI/CD, Micro-frontends, Module Federation, 
              Electron.js, Vitest (90% Coverage).
            </p>
          </div>

          {/* Security & Integrations */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 reveal-group">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap reveal-text">
              Security & Payments
            </h3>
            <p className="body flex-[3] reveal-text">
              Auth (Okta SSO, OAuth2, JWT), RBAC (Role-Based Access Control), 
              Payment Gateways (Razorpay/Stripe Integration, Tabby pay later, Apple pay), Web Security (OWASP).
            </p>
          </div>

          {/* AI & Automation */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 reveal-group">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap reveal-text">
              AI & Emerging Tech
            </h3>
            <p className="body flex-[3] reveal-text">
              LLM Integration (OpenAI/Gemini APIs), AI-Driven Data Extraction, 
              Prompt Engineering for Structured Outputs, GitHub Copilot & Cursor Workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="flex flex-col gap-20 pb-20">
        <div className="flex flex-col gap-20 max-w-full md:max-w-3/4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 reveal-group">
            <h3 className="text-lg underline tracking-tight flex-1 whitespace-nowrap reveal-text">
              Key Achievements
            </h3>
            <div className="body flex-[3] flex flex-col gap-4">
              <p className="reveal-text">
                • Scaled engineering teams from 0 to 10 members, managing
                hiring and mentorship.
              </p>
              <p className="reveal-text">
                • Reduced initial load times by ~40% and improved Core Web
                Vitals via code-splitting.
              </p>
              <p className="reveal-text">
                • Enforced code quality standards achieving 90%+ unit test
                coverage with Vitest.
              </p>
              <p className="reveal-text">
                • Architected &quot;Biz&quot; (AI-powered B2B platform) and
                &quot;X-Wings&quot; (Shared Design System).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Line */}
      <hr className="architectural-line border-foreground border-t-2 origin-left" />

      {/* Contact Section */}
      <section
        id="contact"
        className="flex flex-col md:flex-row justify-between pt-16 gap-y-10 reveal-group group"
      >
        <div className="max-w-full md:max-w-1/2">
          <h3 className="heading-2 reveal-text inline">
            Ready to architect your next scalable product?
            <span className="inline-flex items-center ml-3 align-middle transition-transform duration-300 group-hover:translate-x-2">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-5.24032e-07 9.01154L-3.92898e-07 12.0115L18.3146 12.0115L11.3126 18.9462L13.4097 21L24 10.5115L13.4097 1.32119e-06L11.3126 2.1L18.3146 9.01154L-5.24032e-07 9.01154Z"
                  fill="#181717"
                  className="fill-current"
                />
              </svg>
            </span>
          </h3>
        </div>

        <div id="contacts" className="flex flex-col gap-3 reveal-text">
          <a
            href="mailto:girishsawant999.gs@gmail.com"
            className="heading-2 hover:opacity-70 transition-opacity"
          >
            girishsawant999.gs@gmail.com
          </a>
          <div className="flex items-center gap-6 justify-between mt-2">
            <Link
              href={RESUME_LINK}
              target="_blank"
              className="body w-fit hover:underline cursor-pointer group/link flex items-center gap-2"
            >
              View Resume
              <span className="group-hover/link:translate-x-1 transition-transform">↗</span>
            </Link>

            <a href="tel:+918796456149" className="body hover:underline">
              +91 8796456149
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
