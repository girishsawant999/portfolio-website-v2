"use client";

import { RESUME_LINK } from "@/constant";
import ProgressiveBlur from "@/components/ui/ProgressiveBlur";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { forwardRef, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const MENUS = [
  {
    title: "About",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "Contact",
    href: "/#contact",
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
      className={clsx("navigation relative", className)}
      {...props}
    >
      {children}
    </Link>
  );
});

HeaderLink.displayName = "HeaderLink";

const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Hide the header on downward scroll, reveal it again as soon as the user
  // scrolls back up — it then sits above (in place of) any sticky section title.
  useGSAP(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const showHeader = () =>
      gsap.to(headerEl, { yPercent: 0, duration: 0.4, ease: "power2.out" });
    const hideHeader = () =>
      gsap.to(headerEl, { yPercent: -100, duration: 0.4, ease: "power2.out" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > headerEl.offsetHeight) {
          hideHeader();
        } else {
          showHeader();
        }
      },
    });

    return () => trigger.kill();
  }, []);

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
    <header
      ref={headerRef}
      className="sticky top-0 z-50 flex items-center justify-between col-span-full w-[calc(100%+2.5rem)] py-4 -mx-5 px-5 md:w-[calc(100%+5rem)] md:-mx-10 md:px-10"
    >
      <ProgressiveBlur />
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
