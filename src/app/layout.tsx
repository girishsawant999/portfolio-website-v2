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

export const metadata: Metadata = {
  // CHANGED: From "React Developer" to "Architect" & "Lead"
  title: "Girish Sawant | Senior Frontend Architect & Tech Lead",
  description:
    "Senior Frontend Engineer with 6+ years of experience scaling engineering teams and architecting enterprise-grade applications. Expert in React, Micro-frontends, Electron, and Performance Optimization.",
  keywords: [
    "Senior Frontend Engineer",
    "Frontend Architect",
    "Tech Lead",
    "Micro-frontends", // High value keyword
    "System Design",
    "Electron.js",
    "React Performance",
    "TypeScript",
    "CI/CD Pipelines",
    "Team Leadership",
    "SaaS Architecture",
    "Next.js",
    "Girish Sawant",
  ],
  openGraph: {
    title: "Girish Sawant | Senior Frontend Architect",
    description:
      "Scaling teams and building high-performance architectures. View my case studies on Micro-frontends, Electron, and Enterprise SaaS.",
    url: "https://girishsawant.vercel.app",
    siteName: "Girish Sawant Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Girish Sawant - Senior Frontend Architect & Tech Lead",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Girish Sawant | Senior Frontend Architect",
    description:
      "Scaling teams and building high-performance architectures. View my case studies on Micro-frontends, Electron, and Enterprise SaaS.",
    site: "@girishsawant999",
    creator: "@girishsawant999",
    images: ["/images/og-cover.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased min-h-dvh max-w-container mx-auto flex flex-col w-screen overflow-x-hidden px-5 md:px-10 py-6 gap-10 md:gap-20 md:py-12`}
      >
        <SmoothScrollProvider>
          <Header />
          <main className="w-full flex-1">{children}</main>
          <footer className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-0 pt-8 border-t border-neutral-200 dark:border-neutral-800 mt-8">
            <div className="flex items-center gap-4">
              <span className="navigation text-secondary">
                © {new Date().getFullYear()} Girish Sawant. All rights reserved.
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-end">
              <Link
                href="https://www.npmjs.com/~girishsawant999"
                target="_blank"
                className="navigation hover:text-foreground transition-colors"
              >
                NPM
              </Link>
              <Link
                href="https://github.com/girishsawant999"
                target="_blank"
                className="navigation hover:text-foreground transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="https://in.linkedin.com/in/girishsawant999"
                target="_blank"
                className="navigation hover:text-foreground transition-colors"
              >
                LinkedIn
              </Link>
              {/* Removed CSS Battle. Keep Dev.to only if you have technical articles there. */}
              <Link
                href="https://dev.to/girishsawant999"
                target="_blank"
                className="navigation hover:text-foreground transition-colors"
              >
                Articles
              </Link>
            </div>
          </footer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
