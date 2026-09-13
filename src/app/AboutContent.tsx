"use client";

import { EDUCATION, EXPERIENCE } from "@/constant";
import CompanyLogo from "@/components/ui/CompanyLogo";
import ProgressiveBlur from "@/components/ui/ProgressiveBlur";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const SERVICES = [
  {
    index: "001",
    title: "Frontend Architecture",
    tagline: "Systems that actually scale.",
    description:
      "I've spent years splitting massive frontends into pieces teams can own. Module Federation, lazy boundaries, isolated components — the goal is simple: you grow to 50 engineers and your codebase doesn't turn into spaghetti. It's possible if the architecture thinks ahead.",
  },
  {
    index: "002",
    title: "Performance Matters",
    tagline: "Because users won't wait.",
    description:
      "Shaving 2 seconds off load time seems small until you realize it's the difference between staying and leaving. I've cut load times to half without magic — just aggressive code splitting, lazy loading what matters, and knowing which metrics actually move the needle. 40% improvement isn't luck, it's just caring.",
  },
  {
    index: "003",
    title: "Design Systems That Stick",
    tagline: "Consistency without reinventing wheels.",
    description:
      "Building button components 50 times is exhausting. I've built systems where design and engineering don't argue, where components live once and work everywhere. Teams stop asking 'how do we build this?' and actually ship. That's the point.",
  },
  {
    index: "004",
    title: "Growing People, Not Just Teams",
    tagline: "Engineers who can teach the next one.",
    description:
      "Started with hiring the first engineers, setting standards that stuck. Mentorship isn't about code reviews — it's about building people who can make decisions. My goal has always been: hire someone, teach them well, and they teach the next person. That's how you scale.",
  },
];

const CORE_STACK = [
  {
    title: "Core Stack",
    detail:
      "React and Next.js in production for 5+ years. TypeScript saved me from dumb mistakes more times than I can count. Module Federation when the monolith gets too fat. Redux for complex state, but honestly TanStack Query handles most of it now. Tailwind makes CSS stop being a headache. GSAP for animations that don't feel janky.",
  },
  {
    title: "Architecture & Ops",
    detail:
      "Node.js and Express on the backend, Docker for consistency across environments. AWS and Vercel — know both well. CI/CD pipelines that actually work (GitHub Actions mostly). Built a few Electron apps when people needed desktop tools. Test coverage above 85% keeps me sleeping at night. Vitest is fast enough that people actually run tests.",
  },
  {
    title: "Security & Payments",
    detail:
      "RBAC and basic permission models done right. JWT tokens and OAuth2 flows — implemented enough times to know the gotchas. Integrated Razorpay, Stripe, and Tabby for payment processing. Handled PCI compliance stuff. It's not glamorous but it matters. Secrets management actually matters more than people think.",
  },
  {
    title: "AI & Data",
    detail:
      "Used OpenAI and Claude APIs for document parsing and classification. Built a few search pipelines with embeddings. Experimented with structured outputs from LLMs. Nothing too fancy — just practical stuff that solved real problems. Still figuring out what actually works vs hype.",
  },
];

