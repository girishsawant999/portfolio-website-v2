export const PROJECTS = [
  {
    key: "stampmyvisa-biz",
    title: "StampMyVisa - Biz (B2B SaaS)",
    description:
      "Core revenue-generating platform automating visa processing for travel agents. Architected the frontend to handle complex RBAC (Role-Based Access Control) and integrated AI-powered document extraction pipelines. Reduced manual data entry by ~40% through automated workflows.",
    skills: [
      "React",
      "TypeScript",
      "Complex RBAC",
      "AI Integration",
      "Ant Design",
      "TanStack Query",
      "CI/CD Pipelines",
    ],
    link: "https://stampmyvisa.com",
  },
  {
    key: "stampmyvisa-nucleus",
    title: "Nucleus - Operations Engine",
    description:
      "High-performance desktop application built with Electron for internal operations. Implemented an offline-first architecture using IndexedDB for caching and local data processing. Features include client-side smart-cropping and bulk excel dataset processing without main-thread blocking.",
    skills: [
      "Electron.js",
      "React",
      "IndexedDB",
      "Web Workers",
      "Performance Optimization",
      "Smart Cropping",
      "Local Caching",
    ],
    link: "https://internal.stampmyvisa.com", // Ensure your component handles private URLs gracefully
  },
  {
    key: "esoteric-trade",
    title: "Esoteric Trade - Bot Dashboard",
    description:
      "Real-time financial dashboard visualizing high-frequency trading data. Engineered a WebSocket layer to handle live ticker updates without UI lag. Implemented complex charting strategies and state management to handle thousands of data points per second.",
    skills: [
      "React",
      "TypeScript",
      "WebSockets",
      "Real-time Data",
      "Chart.js",
      "Redux Toolkit",
      "Data Visualization",
    ],
    link: "https://esoterictrade.net/",
  },
  {
    key: "npm-packages",
    title: "Open Source Tooling",
    description:
      "A suite of developer-focused NPM packages including animated loaders and image utilities. Focuses on Developer Experience (DX) with tree-shakable exports, comprehensive TypeScript definitions, and Storybook documentation. Used by 500+ developers.",
    skills: [
      "Library Engineering",
      "Rollup/Vite",
      "NPM Publishing",
      "TypeScript",
      "Storybook",
      "DX (Developer Experience)",
    ],
    link: "https://www.npmjs.com/~girishsawant999?activeTab=packages",
  },
  {
    key: "konveyor",
    title: "Konveyor API Docs",
    description:
      "Developer portal for the StampMyVisa API suite. Built a high-performance documentation site with Next.js, featuring interactive API playgrounds, code-generation snippets, and dark mode support to drive developer adoption.",
    skills: [
      "Next.js",
      "MDX",
      "Tailwind CSS",
      "API Documentation",
      "Interactive Playground",
      "Framer Motion",
    ],
    link: "https://konveyor.stampmyvisa.com/",
  },
  {
    key: "30days-of-gsap",
    title: "30 Days of GSAP",
    description:
      "A technical challenge demonstrating advanced motion design implementation. Explores complex GSAP timelines, ScrollTrigger, and canvas animations to bridge the gap between creative design and technical implementation.",
    skills: ["GSAP Advanced", "Next.js", "Creative Coding", "WebGL", "Motion Design"],
    link: "https://30days-of-gsap.vercel.app/",
    wip: true,
  },
];

export const RESUME_LINK =
  "https://drive.google.com/file/d/1apZq4DeXvRNJD7g5nnSPzBwzE0LuwBNB/view";
