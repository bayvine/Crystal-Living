"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { type MouseEvent, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_IMAGE_SHARE = 0.34;

const chapters = [
  {
    number: "",
    eyebrow: "My approach...",
    title: "My approach is simple.",
    accent: "The impact is life-changing.",
    description:
      "I combine market expertise with a people-first approach to help you feel confident, informed, and supported from the very first step to the day you get the keys.",
    image: "/uploads/approach/approach-home.webp",
    alt: "A home on a green lawn beneath mountain peaks",
    imagePosition: "center 68%",
    featured: true
  },
  {
    number: "(01)",
    accent: "",
    featured: false,
    eyebrow: "A clearer process",
    title: "Clarity at every step.",
    description:
      "You’ll always know what comes next, why it matters, and what your options are, without the jargon or last-minute surprises.",
    image: "/uploads/approach/approach-handshake.webp",
    alt: "Two people shaking hands after reaching an agreement",
    imagePosition: "center"
  },
  {
    number: "(02)",
    accent: "",
    featured: false,
    eyebrow: "Built around you",
    title: "A strategy shaped around your life.",
    description:
      "Your budget, timing, neighborhood, lifestyle, and future plans all matter. Together, we build a plan that fits the life you’re creating.",
    image: "/uploads/approach/approach-keys.webp",
    alt: "A hand holding keys beside an open front door",
    imagePosition: "center"
  },
  {
    number: "(03)",
    accent: "",
    featured: false,
    eyebrow: "Guidance without pressure",
    title: "Confident decisions, not pressure.",
    description:
      "From showings to offers to negotiations, I help you understand your options clearly so you can move forward with peace instead of panic.",
    image: "/uploads/approach/approach-decisions.webp",
    alt: "Two people reviewing information together at a table",
    imagePosition: "center"
  },
  {
    number: "(04)",
    accent: "",
    featured: false,
    eyebrow: "Here after the keys",
    title: "Support beyond the closing table.",
    description:
      "The goal isn’t just to get you into a house. It’s to help you step into a new chapter feeling grounded, prepared, and cared for.",
    image: "/uploads/approach/approach-support.webp",
    alt: "A professional advising clients across a table",
    imagePosition: "center"
  }
] as const;

const imagePositionClasses = {
  "center 68%": "object-[center_68%]",
  center: "object-center"
} as const;

const panelClasses = {
  featured: "w-full overflow-visible lg:h-full lg:w-[var(--site-width)] lg:flex-[0_0_var(--site-width)] lg:overflow-hidden",
  standard: "w-full overflow-visible lg:h-full lg:w-[calc(var(--approach-copy-width)+var(--approach-image-width))] lg:flex-[0_0_calc(var(--approach-copy-width)+var(--approach-image-width))] lg:overflow-hidden"
} as const;

