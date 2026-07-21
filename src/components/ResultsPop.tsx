"use client";

import Image from "next/image";
import { Asterisk, House } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentContainer from "@/components/ui/ContentContainer";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    placement: "flowers",
    src: "/uploads/results/lavender-still-life.webp",
    alt: "Lavender flowers arranged on a sunlit table",
    direction: "left"
  },
  {
    placement: "chair",
    src: "/uploads/results/sunlit-chair.webp",
    alt: "A chair and table warmed by afternoon sunlight",
    direction: "right"
  },
  {
    placement: "couple",
    src: "/uploads/results/new-home-couple.webp",
    alt: "A couple celebrating with the keys to their new home",
    direction: "bottom"
  },
  {
    placement: "bedroom",
    src: "/uploads/results/calm-bedroom.webp",
    alt: "A calm bedroom prepared for a new beginning",
    direction: "bottom"
  }
] as const;

const benefits = [
  {
    title: "Clarity",
    description: "You’ll feel informed, prepared, and confident in your decisions."
  },
  {
    title: "Peace of mind",
    description: "A seamless experience built on trust, transparency, and expert guidance."
  },
  {
    title: "Strong support",
    description: "A dedicated partner in your corner, advocating for what matters most."
  },
  {
    title: "A place to belong",
    description: "More than a house. A community and a lifestyle that fit."
  }
];

const revealStates = {
  left: { clipPath: "inset(0 100% 0 0)", x: -42, y: 0 },
  right: { clipPath: "inset(0 0 0 100%)", x: 42, y: 0 },
  bottom: { clipPath: "inset(100% 0 0 0)", x: 0, y: 42 }
} as const;

const imagePlacementClasses = {
  flowers: "top-[10%] left-0 h-[clamp(18rem,42vh,22rem)] w-[clamp(17rem,24vw,24rem)] [&_img]:object-[center_42%]",
  chair: "top-0 right-0 h-[clamp(22rem,58vh,31rem)] w-[clamp(15rem,24vw,23rem)] [&_img]:object-[center_54%]",
  couple: "bottom-0 left-[4%] h-[clamp(19rem,45vh,24rem)] w-[clamp(14rem,18vw,18rem)] [&_img]:object-[53%_center]",
  bedroom: "right-[3%] -bottom-10 h-[clamp(18rem,40vh,22rem)] w-[clamp(12rem,14vw,15rem)] rounded-t-[9rem] [&_img]:object-[42%_center]"
} as const;

const benefitBorderClasses = [
  "",
  "lg:before:absolute lg:before:top-9 lg:before:bottom-0 lg:before:left-0 lg:before:w-px lg:before:bg-lavender/15 lg:before:content-[''] max-lg:border-l max-lg:border-lavender/15 max-sm:border-t max-sm:border-l-0",
  "lg:before:absolute lg:before:top-9 lg:before:bottom-0 lg:before:left-0 lg:before:w-px lg:before:bg-lavender/15 lg:before:content-[''] max-lg:border-t max-lg:border-t-lavender/15",
  "lg:before:absolute lg:before:top-9 lg:before:bottom-0 lg:before:left-0 lg:before:w-px lg:before:bg-lavender/15 lg:before:content-[''] max-lg:border-t max-lg:border-l max-lg:border-lavender/15 max-lg:border-t-lavender/15 max-sm:border-l-0"
] as const;

