import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Projects by Girish Sawant | React & Frontend Engineering Portfolio",
  description:
    "Discover a curated collection of real-world projects by Girish Sawant, showcasing expertise in React, TypeScript, and performance-driven frontend architecture. Explore scalable UI solutions, B2B platforms, and creative web experiences.",
  keywords: [
    "Girish Sawant Projects",
    "Frontend Projects",
    "React Portfolio",
    "TypeScript Projects",
    "TailwindCSS",
    "Web Development",
    "B2B Web Applications",
    "Next.js Projects",
    "UI/UX Engineering",
    "Frontend Architecture",
    "Responsive Web Apps",
    "Creative Frontend Work",
    "Microfrontend Projects",
    "Scalable Web Interfaces",
  ],
};

const ProjectLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return children;
};

export default ProjectLayout;
