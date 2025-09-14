"use client";

import { useGSAP } from "@gsap/react";
import { FC, useRef } from "react";
import { SliceComponentProps } from "@prismicio/react";
import { asText, Content } from "@prismicio/client";
import gsap from "gsap";
import { Bounded } from "@/components/Bounded";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type ScrollTextProps = SliceComponentProps<Content.ScrollTextSlice>;

const ScrollText: FC<ScrollTextProps> = ({ slice }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = asText(slice.primary.text).split(" ");

  useGSAP(
    () => {
      const component = componentRef.current;
      const textElement = textRef.current;
      const contentElement = contentRef.current;
      const letters = textElement?.querySelectorAll("span");

      if (!component || !textElement || !letters || !contentElement) return;

      gsap.set(contentElement, {
        filter: "blur(40px)",
      });
      gsap.set(letters, { color: "hsl(220, 9%, 20%)" });

      gsap.to(contentElement, {
        filter: "blur(0px)",
        duration: 1,
        scrollTrigger: {
          trigger: component,
          start: "top 75%",
          end: "top top",
          scrub: 2,
        },
      });

      const colorT1 = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: "top top",
          end: "bottom -100%",
          pin: true,
          scrub: 2,
        },
      });

      colorT1.to(letters, {
        color: "white",
        stagger: {
          each: 0.01,
          from: "start",
          ease: "power1.inOut",
        },
      });

      colorT1.to(
        ".glow-background",
        {
          opacity: 1,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      );
    },
    {
      scope: componentRef,
    },
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      ref={componentRef}
      data-slice-variation={slice.variation}
      className="relative flex h-screen items-center justify-center bg-neutral-950"
    >
      <div className="glow-background absolute inset-0 z-0 h-full w-full opacity-0"></div>

      <div className="absolute inset-0 bg-[url('noisetexture.jpg)] opacity-30 mix-blend-multiply"></div>

      <div ref={contentRef}>
        <div className="mb-2 text-center text-sm tracking-wider text-neutral-200 uppercase md:mb-8 md:text-base">
          {slice.primary.eyebrow}
        </div>

        {/* paragramph */}
        <div className="text-center" ref={textRef}>
          <p className="font-display flex flex-wrap justify-center text-5xl leading-tight text-balance uppercase md:text-7xl">
            {words.map((word, idx) => (
              <span key={`${word}-${idx}`} className="inline">
                {word.split("").map((char, charIdx) => (
                  <span key={`${char}-${charIdx}`} className="inline">
                    {char}
                  </span>
                ))}

                {idx < words.length - 1 ? <span>&nbsp;</span> : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </Bounded>
  );
};

export default ScrollText;
