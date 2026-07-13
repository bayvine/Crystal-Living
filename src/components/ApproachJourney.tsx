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
    number: "01",
    eyebrow: "A clearer process",
    title: "Clarity at every step.",
    description:
      "You’ll always know what comes next, why it matters, and what your options are, without the jargon or last-minute surprises.",
    image: "/uploads/approach/approach-handshake.webp",
    alt: "Two people shaking hands after reaching an agreement",
    imagePosition: "center"
  },
  {
    number: "02",
    eyebrow: "Built around you",
    title: "A strategy shaped around your life.",
    description:
      "Your budget, timing, neighborhood, lifestyle, and future plans all matter. Together, we build a plan that fits the life you’re creating.",
    image: "/uploads/approach/approach-keys.webp",
    alt: "A hand holding keys beside an open front door",
    imagePosition: "center"
  },
  {
    number: "03",
    eyebrow: "Guidance without pressure",
    title: "Confident decisions, not pressure.",
    description:
      "From showings to offers to negotiations, I help you understand your options clearly so you can move forward with peace instead of panic.",
    image: "/uploads/approach/approach-decisions.webp",
    alt: "Two people reviewing information together at a table",
    imagePosition: "center"
  },
  {
    number: "04",
    eyebrow: "Here after the keys",
    title: "Support beyond the closing table.",
    description:
      "The goal isn’t just to get you into a house. It’s to help you step into a new chapter feeling grounded, prepared, and cared for.",
    image: "/uploads/approach/approach-support.webp",
    alt: "A professional advising clients across a table",
    imagePosition: "center"
  }
];

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
              : Math.max(0, panel.offsetLeft - window.innerWidth * DESKTOP_IMAGE_SHARE)
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

    if (!horizontalTrigger || !trackElement) {
      return;
    }

    event.preventDefault();
    const panels = Array.from(
      trackElement.querySelectorAll<HTMLElement>("[data-approach-panel]")
    );
    const snapOffsets = panels.map((panel, index) =>
      index === 0
        ? 0
        : Math.max(0, panel.offsetLeft - window.innerWidth * DESKTOP_IMAGE_SHARE)
    );
    const finalOffset = snapOffsets.at(-1) ?? 0;
    const nextOffset = snapOffsets[1] ?? 0;
    const nextProgress = finalOffset > 0 ? nextOffset / finalOffset : 0;
    const nextChapter = horizontalTrigger.start +
      (horizontalTrigger.end - horizontalTrigger.start) * nextProgress;

    window.scrollTo({ top: nextChapter, behavior: "auto" });
  };

  return (
    <section ref={section} id="approach" className="approach-journey" aria-label="Our approach">
      <div ref={track} className="approach-track">
        {chapters.map((chapter, index) => (
          <article
            id={`approach-chapter-${index + 1}`}
            className={`approach-panel ${chapter.featured ? "approach-panel--featured" : ""}`}
            data-approach-panel
            key={chapter.title}
          >
            {chapter.featured ? (
              <div className="approach-featured-layout">
                <div className="approach-featured-heading">
                  <p className="approach-eyebrow" data-approach-reveal>
                    {chapter.eyebrow}
                  </p>
                  <h2 className="approach-featured-title" data-approach-reveal>
                    {chapter.title}
                    <em>{chapter.accent}</em>
                  </h2>
                </div>

                <div className="approach-featured-copy">
                  <p data-approach-reveal>{chapter.description}</p>
                  <a
                    href="#approach-chapter-2"
                    onClick={handleProcessClick}
                    data-approach-reveal
                  >
                    See the process
                    <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </div>

                <div className="approach-media approach-media--featured" data-approach-media>
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 40px), 46vw"
                    style={{ objectPosition: chapter.imagePosition }}
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="approach-panel-layout">
                <div className="approach-panel-copy">
                  <p className="approach-number" data-approach-reveal>
                    {chapter.number}
                  </p>
                  <p className="approach-eyebrow" data-approach-reveal>
                    {chapter.eyebrow}
                  </p>
                  <h2 data-approach-reveal>{chapter.title}</h2>
                  <p className="approach-description" data-approach-reveal>
                    {chapter.description}
                  </p>
                </div>

                <div className="approach-media" data-approach-media>
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 40px), 38vw"
                    style={{ objectPosition: chapter.imagePosition }}
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="approach-progress" aria-hidden="true">
        <span ref={progress} />
      </div>
    </section>
  );
}
