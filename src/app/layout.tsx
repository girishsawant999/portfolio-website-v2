import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
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
        className={`${inter.variable} ${dmSans.variable} antialiased px-10 pt-24 pb-12 grid grid-rows-[auto_1fr] min-h-screen gap-20 grid-cols-12`}
      >
        <SmoothScrollProvider>
          <header className="max-w-container mx-auto flex items-center justify-between col-span-full w-full">
            <div>
              <span className="font-dm-sans font-bold text-3xl">gs.</span>
            </div>
            <div className="flex items-center justify-end gap-8">
              <a href="#work" className="text-navigation">
                Work
              </a>
              <a href="#about" className="text-navigation">
                About
              </a>
              <a href="#projects" className="text-navigation">
                Projects
              </a>
              <a href="#contact" className="text-navigation">
                Contact
              </a>
              <a href="#resume" className="text-navigation">
                Resume
              </a>
            </div>
          </header>
          <main className="max-w-container mx-auto col-span-full w-full">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
