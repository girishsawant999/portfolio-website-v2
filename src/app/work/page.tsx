import type { Metadata } from "next";
import WorkListContent from "./WorkListContent";

export const metadata: Metadata = {
  title: "Work | Girish Sawant",
  description:
    "Case studies across enterprise SaaS platforms, Electron desktop apps, design systems, and side projects built by Girish Sawant.",
};

export default function WorkPage() {
  return <WorkListContent />;
}
