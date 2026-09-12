"use client";

import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const SCROLL_POSITIONS_KEY = "scroll-positions";

function getStoredPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function storePosition(key: string, y: number) {
  const positions = getStoredPositions();
  positions[key] = y;
  sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  // True only when the current navigation was triggered by the browser's
  // native back/forward buttons (popstate), as opposed to a link click/push.
  const isPopNavigation = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Take over scroll restoration so browser back/forward doesn't fight Lenis
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      isPopNavigation.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    // Create a function to handle RAF animation
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation
    requestAnimationFrame(raf);

    // Continuously persist scroll position per route so native back/forward
    // navigation can restore it later.
    const handleScroll = ({ scroll }: { scroll: number }) => {
      storePosition(window.location.pathname, scroll);
    };
    lenisRef.current.on("scroll", handleScroll);

    // Cleanup function
    return () => {
      lenisRef.current?.off("scroll", handleScroll);
      lenisRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // Skip on initial mount, the page already starts at the right position
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isPopNavigation.current) {
      const savedY = getStoredPositions()[pathname] ?? 0;
      lenisRef.current?.scrollTo(savedY, { immediate: true });
    } else {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }

    isPopNavigation.current = false;
  }, [pathname]);

  return <>{children}</>;
}
