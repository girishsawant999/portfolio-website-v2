"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface FullscreenVideoProps {
  projectKey: string;
}

type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export default function FullscreenVideo({ projectKey }: FullscreenVideoProps) {
  const poster = `/projects/${projectKey}/image.png`;
  const previewSrc = `/projects/${projectKey}/video.mov`;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasLoadedVideo, setHasLoadedVideo] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !hasLoadedVideo) {
      return;
    }

    if (isActive) {
      const playPromise = videoElement.play();

      if (playPromise) {
        void playPromise.catch(() => {
          setIsVideoReady(false);
        });
      }
      return;
    }

    videoElement.pause();
  }, [hasLoadedVideo, isActive]);

  useGSAP(
    () => {
      const container = containerRef.current;

      if (!container) {
        return;
      }

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          setHasLoadedVideo(true);
          setIsActive(true);
        },
        onEnterBack: () => {
          setHasLoadedVideo(true);
          setIsActive(true);
        },
        onLeave: () => {
          setIsActive(false);
        },
        onLeaveBack: () => {
          setIsActive(false);
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: containerRef },
  );

  const showPoster = !isActive || !isVideoReady;

  const handleOpenFullscreen = () => {
    const videoElement = videoRef.current as FullscreenVideoElement | null;

    if (!videoElement) {
      return;
    }

    if (document.fullscreenElement !== videoElement && videoElement.requestFullscreen) {
      void videoElement.requestFullscreen().catch(() => {
        videoElement.webkitEnterFullscreen?.();
      });
      return;
    }

    videoElement.webkitEnterFullscreen?.();
  };

  return (
    <div
      ref={containerRef}
      className="group w-full aspect-video bg-[#606060] shadow-lg relative overflow-hidden"
    >
      {hasLoadedVideo && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={previewSrc}
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
          onCanPlay={() => setIsVideoReady(true)}
          onWaiting={() => setIsVideoReady(false)}
        />
      )}

      {hasLoadedVideo && isVideoReady && (
        <button
          type="button"
          onClick={handleOpenFullscreen}
          className="absolute right-3 top-3 z-20 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          aria-label="Open video in fullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3H5a2 2 0 0 0-2 2v3" />
            <path d="M16 3h3a2 2 0 0 1 2 2v3" />
            <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
            <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
          </svg>
          Fullscreen
        </button>
      )}

      {showPoster && (
        <Image
          src={poster}
          alt={`${projectKey} preview`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover pointer-events-none"
          priority={false}
        />
      )}
    </div>
  );
}
