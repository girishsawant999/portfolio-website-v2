import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

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

    // Cleanup function
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return lenisRef;
}
