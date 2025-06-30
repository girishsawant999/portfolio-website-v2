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
  title: "Girish Sawant | Portfolio",
  description:
    "Portfolio of Girish Sawant, a Frontend Artist showcasing work, projects, and skills.",
  keywords: [
    "Girish Sawant",
    "Frontend Artist",
    "Portfolio",
    "Web Development",
    "UI/UX Design",
    "JavaScript",
    "React",
    "Next.js",
  ],
};

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
