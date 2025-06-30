"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

interface FullscreenVideoProps {
  src: string;
  poster?: string;
}

export default function FullscreenVideo({ src, poster }: FullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFullscreen = () => {
    setShowOverlay(true);
    setTimeout(() => {
      setIsFullscreen(true);
      setIsAnimating(true);
    }, 10); // allow overlay to mount
  };

  const handleClose = () => {
    if (overlayRef.current) {
      setIsAnimating(true);
      // Animate both background and video
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          setIsFullscreen(false);
          setShowOverlay(false);
          setIsAnimating(false);
          videoRef.current?.pause();
        },
      });
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.35,
        },
        0
      ).to(
        overlayRef.current.querySelector("video"),
        {
          scale: 0.92,
          y: 80,
          filter: "blur(6px)",
          duration: 0.35,
        },
        0
      );
    } else {
      setIsFullscreen(false);
      setShowOverlay(false);
      setIsAnimating(false);
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        event.preventDefault();
        event.stopPropagation();
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFullscreen]);

  // Animate overlay in when isFullscreen becomes true
  useGSAP(() => {
    if (isFullscreen && overlayRef.current) {
      setIsAnimating(true);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIsAnimating(false),
      });
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.28 },
        0
      ).fromTo(
        overlayRef.current.querySelector("video"),
        { scale: 0.92, y: 80, filter: "blur(6px)" },
        { scale: 1, y: 0, filter: "blur(0px)", duration: 0.38 },
        0.05
      );
    }
  }, [isFullscreen]);

  return (
    <>
      <div className="w-full aspect-[16/9] bg-[#606060] shadow-lg relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover cursor-pointer"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          onClick={handleFullscreen}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs z-10"
          onClick={handleFullscreen}
        >
          Fullscreen
        </button>
      </div>
      {/* Fullscreen overlay with improved GSAP animation */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="full-screen-video fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          style={{
            opacity: isFullscreen ? 1 : 0,
            pointerEvents: isAnimating || isFullscreen ? "auto" : "none",
            transition: "opacity 0.2s",
          }}
        >
          <video
            className="w-fit object-contain shadow-2xl rounded-lg"
            autoPlay
            loop
            muted
            controls
            poster={poster}
            style={{
              background: "#222",
              maxHeight: "80vh",
              maxWidth: "90vw",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            }}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            className="absolute top-6 border-gray-800 border border-solid cursor-pointer right-8 px-3 text-white text-xl z-50 flex items-center justify-center gap-1 bg-gray-800/70 rounded-full py-2 hover:bg-gray-700 transition-colors "
            onClick={handleClose}
            aria-label="Close fullscreen"
            disabled={isAnimating}
            style={{ opacity: isAnimating ? 0.6 : 1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
