"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentContainer from "@/components/ui/ContentContainer";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    eyebrow: "Maybe you’re feeling...",
    title: "Fatigue from",
    accent: "searching?",
    description: "Endless listings, open tabs, and not enough answers. It’s exhausting.",
    leftImage: "/uploads/story/search-fatigue.webp",
    leftAlt: "A home buyer feeling tired while searching on a laptop",
    rightImage: "/uploads/story/search-overload.webp",
    rightAlt: "A woman overwhelmed by work at her laptop",
    leftPlacement: "leftOne",
    rightPlacement: "rightOne"
  },
  {
    eyebrow: "Maybe you’re wondering....",
    title: "What about",
    accent: "new friends?",
    description:
      "Starting somewhere new can feel lonely. Will you find your people? Will it feel like home?",
    leftImage: "/uploads/story/moving-home.webp",
    leftAlt: "A woman unpacking boxes in a new home",
    rightImage: "/uploads/story/new-friends.webp",
    rightAlt: "Three friends smiling together",
    leftPlacement: "leftTwo",
    rightPlacement: "rightTwo"
  },
  {
    eyebrow: "Maybe you’re afraid....",
    title: "Is this the",
    accent: "right decision?",
    description: "It’s more than a purchase. It’s your future. The pressure to get it right is real.",
    leftImage: "/uploads/story/reviewing-details.webp",
    leftAlt: "A buyer reviewing documents beside a laptop",
    rightImage: "/uploads/story/signing-home.webp",
    rightAlt: "A couple signing documents together",
    leftPlacement: "leftThree",
    rightPlacement: "rightThree"
  }
] as const;

const photoPlacementClasses = {
  leftOne: "left-0 -translate-y-[46%] -rotate-[10deg]",
  rightOne: "right-0 -translate-y-[57%] rotate-[14deg]",
  leftTwo: "left-0 -translate-x-[4%] -translate-y-[54%] rotate-[15deg]",
  rightTwo: "right-0 translate-x-[3%] -translate-y-[46%] -rotate-[13deg]",
  leftThree: "left-0 translate-x-[4%] -translate-y-[44%] -rotate-[16deg]",
  rightThree: "right-0 -translate-x-[2%] -translate-y-[55%] rotate-[13deg]"
} as const;

const chapterStateClasses = {
  visible: "visible opacity-100",
  hidden: "invisible opacity-0"
} as const;

