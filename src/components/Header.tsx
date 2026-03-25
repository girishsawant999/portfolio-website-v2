"use client";

import { RESUME_LINK } from "@/constant";
import clsx from "clsx";
import gsap from "gsap";
import Link from "next/link";
import { forwardRef, useLayoutEffect, useRef } from "react";

const MENUS = [
  {
    title: "About",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Resume",
    href: RESUME_LINK,
    target: "_blank",
  },
];

const HeaderLink = forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    children: React.ReactNode;
    className?: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ href, children, className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={clsx(
        "navigation relative",
        "before:content-[''] before:text-inherit before:rounded-md before:h-px before:bottom-0.5 before:bg-current before:transition-[scale] before:ease-in  before:absolute before:left-0 before:origin-center before:right-0 before:scale-0",
        "hover:before:scale-100",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
});

HeaderLink.displayName = "HeaderLink";

const Header = () => {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    // Animate logo
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { duration: 0.8, opacity: 1, y: 0, ease: "power3.out" },
    );

    // Stagger animate menu items
    gsap.fromTo(
      navItemsRef.current,
      { opacity: 0, y: -20 },
      {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      },
    );
  }, []);

  return (
    <header className="flex items-center justify-between col-span-full w-full">
      <div>
        <Link
          ref={logoRef}
          href="/"
          className="font-dm-sans font-bold text-3xl opacity-0"
        >
          gs.
        </Link>
      </div>
      <div className="flex items-center justify-end gap-5 md:gap-8">
        {MENUS.map((nav, index) => (
          <HeaderLink
            ref={(el) => {
              if (el) navItemsRef.current[index] = el;
            }}
            key={nav.title}
            href={nav.href}
            target={nav.target}
            className="opacity-0"
          >
            {nav.title}
          </HeaderLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
