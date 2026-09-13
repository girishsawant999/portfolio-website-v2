"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

/**
 * Magnetic multi-circle cursor. Add `data-magnetic` to any element that
 * should pull the cursor (and itself) toward the pointer. Plain links and
 * buttons get the ring hover state but are not physically displaced.
 */
const HOVER_SELECTOR = "[data-magnetic], a, button";

const DOT_SIZE = 12;
const RING_SIZE = 40;
const DOT_HOVER_SIZE = 40;
// The dot is rendered at its largest size and scaled down, so the circle edge
// stays crisp instead of being blurrily upscaled on hover.
const DOT_REST_SCALE = DOT_SIZE / DOT_HOVER_SIZE;

const DOT_EASE = 0.35;
const SIZE_EASE = 0.2;
// Ring trails the pointer on a power3 curve rather than a constant lerp.
const RING_DURATION = 0.9;
const RING_EASE = "power3.out";

const RING_MAGNET_PULL = 0.35; // how far the ring is dragged toward the target center
const ELEMENT_PULL = 0.25; // how far the element itself is dragged toward the pointer
const ELEMENT_EASE = 0.15;
// Beyond this size an element is treated as a surface, not a magnet — otherwise
// the cursor snaps to the middle of large targets like cards or media blocks.
const MAGNET_MAX_SIZE = 220;
// Hard cap so the cursor never drifts further than this from the pointer.
const MAGNET_MAX_OFFSET = 28;