function MaskedText({ text }: { text: string }) {
  return (
    <span className="flex flex-wrap justify-center" aria-hidden="true">
      {text.split(" ").map((word, wordIndex, words) => (
        <span className="inline-flex whitespace-nowrap" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((character, characterIndex) => (
            <span className="inline-block overflow-visible" key={`${character}-${characterIndex}`}>
              <span className="inline-block will-change-transform" data-results-character>{character}</span>
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}

export default function ResultsPop() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;

    if (!sectionElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const characters = gsap.utils.toArray<HTMLElement>(
        "[data-results-character]",
        sectionElement
      );
      const headingLines = gsap.utils.toArray<HTMLElement>(
        "[data-results-line]",
        sectionElement
      );
      const imageWindows = gsap.utils.toArray<HTMLElement>(
        "[data-results-image-window]",
        sectionElement
      );
      const imageLayers = gsap.utils.toArray<HTMLElement>(
        "[data-results-parallax]",
        sectionElement
      );
      const benefitItems = gsap.utils.toArray<HTMLElement>(
        "[data-results-benefit]",
        sectionElement
      );

      gsap.set(headingLines, { overflow: "hidden" });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 72%",
          once: true
        }
      });

      timeline
        .from(imageWindows, {
          autoAlpha: 0,
          clipPath: (_, target) => {
            const direction = target.dataset.direction as keyof typeof revealStates;
            return revealStates[direction].clipPath;
          },
          x: (_, target) => {
            const direction = target.dataset.direction as keyof typeof revealStates;
            return revealStates[direction].x;
          },
          y: (_, target) => {
            const direction = target.dataset.direction as keyof typeof revealStates;
            return revealStates[direction].y;
          },
          duration: 1.05,
          stagger: 0.1,
          clearProps: "transform,opacity,visibility,clipPath"
        })
        .from(
          "[data-results-label]",
          { autoAlpha: 0, y: 18, duration: 0.58, clearProps: "transform,opacity,visibility" },
          0.16
        )
        .from(
          characters,
          {
            yPercent: 115,
            duration: 0.72,
            stagger: 0.018,
            clearProps: "transform",
            onComplete: () => gsap.set(headingLines, { overflow: "visible" })
          },
          0.24
        )
        .from(
          "[data-results-description]",
          { autoAlpha: 0, y: 24, duration: 0.68, clearProps: "transform,opacity,visibility" },
          0.58
        )
        .from(
          "[data-results-mark]",
          {
            autoAlpha: 0,
            scale: 0.55,
            rotate: -35,
            duration: 0.62,
            clearProps: "transform,opacity,visibility"
          },
          0.68
        )
        .from(
          benefitItems,
          {
            autoAlpha: 0,
            y: 24,
            duration: 0.62,
            stagger: 0.08,
            clearProps: "transform,opacity,visibility"
          },
          0.78
        );

      imageLayers.forEach((image, index) => {
        const travel = index % 2 === 0 ? 11 : -11;

        gsap.fromTo(
          image,
          { yPercent: -travel },
          {
            yPercent: travel,
            ease: "none",
            scrollTrigger: {
              trigger: sectionElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9
            }
          }
        );
      });
    }, sectionElement);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={section}
      id="results"
      className="relative min-h-[max(100svh,44rem)] overflow-hidden bg-cream max-lg:min-h-0"
      aria-labelledby="results-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('/patterns/pattern-bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.42]" aria-hidden="true" />
      <div className="relative min-h-[max(100svh,44rem)] max-lg:flex max-lg:min-h-0 max-lg:flex-col max-lg:pt-[4.5rem]">
        <ContentContainer size="wide" className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 max-lg:relative max-lg:inset-auto max-lg:order-2 max-lg:mt-14 max-lg:grid max-lg:grid-cols-2 max-lg:gap-3 max-lg:transform-none">
          {images.map((image) => (
            <figure
              className={`absolute z-[1] m-0 overflow-hidden bg-white max-lg:relative max-lg:inset-auto max-lg:aspect-[4/5] max-lg:h-auto max-lg:w-full ${imagePlacementClasses[image.placement]}`}
              data-direction={image.direction}
              data-results-image-window
              key={image.src}
            >
              <div className="absolute -inset-y-[14%] inset-x-0 will-change-transform" data-results-parallax>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1023px) 50vw, 26vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </ContentContainer>

        <div className="relative z-[2] mx-auto w-[min(56vw,42rem)] pt-[clamp(5rem,12vh,7.5rem)] text-center max-lg:order-1 max-lg:w-[calc(100%-2.5rem)] max-lg:pt-0">
          <div className="grid justify-items-center gap-[0.65rem] text-lavender" data-results-label>
            <p className="text-[0.7rem] uppercase">The results?</p>
            <span className="h-[1.4rem] w-px bg-lavender" aria-hidden="true" />
          </div>

          <h2 id="results-title" className="mt-[1.15rem] font-serif leading-[0.9] font-normal max-sm:leading-[0.94]" aria-label="Confidence in every step.">
            <span className="flex justify-center overflow-visible px-[0.08em] pt-[0.2em] pb-[0.16em] text-[clamp(4.5rem,13vh,6.75rem)] leading-[1.04] text-highlight-lavender italic max-lg:text-[clamp(3.35rem,8.5vh,4.5rem)] max-sm:text-[3.5rem]" data-results-line>
              <MaskedText text="Confidence" />
            </span>
            <span className="-mt-[0.26em] flex justify-center overflow-visible px-[0.08em] pt-[0.2em] pb-[0.16em] text-[clamp(2.65rem,7.8vh,4rem)] max-lg:text-[clamp(2.5rem,7vh,3.5rem)] max-sm:text-[2.45rem]" data-results-line>
              <MaskedText text="in every step." />
            </span>
          </h2>

          <p className="mx-auto mt-4 w-[min(100%,20rem)] text-[0.82rem] leading-[1.45] max-sm:w-[min(100%,18rem)]" data-results-description>
            Buying your first home is more than a milestone; it’s the beginning of everything
            that’s yours.
          </p>

          <span className="mt-[clamp(1.6rem,4vh,2.6rem)] inline-flex text-highlight-lavender" data-results-mark aria-hidden="true">
            <Asterisk size={44} strokeWidth={1.5} />
          </span>
        </div>

        <ContentContainer className="absolute right-0 bottom-[clamp(5.5rem,15vh,7rem)] left-0 z-[3] grid grid-cols-4 max-lg:relative max-lg:inset-auto max-lg:order-3 max-lg:mt-14 max-lg:grid-cols-2 max-lg:pb-[4.5rem] max-sm:grid-cols-1" aria-label="The results of the Crystal Living process">
          {benefits.map((benefit, index) => (
            <article className={`relative min-w-0 px-[0.85rem] pt-[1.15rem] text-center max-lg:p-6 ${benefitBorderClasses[index]}`} data-results-benefit key={benefit.title}>
              <House className="mx-auto block text-lavender" size={22} strokeWidth={1.45} aria-hidden="true" />
              <h3 className="mt-[0.45rem] font-sans text-[0.72rem] font-medium text-lavender uppercase">{benefit.title}</h3>
              <p className="mx-auto mt-2 text-[0.66rem] leading-[1.38]">{benefit.description}</p>
            </article>
          ))}
        </ContentContainer>
      </div>
    </section>
  );
}
