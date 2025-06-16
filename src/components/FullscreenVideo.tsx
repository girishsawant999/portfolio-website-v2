"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FullscreenVideoProps {
  src: string;
  poster?: string;
}

export default function FullscreenVideo({ src, poster }: FullscreenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleClose = () => {
    setIsFullscreen(false);
    videoRef.current?.pause();
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
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.video
              ref={videoRef}
              className="w-fit h-[90vh] object-contain bg-black"
              autoPlay
              loop
              muted
              controls
              poster={poster}
              initial={{ scale: 0.7, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: -100 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
            <button
              className="absolute top-6 border-gray-800 border border-solid cursor-pointer  right-8 px-3 text-white text-xl z-50 flex items-center justify-center gap-1 bg-gray-800/70 rounded-full py-2 hover:bg-gray-700 transition-colors "
              onClick={handleClose}
              aria-label="Close fullscreen"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
