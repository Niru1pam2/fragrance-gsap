"use client";

import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "center" | "start" | "end";
};

export default function RevealText({
  field,
  id,
  align = "start",
  as: Component = "div",
  className,
  duration = 0.8,
  staggerAmount = 0.1,
}: RevealTextProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const words = asText(field).split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmount,
          duration,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    {
      scope: componentRef,
    },
  );

  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-right",
        align === "start" && "text-start",
      )}
      ref={componentRef}
    >
      {words.map((word, idx) => (
        <span key={`${word}-${idx}-${id}`} className="mb-0 overflow-hidden">
          <span className="reveal-text-word font-display mt-0 block max-w-xl translate-y-[120%] text-6xl leading-tight text-neutral-50 will-change-transform md:text-7xl lg:text-8xl">
            {word}
          </span>{" "}
        </span>
      ))}
    </Component>
  );
}
