import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About | Girish Sawant",
  description:
    "Senior Frontend Engineer with 6+ years of experience architecting enterprise SaaS platforms, Electron desktop apps, and shared design systems.",
};

export default function AboutPage() {
  return <AboutContent />;
}