export default function ApproachJourney() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;
    const trackElement = track.current;

    if (
      !sectionElement ||
      !trackElement ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-approach-panel]", trackElement);

      media.add("(min-width: 1024px)", () => {
        const snapOffsets = () =>
          panels.map((panel, index) =>
            index === 0
              ? 0
              : Math.max(0, panel.offsetLeft - sectionElement.clientWidth * DESKTOP_IMAGE_SHARE)
          );
        const scrollDistance = () => snapOffsets().at(-1) ?? 0;
        const snapProgresses = () => {
          const distance = Math.max(1, scrollDistance());

          return snapOffsets().map((offset) => offset / distance);
        };
        const firstPanel = panels[0];
        const firstReveal = firstPanel.querySelectorAll<HTMLElement>("[data-approach-reveal]");
        const firstMedia = firstPanel.querySelector<HTMLElement>("[data-approach-media]");

        const horizontalTween = gsap.to(trackElement, {
          x: () => -scrollDistance(),
          ease: "none",
          scrollTrigger: {
            id: "approach-horizontal",
            trigger: sectionElement,
            start: "top top",
            end: () => `+=${scrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: {
              snapTo: (value) => gsap.utils.snap(snapProgresses(), value),
              duration: { min: 0.22, max: 0.5 },
              delay: 0.02,
              ease: "power3.inOut",
              inertia: false
            },
            onUpdate: (self) => {
              if (progress.current) {
                gsap.set(progress.current, { scaleX: self.progress });
              }
            }
          }
        });

        gsap.from(firstReveal, {
          autoAlpha: 0,
          y: 34,
          duration: 0.78,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionElement,
            start: "top 76%",
            once: true
          }
        });

        if (firstMedia) {
          gsap.from(firstMedia, {
            autoAlpha: 0,
            clipPath: "inset(0 10% 0 0)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionElement,
              start: "top 76%",
              once: true
            }
          });
        }

        panels.slice(1).forEach((panel) => {
          const reveal = panel.querySelectorAll<HTMLElement>("[data-approach-reveal]");
          const panelMedia = panel.querySelector<HTMLElement>("[data-approach-media]");

          gsap.from(reveal, {
            autoAlpha: 0,
            x: 48,
            duration: 0.72,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween,
              start: "left 74%",
              once: true
            }
          });

          if (panelMedia) {
            gsap.from(panelMedia, {
              autoAlpha: 0,
              clipPath: "inset(0 12% 0 0)",
              duration: 0.9,
              ease: "power3.out",
            scrollTrigger: {
              trigger: panelMedia,
              containerAnimation: horizontalTween,
              start: "left 98%",
              once: true
            }
            });
          }
        });

        return () => horizontalTween.scrollTrigger?.kill();
      });

      media.add("(max-width: 1023px)", () => {
        panels.forEach((panel) => {
          const reveal = panel.querySelectorAll<HTMLElement>("[data-approach-reveal]");
          const panelMedia = panel.querySelector<HTMLElement>("[data-approach-media]");

          gsap.from(reveal, {
            autoAlpha: 0,
            y: 32,
            duration: 0.72,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 82%",
              once: true
            }
          });

          if (panelMedia) {
            gsap.from(panelMedia, {
              autoAlpha: 0,
              y: 36,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panelMedia,
                start: "top 88%",
                once: true
              }
            });
          }
        });
      });

    }, sectionElement);

    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  const handleProcessClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const horizontalTrigger = ScrollTrigger.getById("approach-horizontal");
    const trackElement = track.current;
    const sectionElement = section.current;

    if (!horizontalTrigger || !trackElement || !sectionElement) {
      return;
    }

    event.preventDefault();
    const panels = Array.from(
      trackElement.querySelectorAll<HTMLElement>("[data-approach-panel]")
    );
    const snapOffsets = panels.map((panel, index) =>
      index === 0
        ? 0
        : Math.max(0, panel.offsetLeft - sectionElement.clientWidth * DESKTOP_IMAGE_SHARE)
    );
    const finalOffset = snapOffsets.at(-1) ?? 0;
    const nextOffset = snapOffsets[1] ?? 0;
    const nextProgress = finalOffset > 0 ? nextOffset / finalOffset : 0;
    const nextChapter = horizontalTrigger.start +
      (horizontalTrigger.end - horizontalTrigger.start) * nextProgress;

    window.scrollTo({ top: nextChapter, behavior: "auto" });
  };

  return (
    <section ref={section} id="approach" className="relative h-auto overflow-visible bg-white [--approach-copy-width:min(58vw,71.775rem)] [--approach-image-width:min(34vw,42.075rem)] lg:h-[100svh] lg:overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible" aria-label="Our approach">
      <div ref={track} className="block h-auto w-full lg:flex lg:h-full lg:w-max lg:will-change-transform motion-reduce:block motion-reduce:h-auto motion-reduce:w-full motion-reduce:transform-none!">
        {chapters.map((chapter, index) => (
          <article
            id={`approach-chapter-${index + 1}`}
            className={panelClasses[chapter.featured ? "featured" : "standard"]}
            data-approach-panel
            key={chapter.title}
          >
            {chapter.featured ? (
              <div className="mx-auto flex h-auto w-[calc(100%-2.5rem)] flex-col justify-start gap-8 py-[clamp(2.75rem,6svh,3.25rem)] lg:grid lg:h-full lg:w-full lg:grid-cols-[minmax(0,0.95fr)_minmax(12rem,0.58fr)_var(--approach-image-width)] lg:items-center lg:gap-[clamp(2.5rem,5vw,5.5rem)] lg:py-[clamp(4.5rem,10vh,7rem)] lg:pr-0 lg:pl-[max(2rem,calc((var(--site-width)-86rem)/2))] motion-reduce:min-h-[100svh] motion-reduce:justify-center motion-reduce:py-[4.5rem]">
                <div>
                  <p className="text-[0.72rem] text-black/65" data-approach-reveal>
                    {chapter.eyebrow}
                  </p>
                  <h2 className="mt-[0.65rem] font-serif text-[clamp(2.75rem,12vw,3.5rem)] leading-[0.98] font-normal lg:text-[min(clamp(2.7rem,3.6vw,3.8rem),9.5vh)]" data-approach-reveal>
                    {chapter.title}
                    <em className="mt-[0.22em] block font-normal text-highlight-lavender">{chapter.accent}</em>
                  </h2>
                </div>

                <div className="self-stretch lg:self-center">
                  <p className="text-[clamp(0.8rem,1vw,0.94rem)] leading-[1.5]" data-approach-reveal>{chapter.description}</p>
                  <a
                    className="mt-7 inline-flex min-w-[9.5rem] items-center justify-between gap-4 border-b border-black pb-[0.45rem] text-[0.72rem] text-black uppercase lg:mt-[clamp(2rem,5vh,3.5rem)]"
                    href="#approach-chapter-2"
                    onClick={handleProcessClick}
                    data-approach-reveal
                  >
                    See the process
                    <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>

                <div className="relative order-2 -mx-5 aspect-[4/3.5] h-auto w-[calc(100%+2.5rem)] overflow-hidden bg-cream lg:order-none lg:mx-0 lg:aspect-auto lg:h-[min(68vh,42rem)] lg:w-full" data-approach-media>
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 40px), 46vw"
                    className={`object-cover ${imagePositionClasses[chapter.imagePosition]}`}
                  />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex h-auto w-[calc(100%-2.5rem)] flex-col justify-start gap-[clamp(5.5rem,12svh,6.5rem)] py-[clamp(2.75rem,6svh,3.25rem)] lg:grid lg:h-full lg:w-full lg:grid-cols-[var(--approach-copy-width)_var(--approach-image-width)] lg:items-center lg:gap-0 lg:py-[clamp(4.5rem,10vh,7rem)] motion-reduce:min-h-[100svh] motion-reduce:justify-center motion-reduce:py-[4.5rem]">
                <div className="mx-auto w-full lg:w-[min(70%,36rem)]">
                  <p className="mb-6 text-[0.72rem] text-lavender italic lg:mb-[clamp(2rem,6vh,4rem)]" data-approach-reveal>
                    {chapter.number}
                  </p>
                  <p className="mb-[0.65rem] text-[0.72rem] text-black/65" data-approach-reveal>
                    {chapter.eyebrow}
                  </p>
                  <h2 className="font-serif text-[clamp(2.75rem,12vw,3.5rem)] leading-none font-normal lg:text-[min(clamp(3rem,5vw,5rem),12vh)]" data-approach-reveal>{chapter.title}</h2>
                  <p className="mt-[clamp(1.4rem,4vh,2.5rem)] max-w-96 text-[clamp(0.8rem,1vw,0.94rem)] leading-[1.5]" data-approach-reveal>
                    {chapter.description}
                  </p>
                </div>

                <div className="relative order-2 -mx-5 aspect-[4/3.5] h-auto w-[calc(100%+2.5rem)] overflow-hidden bg-cream lg:order-none lg:mx-0 lg:aspect-auto lg:h-[min(68vh,42rem)] lg:w-full" data-approach-media>
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 40px), 38vw"
                    className={`object-cover ${imagePositionClasses[chapter.imagePosition]}`}
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="absolute right-8 bottom-6 left-8 z-[3] hidden h-px overflow-hidden bg-black/10 lg:block motion-reduce:hidden" aria-hidden="true">
        <span className="block h-full w-full origin-left scale-x-0 bg-lavender" ref={progress} />
      </div>
    </section>
  );
}