// How long after the last scroll event before the dot morphs back to a circle.
const SCROLL_IDLE_DELAY = 150;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Bail out entirely on coarse pointers (touch devices).
  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor-active");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // With reduced motion every lerp becomes a 1:1 snap — no trail, no easing.
    const dotEase = reduceMotion ? 1 : DOT_EASE;
    const sizeEase = reduceMotion ? 1 : SIZE_EASE;
    const elEase = reduceMotion ? 1 : ELEMENT_EASE;
    const ringDuration = reduceMotion ? 0 : RING_DURATION;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;

    gsap.set(ring, { x: mouseX, y: mouseY });
    const ringToX = gsap.quickTo(ring, "x", {
      duration: ringDuration,
      ease: RING_EASE,
    });
    const ringToY = gsap.quickTo(ring, "y", {
      duration: ringDuration,
      ease: RING_EASE,
    });

    let dotScale = DOT_REST_SCALE;
    let opacity = 0;
    let visible = false;
    let pressed = false;

    let hoverEl: HTMLElement | null = null;
    let hoverRect: DOMRect | null = null;
    let magnetic = false;
    let magnetEl: HTMLElement | null = null;
    let elX = 0;
    let elY = 0;

    let frame = 0;

    const lerp = (current: number, target: number, ease: number) =>
      current + (target - current) * ease;

    const round = (value: number) => Math.round(value * 100) / 100;

    const clamp = (value: number, limit: number) =>
      Math.max(-limit, Math.min(limit, value));

    const isMagnetSized = (rect: DOMRect) =>
      rect.width <= MAGNET_MAX_SIZE && rect.height <= MAGNET_MAX_SIZE;

    const render = () => {
      frame = requestAnimationFrame(render);

      let targetX = mouseX;
      let targetY = mouseY;

      if (magnetic && hoverRect) {
        const cx = hoverRect.left + hoverRect.width / 2;
        const cy = hoverRect.top + hoverRect.height / 2;
        // Partial pull toward the element center, still tracking the pointer.
        targetX = mouseX + clamp((cx - mouseX) * (1 - RING_MAGNET_PULL), MAGNET_MAX_OFFSET);
        targetY = mouseY + clamp((cy - mouseY) * (1 - RING_MAGNET_PULL), MAGNET_MAX_OFFSET);
      }

      // Both circles share one target so they settle concentrically once the
      // magnetic pull stops; only their easing differs.
      dotX = lerp(dotX, targetX, dotEase);
      dotY = lerp(dotY, targetY, dotEase);
      ringToX(round(targetX));
      ringToY(round(targetY));

      const targetDotScale = (hoverEl ? 1 : DOT_REST_SCALE) * (pressed ? 0.8 : 1);
      dotScale = lerp(dotScale, targetDotScale, sizeEase);
      opacity = lerp(opacity, visible ? 1 : 0, 0.2);

      dot.style.transform = `translate(${round(dotX)}px, ${round(dotY)}px) scale(${round(dotScale)})`;
      dot.style.opacity = `${round(opacity)}`;

      ring.style.opacity = `${round(opacity)}`;

      if (magnetEl) {
        const active = magnetEl === hoverEl && hoverRect;
        const targetX = active
          ? (mouseX - (hoverRect!.left + hoverRect!.width / 2)) * ELEMENT_PULL
          : 0;
        const targetY = active
          ? (mouseY - (hoverRect!.top + hoverRect!.height / 2)) * ELEMENT_PULL
          : 0;
        elX = lerp(elX, targetX, elEase);
        elY = lerp(elY, targetY, elEase);

        if (!active && Math.abs(elX) < 0.05 && Math.abs(elY) < 0.05) {
          magnetEl.style.transform = "";
          magnetEl.style.willChange = "";
          magnetEl = null;
          elX = 0;
          elY = 0;
        } else {
          magnetEl.style.transform = `translate(${round(elX)}px, ${round(elY)}px)`;
        }
      }
    };

    const handleMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) {
        visible = true;
        dotX = mouseX;
        dotY = mouseY;
        gsap.set(ring, { x: mouseX, y: mouseY });
      }
    };

    const releaseHover = () => {
      hoverEl = null;
      hoverRect = null;
      magnetic = false;
    };

    const handleOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        HOVER_SELECTOR,
      );
      if (!target || target === hoverEl) return;

      hoverEl = target;
      hoverRect = target.getBoundingClientRect();
      magnetic = isMagnetSized(hoverRect);

      if (magnetic && target.hasAttribute("data-magnetic")) {
        if (magnetEl && magnetEl !== target) {
          magnetEl.style.transform = "";
          magnetEl.style.willChange = "";
          elX = 0;
          elY = 0;
        }
        magnetEl = target;
        magnetEl.style.willChange = "transform";
      }
    };

    const handleOut = (event: MouseEvent) => {
      if (!hoverEl) return;
      const related = event.relatedTarget as Node | null;
      if (related && hoverEl.contains(related)) return;
      releaseHover();
    };

    // Rects go stale as the page scrolls or resizes under a hovered element.
    const syncRect = () => {
      if (!hoverEl) return;
      hoverRect = hoverEl.getBoundingClientRect();
      magnetic = isMagnetSized(hoverRect);
    };

    const handleDown = () => {
      pressed = true;
    };
    const handleUp = () => {
      pressed = false;
    };
    const handleLeaveWindow = () => {
      visible = false;
      releaseHover();
    };
    const handleEnterWindow = () => {
      visible = true;
    };

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      syncRect();
      document.documentElement.classList.add("custom-cursor-scrolling");
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove("custom-cursor-scrolling");
      }, SCROLL_IDLE_DELAY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", syncRect);
    document.addEventListener("mouseleave", handleLeaveWindow);
    document.addEventListener("mouseenter", handleEnterWindow);

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      gsap.killTweensOf(ring);
      document.documentElement.classList.remove("custom-cursor-active");
      document.documentElement.classList.remove("custom-cursor-scrolling");
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (magnetEl) {
        magnetEl.style.transform = "";
        magnetEl.style.willChange = "";
      }
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncRect);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      document.removeEventListener("mouseenter", handleEnterWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-difference">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border-white bg-transparent opacity-0 will-change-transform"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          marginLeft: -RING_SIZE / 2,
          marginTop: -RING_SIZE / 2,
          borderWidth: 1.5,
        }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 opacity-0 will-change-transform"
        style={{
          width: DOT_HOVER_SIZE,
          height: DOT_HOVER_SIZE,
          marginLeft: -DOT_HOVER_SIZE / 2,
          marginTop: -DOT_HOVER_SIZE / 2,
          transform: `scale(${DOT_REST_SCALE})`,
        }}
      >
        <svg
          width={DOT_HOVER_SIZE}
          height={DOT_HOVER_SIZE}
          viewBox="0 0 40 40"
          className="block"
        >
          <path
            className="cursor-dot-half cursor-dot-top"
            fill="white"
            d="M0,20 C0,8.954 8.954,0 20,0 C31.046,0 40,8.954 40,20 Z"
          />
          <path
            className="cursor-dot-half cursor-dot-bottom"
            fill="white"
            d="M0,20 C0,31.046 8.954,40 20,40 C31.046,40 40,31.046 40,20 Z"
          />
        </svg>
      </div>
    </div>
  );
}
