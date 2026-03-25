export const PROJECTS = [
  // ── Tier 1: Shipped professional products ──────────────────────────
  {
    key: "stampmyvisa-biz",
    title: "StampMyVisa Biz — B2B SaaS Platform",
    description:
      "Frontend for an enterprise visa-processing platform used by travel agencies daily. Built complex role-based access control, automated document intake workflows, real-time application tracking, and ops dashboards with TanStack Query for server-state sync.",
    skills: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Ant Design",
      "Tailwind CSS",
      "REST API",
      "CI/CD",
    ],
    link: "https://stampmyvisa.com",
  },
  {
    key: "stampmyvisa-nucleus",
    title: "StampMyVisa Nucleus — Electron Desktop App",
    description:
      "Offline-first desktop app for internal visa ops. IndexedDB for local caching, Web Workers for non-blocking bulk Excel parsing, client-side image smart-cropping, and a micro-frontend shell hosting multiple team modules.",
    skills: [
      "Electron",
      "React",
      "TypeScript",
      "IndexedDB",
      "Web Workers",
      "Micro Frontends",
      "Ant Design",
    ],
    link: "https://internal.stampmyvisa.com",
  },
  {
    key: "esoteric-trade",
    title: "Esoteric Trade — Trading Dashboard",
    description:
      "Real-time admin dashboard for a trading bot ecosystem. WebSocket layer for live ticker streaming, Chart.js for strategy visualization, Redux Toolkit for normalised state across multiple data views, and JWT-based auth flows.",
    skills: [
      "React",
      "TypeScript",
      "WebSockets",
      "Chart.js",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    link: "https://esoterictrade.net/",
  },
  {
    key: "elc-toys",
    title: "ELC Toys — E-Commerce Storefront",
    description:
      "Product-listing e-commerce site with search, filters, cart, and payment checkout. Redux Saga manages the async order flow. Straightforward React SPA — the interesting part was wiring Razorpay integration end-to-end.",
    skills: [
      "React",
      "Redux Saga",
      "Material UI",
      "REST API",
      "Payment Integration",
    ],
    link: "https://elctoys.com/",
  },

  // ── Tier 2: Shows initiative & depth ───────────────────────────────
  {
    key: "npm-packages",
    title: "Open-Source NPM Packages",
    description:
      "Published React component libraries on NPM — animated loaders, a Google Translate widget, and an image editor. Tree-shakable Rollup builds, full TypeScript types, and Storybook docs. Download numbers are public on NPM.",
    skills: ["React", "TypeScript", "Rollup", "Storybook", "NPM Publishing"],
    link: "https://www.npmjs.com/~girishsawant999?activeTab=packages",
  },
  {
    key: "konveyor",
    title: "Konveyor — API Product Landing Page",
    description:
      "Marketing and docs landing page for StampMyVisa's embeddable travel APIs. Next.js static site with MDX-powered documentation sections and Framer Motion page transitions. Not a full portal — it's a focused conversion page.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Framer Motion"],
    link: "https://konveyor.stampmyvisa.com/",
  },
  {
    key: "30days-of-gsap",
    title: "30 Days of GSAP — Learning Challenge",
    description:
      "A daily creative-coding exercise to learn GSAP in depth — timelines, ScrollTrigger, SplitText, and canvas animations. Not a product; a public learning log. Some days are rough, some turned out well.",
    skills: ["GSAP", "ScrollTrigger", "Next.js", "TypeScript", "Tailwind CSS"],
    link: "https://30days-of-gsap.vercel.app/",
    wip: true,
  },

  // ── Tier 3: Side projects ──────────────────────────────────────────
  {
    key: "meetzy",
    title: "Meetzy — WebRTC Video Calls",
    description:
      "Side project exploring WebRTC peer-to-peer connections with Socket.IO signalling. Supports room creation, invitation links, and multi-party calls. Demo-grade, not production-hardened.",
    skills: ["React", "WebRTC", "Socket.IO", "Node.js", "JavaScript"],
    link: "https://meetzy.netlify.app/",
  },
  {
    key: "be-animated",
    title: "Be Animated — GIF Loader Browser",
    description:
      "Small utility app wrapping the Giphy API — search, preview, and copy loader GIF URLs. Framer Motion for page transitions. Quick build, minimal scope.",
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Giphy API",
      "Framer Motion",
    ],
    link: "https://be-animated.netlify.app/",
  },
  {
    key: "spotify-clone",
    title: "Spotify Clone",
    description:
      "Early-career Spotify UI recreation with playback, playlists, and search. JavaScript-only (no TypeScript), Bootstrap + Material UI. It's a clone — included for completeness, not as a highlight.",
    skills: ["React", "JavaScript", "Material UI", "REST API", "Bootstrap"],
    link: "https://spotify-musix.netlify.app/",
  },
];

export const RESUME_LINK =
  "https://drive.google.com/file/d/1apZq4DeXvRNJD7g5nnSPzBwzE0LuwBNB/view";
