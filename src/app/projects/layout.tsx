import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Engineering Case Studies | Girish Sawant",
  description:
    "Explore how I architect scalable frontend solutions. Case studies on Micro-frontends, Electron-based desktop apps, Enterprise SaaS platforms, and Design Systems.",
  keywords: [
    "Frontend Architecture",
    "Engineering Case Studies",
    "Enterprise SaaS",
    "Electron.js",
    "Micro-frontends",
    "Design Systems",
    "React Performance",
    "System Design",
    "StampMyVisa Biz",
    "Nucleus Architecture",
    "Next.js",
    "TypeScript",
    "B2B Applications",
    "Girish Sawant",
  ],
  openGraph: {
    title: "Engineering Case Studies | Girish Sawant",
    description:
      "Deep dive into real-world architectural challenges: Scaling teams, building Design Systems, and optimizing high-performance React applications.",
    type: "website",
  },
};

const ProjectLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <>{children}</>;
};

export default ProjectLayout;