export default function ScrollStory() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;

    if (!sectionElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const chapterElements = gsap.utils.toArray<HTMLElement>(
        "[data-story-chapter]",
        sectionElement
      );
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          start: "top top",
          end: () => `+=${window.innerHeight * (chapters.length + 0.75)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      gsap.set(chapterElements, { autoAlpha: 0 });

      chapterElements.forEach((chapter, index) => {
        const copy = chapter.querySelectorAll<HTMLElement>("[data-story-copy]");
        const media = chapter.querySelectorAll<HTMLElement>("[data-story-media]");
        const label = `chapter-${index + 1}`;

        timeline
          .addLabel(label)
          .set(chapter, { autoAlpha: 1 })
          .fromTo(
            copy,
            { autoAlpha: 0, y: 54 },
            { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08, ease: "power3.out" },
            label
          )
          .fromTo(
            media,
            { autoAlpha: 0, y: 78, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out"
            },
            `${label}+=0.08`
          )
          .to({}, { duration: 0.72 });

        if (index < chapterElements.length - 1) {
          timeline
            .to([...copy, ...media], {
              autoAlpha: 0,
              y: -54,
              duration: 0.62,
              stagger: 0.035,
              ease: "power2.in"
            })
            .set(chapter, { autoAlpha: 0 });
        }
      });

      timeline.to({}, { duration: 0.9 });
    }, sectionElement);

    return () => context.revert();
  }, []);

  return (
    <section ref={section} id="work" className="relative h-[100svh] overflow-hidden bg-white motion-reduce:h-auto motion-reduce:overflow-visible" aria-label="Home buying concerns">
      <ContentContainer size="wide" className="relative h-full overflow-visible motion-reduce:h-auto">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.accent}
            className={`absolute inset-0 motion-reduce:relative motion-reduce:min-h-[100svh] motion-reduce:visible motion-reduce:opacity-100 ${chapterStateClasses[index === 0 ? "visible" : "hidden"]}`}
            data-story-chapter
          >
            <div className={`absolute top-1/2 z-[1] aspect-[4/4.6] w-[min(17vw,32vh,17rem)] max-sm:top-[70%] max-sm:w-[min(43vw,26vh)] ${photoPlacementClasses[chapter.leftPlacement]}`}>
              <div className="absolute inset-0 overflow-hidden rounded-xl bg-cream shadow-[0_0.85rem_1.8rem_rgb(51_51_51/12%)]" data-story-media>
                <Image
                  src={chapter.leftImage}
                  alt={chapter.leftAlt}
                  fill
                  sizes="(max-width: 639px) 44vw, 24vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 z-[2] w-[min(34vw,33rem)] -translate-x-1/2 -translate-y-1/2 text-center max-sm:top-[36%] max-sm:w-[calc(100%-2rem)]">
              <p className="mb-[clamp(0.65rem,1.5vh,1.1rem)] text-[clamp(0.72rem,1vw,0.9rem)] leading-[1.35] text-black/70 max-sm:mb-[0.6rem] max-sm:text-[0.72rem]" data-story-copy>
                {chapter.eyebrow}
              </p>
              <h2 className="font-serif text-[min(clamp(2.75rem,4.7vw,4.8rem),10.5vh)] leading-[0.98] font-normal text-black max-sm:text-[min(12vw,3.25rem,7.4vh)]" data-story-copy>
                <span className="block">{chapter.title}</span>
                <em className="mt-[0.18em] block font-normal whitespace-nowrap text-highlight-lavender">{chapter.accent}</em>
              </h2>
              <p className="mx-auto mt-[clamp(1.2rem,3.2vh,2.2rem)] w-[min(100%,22rem)] text-[clamp(0.76rem,0.95vw,0.92rem)] leading-[1.45] text-black max-sm:mt-[clamp(1rem,3vh,1.5rem)] max-sm:w-[min(88%,22rem)] max-sm:text-[0.78rem]" data-story-copy>
                {chapter.description}
              </p>
            </div>

            <div className={`absolute top-1/2 z-[1] aspect-[4/4.6] w-[min(17vw,32vh,17rem)] max-sm:top-[70%] max-sm:w-[min(43vw,26vh)] ${photoPlacementClasses[chapter.rightPlacement]}`}>
              <div className="absolute inset-0 overflow-hidden rounded-xl bg-cream shadow-[0_0.85rem_1.8rem_rgb(51_51_51/12%)]" data-story-media>
                <Image
                  src={chapter.rightImage}
                  alt={chapter.rightAlt}
                  fill
                  sizes="(max-width: 639px) 44vw, 24vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        ))}

        <div className="absolute bottom-[clamp(1rem,5vh,3rem)] left-1/2 z-4 grid -translate-x-1/2 justify-items-center gap-[0.22rem] max-sm:bottom-[max(0.75rem,2.5svh)] motion-reduce:hidden" aria-hidden="true">
          <span className="relative block h-[1.18rem] w-[0.72rem] animate-[story-mouse-pulse_2.4s_ease-in-out_infinite] rounded-lg border border-black">
            <span className="absolute top-[0.2rem] left-1/2 h-1 w-px -translate-x-1/2 animate-[story-wheel-travel_2.4s_ease-in-out_infinite] bg-black" />
          </span>
          <span className="h-[0.4rem] w-[0.4rem] rotate-45 animate-[story-chevron-dip_2.4s_ease-in-out_infinite] border-r border-b border-black" />
        </div>
      </ContentContainer>
    </section>
  );
}
