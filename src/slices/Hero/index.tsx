import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <div className="absolute inset-0 scale-125">
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover opacity-50"
        />
      </div>

      <div className="relative flex h-screen flex-col justify-center">
        <div className="font-display max-w-xl text-6xl leading-tight text-neutral-50 md:text-7xl lg:text-8xl">
          <PrismicRichText field={slice.primary.heading} />
        </div>

        <div className="mt-6 max-w-md text-lg text-neutral-100">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <div className="mt-8">
          {slice.primary.button.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={clsx(
                "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
                link.variant === "Secondary"
                  ? "border border-white text-white hover:bg-white/20"
                  : "bg-white text-black hover:bg-white/80",
                "w-fit",
              )}
            />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
