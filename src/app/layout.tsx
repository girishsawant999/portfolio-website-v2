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
        className={`${inter.variable} ${dmSans.variable} max-w-container mx-auto  antialiased px-10 pt-24 pb-12 grid grid-rows-[auto_1fr_auto] min-h-screen gap-20 grid-cols-12`}
      >
        <SmoothScrollProvider>
          <Header />
          <main className="col-span-full w-full">{children}</main>
          <footer className="flex items-center justify-between col-span-full w-full">
            <div className="flex items-center gap-4">
              <span className="navigation text-secondary">
                Girish Sawant ⏤ 2025
              </span>
            </div>
            <div className="flex items-center gap-8 justify-end">
              <Link
                href="https://www.npmjs.com/~girishsawant999"
                target="_blank"
                className="navigation "
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
                className="navigation "
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