const IMPACT = [
  "Hired and trained the first 5 engineers at a SaaS startup. Most of them are still there and have grown into leads. Set the coding standards early that actually stuck — most teams skip this and regret it later.",
  "Worked on a project with a 12-second load time. Focused on route-based code splitting and lazy loading. Got it down to under 5 seconds. LCP improved from 4.2s to 1.8s. Product team finally stopped complaining about slow pages.",
  "Pushed for test coverage everywhere. Started from 20%, got it to 80% over a year. Caught actual bugs in QA that would've been customer support tickets. Costs less than dealing with production fire.",
  "Built a component library for an e-commerce platform. Design system + shared components across 3 different products. Saved weeks of duplicate work. Not fancy, just useful.",
];

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useScrollReveal(containerRef);

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
          scrub: 1.5,
        },
      });

      // --- 3. SERVICE ICON ANIMATIONS ---
      // Shape-specific animations based on visual design

      // Icon 0: Concentric Circles - Rotating rings with scale pulse
      gsap.to(".service-circle-outer", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "32px 32px",
      });

      gsap.to(".service-circle-middle", {
        rotation: -360,
        duration: 8,
        repeat: -1,
        ease: "none",
        transformOrigin: "32px 32px",
      });

      gsap.to(".service-circle-inner", {
        keyframes: [
          { scale: 1, opacity: 1 },
          { scale: 1.2, opacity: 0.6 },
          { scale: 1, opacity: 1 },
        ],
        duration: 2,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Icon 1: Lightning Bolt - Outline stroke drawing animation
      // Get the path element to measure its length
      const lightningPath = document.querySelector(".lightning-bolt-path") as SVGPathElement;
      if (lightningPath) {
        const pathLength = lightningPath.getTotalLength();

        // Set initial stroke dash properties
        gsap.set(".lightning-bolt-path", {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // Create animation timeline
        const lightningTl = gsap.timeline({ repeat: -1 });

        // Draw the path
        lightningTl.to(
          ".lightning-bolt-path",
          {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power1.inOut",
          },
          0
        );

        // Shake while drawing
        lightningTl.to(
          ".service-icon-1",
          {
            keyframes: [
              { x: 0 },
              { x: -2 },
              { x: 2 },
              { x: -1 },
              { x: 1 },
              { x: 0 },
            ],
            duration: 0.6,
            ease: "sine.inOut",
          },
          0
        );

        // Hold the drawn path briefly
        lightningTl.to(
          ".lightning-bolt-path",
          {
            opacity: 1,
            duration: 0.3,
          },
          0.6
        );

        // Fade out
        lightningTl.to(
          ".lightning-bolt-path",
          {
            opacity: 0.3,
            duration: 0.2,
          },
          0.9
        );

        // Wait before redrawing
        lightningTl.to(
          ".lightning-bolt-path",
          {
            opacity: 0.3,
            duration: 0.5,
          },
          1.1
        );
      }

      // Icon 2: Grid Squares - Wave effect from top-left to bottom-right
      gsap.to(".service-icon-2 .grid-square, .service-icon-2 .grid-square-tall", {
        opacity: 0.3,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: {
          amount: 0.4,
          from: "start",
        },
      });

      // Icon 3: Checkmark - Stroke drawing animation
      const checkmarkPath = document.querySelector(".service-checkmark-path") as SVGPathElement;
      if (checkmarkPath) {
        const pathLength = checkmarkPath.getTotalLength();
        gsap.set(".service-checkmark-path", {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(".service-checkmark-path", {
          strokeDashoffset: 0,
          duration: 1,
          repeat: -1,
          ease: "power2.inOut",
          repeatDelay: 0.5,
        });
      }

      gsap.to(".service-icon-3 .service-checkmark-border", {
        keyframes: [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }],
        duration: 2,
        repeat: -1,
        ease: "sine.inOut",
      });

      return () => {
        splitTextHeader?.revert();
        splitTextDescription?.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section
        id="hero-section"
        className="flex flex-col md:flex-row items-center justify-between w-full gap-12 lg:gap-24 min-h-[80vh] pt-6 md:pt-12"
      >
        <div className="flex-1 flex flex-col items-start justify-center gap-6 md:gap-8">
          <div className="flex items-center gap-5 w-full">
            <span className="hero-kicker text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              About
            </span>
            <div className="hero-divider h-[2px] flex-1 max-w-[100px] bg-secondary/30 dark:bg-secondary/50" />
          </div>

          <h1
            id="hero-title"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-dm-sans font-regular tracking-tight leading-[1.05]"
          >
            Engineer <span className="text-gray-400 dark:text-gray-500">building scalable architectures<br />
            from</span> frontend to
            systems.
          </h1>
          <div className="flex flex-col gap-6 mt-8 w-full max-w-2xl">
            <p className="hero-desc-text text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
              Started writing React six years ago. Then I had to actually scale it. Built systems that handle millions of users without breaking, led teams through the chaos, cut load times in half, and learned that good architecture pays for itself. That&apos;s what I do now.
            </p>
          </div>
        </div>

        <div className="flex-1 w-full justify-center md:justify-end flex items-center relative hero-image-wrapper">
          <div className="relative rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 w-full max-w-[320px] md:max-w-[420px] aspect-[3/4] will-change-transform shadow-2xl dark:shadow-none">
            <Image
              src="/images/profile.jpeg"
              alt="Profile picture of Girish Sawant"
              fill
              sizes="(min-width: 768px) 420px, 320px"
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

      {/* Experience */}
      <section className="flex flex-col gap-12 md:gap-16 pt-24">
        <div className="sticky top-0 z-40 flex items-center gap-6 w-[calc(100%+2.5rem)] py-4 -mx-5 px-5 md:w-[calc(100%+5rem)] md:-mx-10 md:px-10 reveal-group">
          <ProgressiveBlur />
          <h2 className="text-3xl md:text-4xl font-dm-sans font-medium tracking-tight reveal-text">
            Experience
          </h2>
          <div className="h-[2px] flex-1 bg-gray-200 dark:bg-gray-800 reveal-text" />
        </div>

        <div className="flex flex-col gap-14 md:gap-20">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company}
              className="reveal-group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
            >
              <div className="md:col-span-3 reveal-text flex items-start gap-3">
                <CompanyLogo company={job.company} />
                <div>
                  <p className="font-dm-sans font-medium text-lg text-foreground">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{job.role}</p>
                  <p className="text-xs uppercase tracking-widest text-secondary mt-2">
                    {job.period}
                  </p>
                </div>
              </div>
              <ul className="md:col-span-9 flex flex-col gap-3">
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="reveal-text flex items-start gap-4 text-sm md:text-base text-gray-600 dark:text-gray-400 font-inter leading-relaxed"
                  >
                    <span className="text-secondary mt-[0.35rem] min-w-3 max-w-3 text-2xl leading-none">
                      &bull;
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="flex flex-col gap-12 md:gap-16 pt-20 pb-8"
      >
        <div className="sticky top-0 z-40 flex items-center gap-6 w-[calc(100%+2.5rem)] py-4 -mx-5 px-5 md:w-[calc(100%+5rem)] md:-mx-10 md:px-10 reveal-group">
          <ProgressiveBlur />
          <h2 className="text-3xl md:text-4xl font-dm-sans font-medium tracking-tight reveal-text">
            What I Bring
          </h2>
          <div className="h-[2px] flex-1 bg-gray-200 dark:bg-gray-800 reveal-text" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((service, idx) => (
            <div
              key={service.index}
              className="reveal-group relative flex flex-col items-center justify-start gap-6 p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              {/* Index Number - Top Right Corner */}
              <span className="reveal-text absolute top-4 left-4 text-xs font-semibold text-gray-400 font-dm-sans uppercase tracking-widest">
                {service.index}
              </span>

              {/* Icon Container */}
              <div className="w-24 h-24 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 service-icon-container">
                {/* Icon 0: Concentric Circles */}
                {idx === 0 && (
                  <svg
                    className="w-16 h-16 service-icon-0"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="32" cy="32" r="20" opacity="0.6" className="service-circle-outer" />
                    <circle cx="32" cy="32" r="12" opacity="0.8" className="service-circle-middle" />
                    <circle cx="32" cy="32" r="4" opacity="1" className="service-circle-inner" />
                  </svg>
                )}

                {/* Icon 1: Thunder/Lightning */}
                {idx === 1 && (
                  <svg
                    className="w-16 h-16 service-icon-1"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Main Lightning bolt outline - path drawing animation */}
                    <path className="lightning-bolt-path" d="M32 8 L44 32 L28 32 L36 56 L16 28 L32 28 Z" />
                  </svg>
                )}

                {/* Icon 2: Grid Squares */}
                {idx === 2 && (
                  <svg
                    className="w-16 h-16 service-icon-2"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {/* Top row */}
                    <rect x="8" y="8" width="12" height="12" className="grid-square" />
                    <rect x="24" y="8" width="12" height="12" className="grid-square" />
                    <rect x="40" y="8" width="12" height="12" className="grid-square" />
                    {/* Middle row */}
                    <rect x="8" y="24" width="12" height="12" className="grid-square" />
                    <rect x="24" y="24" width="12" height="12" className="grid-square" />
                    {/* Right column tall */}
                    <rect x="40" y="24" width="12" height="28" className="grid-square-tall" />
                    {/* Bottom row */}
                    <rect x="8" y="40" width="12" height="12" className="grid-square" />
                    <rect x="24" y="40" width="12" height="12" className="grid-square" />
                  </svg>
                )}

                {/* Icon 3: Checkmark */}
                {idx === 3 && (
                  <svg
                    className="w-16 h-16 service-icon-3"
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {/* Border */}
                    <rect x="8" y="8" width="48" height="48" rx="4" className="service-checkmark-border" />
                    {/* Checkmark */}
                    <path d="M20 32 L28 40 L44 24" strokeLinecap="round" strokeLinejoin="round" className="service-checkmark-path" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 text-center">
                <h3 className="reveal-text text-lg md:text-lg font-dm-sans font-medium tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="reveal-text text-xs md:text-sm text-secondary font-inter">
                  {service.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="reveal-text text-xs md:text-sm text-gray-600 dark:text-gray-400 font-inter leading-relaxed text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Expertise */}
      <section className="flex flex-col gap-12 md:gap-16 pt-20 pb-8">
        <div className="sticky top-0 z-40 flex items-center gap-6 w-[calc(100%+2.5rem)] py-4 -mx-5 px-5 md:w-[calc(100%+5rem)] md:-mx-10 md:px-10 reveal-group">
          <ProgressiveBlur />
          <h2 className="text-3xl md:text-4xl font-dm-sans font-medium tracking-tight reveal-text">
            Core Expertise
          </h2>
          <div className="h-[2px] flex-1 bg-gray-200 dark:bg-gray-800 reveal-text" />
        </div>

        <div className="flex flex-col gap-10 md:gap-14 w-full md:w-5/6 lg:w-4/5 ml-auto reveal-group">
          {CORE_STACK.map((item) => (
            <div
              key={item.title}
              className="flex flex-col md:flex-row gap-4 md:gap-12"
            >
              <h3 className="reveal-text text-lg md:text-xl font-dm-sans font-medium tracking-tight flex-1 whitespace-nowrap text-foreground">
                {item.title}
              </h3>
              <p className="reveal-text text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed flex-[2.5]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Impact */}
      <section className="flex flex-col gap-12 md:gap-16 pt-20 pb-8">
        <div className="sticky top-0 z-40 flex items-center gap-6 w-[calc(100%+2.5rem)] py-4 -mx-5 px-5 md:w-[calc(100%+5rem)] md:-mx-10 md:px-10 reveal-group">
          <ProgressiveBlur />
          <h2 className="text-3xl md:text-4xl font-dm-sans font-medium tracking-tight reveal-text">
            Key Impact
          </h2>
          <div className="h-[2px] flex-1 bg-gray-200 dark:bg-gray-800 reveal-text" />
        </div>

        <div className="flex flex-col gap-6 w-full md:w-5/6 lg:w-4/5 ml-auto reveal-group text-base md:text-lg text-gray-600 dark:text-gray-400 font-inter leading-relaxed">
          {IMPACT.map((point) => (
            <p key={point} className="reveal-text flex items-start gap-4">
              <span className="text-secondary mt-[0.35rem] min-w-3 max-w-3 text-2xl leading-none">
                &bull;
              </span>
              <span>{point}</span>
            </p>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="flex flex-col gap-8 pt-20 pb-24 reveal-group">
        <div className="sticky top-0 z-40 flex items-center gap-6 w-[calc(100%+2.5rem)] py-4 -mx-5 px-5 md:w-[calc(100%+5rem)] md:-mx-10 md:px-10">
          <ProgressiveBlur />
          <h2 className="reveal-text text-3xl md:text-4xl font-dm-sans font-medium tracking-tight">
            Education
          </h2>
          <div className="reveal-text h-[2px] flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="reveal-text flex flex-col md:flex-row md:items-center gap-2 md:gap-6 w-full md:w-5/6 lg:w-4/5 ml-auto">
          <p className="font-dm-sans font-medium text-lg text-foreground flex-1">
            {EDUCATION.degree}
          </p>
          <p className="text-sm text-gray-500">{EDUCATION.school}</p>
          <p className="text-xs uppercase tracking-widest text-secondary">
            {EDUCATION.period}
          </p>
        </div>
      </section>

      {/* Selected Work */}
      {/* <section id="work" className="flex flex-col gap-12 md:gap-16 pb-24">
        <div className="flex items-end justify-between gap-6 w-full reveal-group">
          <div className="flex flex-col gap-3">
            <h2 className="reveal-text text-3xl md:text-4xl font-dm-sans font-medium tracking-tight">
              Selected Work
            </h2>
            <p className="reveal-text text-sm md:text-base text-gray-600 dark:text-gray-400 font-inter max-w-lg">
              Work I&apos;m actually proud of. SaaS platforms that handle millions of requests. Desktop apps that work offline. Design systems that made designers and engineers stop fighting.
            </p>
          </div>
          <Link
            href="/work"
            data-cursor-hover
            className="reveal-text navigation hover:text-foreground transition-colors flex-shrink-0"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURED_PROJECTS.map((project) => (
            <Link
              key={project.key}
              href={`/work/${project.key}`}
              data-cursor-label="View"
              className="reveal-group group flex flex-col gap-4"
            >
              <div className="reveal-text relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#141414]">
                <Image
                  src={`/projects/${project.key}/image.png`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="reveal-text flex items-center justify-between gap-3">
                <span className="font-dm-sans font-medium text-base md:text-lg text-foreground">
                  {project.title.split("—")[0].trim()}
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-500">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section> */}

      {/* Animated Line */}
      <hr className="architectural-line border-gray-200 dark:border-gray-800 border-t-[2px] origin-left" />

      {/* Contact Section */}
      <section
        id="contact"
        className="flex flex-col gap-16 pt-20 pb-12 reveal-group bg-foreground/5 -mx-5 px-5 md:-mx-10 md:px-10"
      >
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-inter font-regular tracking-tight leading-[1.1] reveal-text text-foreground">
            Connect, collaborate, <br />
            <span className="text-gray-400 dark:text-gray-600">or just say</span> hello
          </h2>
        </div>

        <div
          id="contacts"
          className="flex flex-col gap-4 reveal-text"
        >
          <a
            href="mailto:girishsawant999.gs@gmail.com"
            data-cursor-hover
            className="text-lg md:text-xl font-inter font-medium text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
          >
            girishsawant999.gs@gmail.com
          </a>
          
          <a
            href="tel:+918796456149"
            data-cursor-hover
            className="text-lg md:text-xl font-inter font-medium text-gray-600 dark:text-gray-400 hover:text-foreground transition-colors"
          >
            +91 8796456149
          </a>
        </div>
      </section>
    </div>
  );
}
