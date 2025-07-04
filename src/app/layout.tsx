import Header from "@/components/Header";
import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import Link from "next/link";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"], // Regular (400) and Medium (500)
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"], // Regular (400) and Medium (500)
});

// ...existing code...
export const metadata: Metadata = {
  title:
    "Girish Sawant - Portfolio | Frontend Tech Lead Building Scalable React Apps | Web developer",
  description:
    "Experienced Frontend Developer skilled in React, TypeScript, and TailwindCSS. Explore resume, skills, and projects focused on scalable UI development.",
  keywords: [
    "Frontend Developer Resume",
    "Developer Portfolio",
    "Frontend Tech Lead",
    "React Developer",
    "TypeScript Developer",
    "TailwindCSS",
    "JavaScript Developer",
    "Responsive Web Design",
    "Web Developer Portfolio",
    "UI/UX Developer",
    "Frontend Architecture",
    "Creative Developer",
    "Next.js",
    "Scalable Web Applications",
    "Frontend Projects",
    "Modern Web Development",
    "Technical Skills",
    "Developer Experience",
    "Developer Case Studies",
    "Code Quality",
    "Girish Sawant",
  ],
  openGraph: {
    title: "Girish Sawant - Portfolio",
    description:
      "Experienced Frontend Developer skilled in React, TypeScript, and TailwindCSS. Explore resume, skills, and projects focused on scalable UI development.",
    url: "https://girishsawant.vercel.app",
    siteName: "Girish Sawant Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.svg",
        width: 72,
        height: 72,
        alt: "Girish Sawant Portfolio Preview",
      },
      {
        url: "/images/profile.jpeg",
        width: 512,
        height: 512,
        alt: "Girish Sawant Profile Photo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Girish Sawant - Portfolio",
    description:
      "Experienced Frontend Developer skilled in React, TypeScript, and TailwindCSS. Explore resume, skills, and projects focused on scalable UI development.",
    site: "@girishsawant999",
    creator: "@girishsawant999",
    images: ["/images/profile.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/images/logo.svg",
      },
    ],
  },
  metadataBase: new URL("https://girishsawant.vercel.app"),
};
//

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased min-h-dvh max-w-container mx-auto flex flex-col w-screen overflow-x-hidden px-5 md:px-10 py-6 gap-10 md:gap-20  md:py-12`}
      >
        <SmoothScrollProvider>
          <Header />
          <main className="w-full flex-1">{children}</main>
          <footer className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0 pt-8 border-t border-neutral-200 dark:border-neutral-800 mt-8">
            <div className="flex items-center gap-4">
              <span className="navigation text-secondary">
                Girish Sawant ⏤ 2025
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-end">
              <Link
                href="https://www.npmjs.com/~girishsawant999"
                target="_blank"
                className="navigation"
              >
                Npm
              </Link>
              <Link
                href="https://dev.to/girishsawant999"
                target="_blank"
                className="navigation"
              >
                Dev.to
              </Link>
              <Link
                href="https://cssbattle.dev/player/girish_sawant"
                target="_blank"
                className="navigation"
              >
                CSS Battle
              </Link>
              <Link
                href="https://in.linkedin.com/in/girishsawant999"
                target="_blank"
                className="navigation"
              >
                LinkedIn
              </Link>
              <Link
                href="https://github.com/girishsawant999"
                target="_blank"
                className="navigation"
              >
                Github
              </Link>
            </div>
          </footer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
