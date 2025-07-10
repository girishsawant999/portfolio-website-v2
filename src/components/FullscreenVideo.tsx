"use client";

import Video from "next-video";
import { useRef } from "react";

interface FullscreenVideoProps {
  projectKey: string;
}

export default function FullscreenVideo({ projectKey }: FullscreenVideoProps) {
  const poster = `/projects/${projectKey}/image.png`;
  const previewSrc = `/projects/${projectKey}/video.mov`;

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="w-full aspect-[16/9] bg-[#606060] shadow-lg relative">
        <Video
          ref={videoRef}
          className="w-full h-full object-cover cursor-pointer"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
        >
          <source src={previewSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
      </div>
    </>
  );
}
