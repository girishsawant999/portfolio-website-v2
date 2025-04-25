"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-between w-full gap-20">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-heading-1 mb-8"
          >
            Hi, I’m <br />
            Girish Sawant, a Frontend Artist
          </motion.h1>
          <p className="text-heading-2 text-gray">
            My work is mainly focused on crafting intuitive, high-performance
            frontends that merge design clarity with technical depth. I turn
            complex ideas into elegant interfaces—clean, scalable, and built to
            last.
          </p>
          <p className="text-heading-2 text-gray mt-4 opacity-20">
            Now, I’m working as a Frontend Tech Lead at StampMyVisa, where I
            lead frontend strategy, mentor developers, and craft user
            experiences.
          </p>
        </div>
        <div className="flex-1 justify-items-end relative">
          <div className="relative overflow-hidden">
            <motion.span
              initial={{ height: "500%" }}
              animate={{ height: "40%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-0 inset-x-0 [mask-image:linear-gradient(var(--background),#fff0)] [background:linear-gradient(var(--background),#fff0)] backdrop-blur-[2px]"
            ></motion.span>
            <Image
              src="/images/profile.jpeg"
              alt="Profile picture of Girish Sawant"
              width={421}
              height={590}
            />
            <motion.span
              initial={{ height: "500%" }}
              animate={{ height: "15%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute bottom-0 inset-x-0 [mask-image:linear-gradient(#fff0,var(--background))] [background:linear-gradient(#fff0,var(--background))] backdrop-blur-[2px]"
            ></motion.span>
          </div>
        </div>
      </div>
      <div className="w-[623px] h-[216px]">
        <p className="w-[401px]  text-lg text-left text-[#181717]">
          Organic and Polygonal Modeling, UV Layout, Texturing, Retopology,
          Ilustration, Sound Design
        </p>
        <p className="w-[124px] h-5 text-lg font-medium text-left text-[#181717]">
          Main Software{" "}
        </p>
        <p className="w-[124px] h-5 left-40 top-[1261px] text-lg font-medium text-left text-[#181717]">
          Main Skills
        </p>
        <p className="w-[436px] h-[54px]  text-lg text-left text-[#181717]">
          <span className="w-[436px] h-[54px] text-lg text-left text-[#181717]">
            Pixologic ZBrush, Autodesk Maya, The Foundry Mari, Arnold Renderer,
            Blender, Forger
          </span>
          <br />
          <br />
          <br />
        </p>
        <p className="   text-lg text-left text-[#181717]">
          Adobe CC, Figma, Ableton
        </p>
      </div>
    </>
  );
}
