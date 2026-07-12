"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    leftClass: "story-photo-left--one",
    rightClass: "story-photo-right--one"
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
    leftClass: "story-photo-left--two",
    rightClass: "story-photo-right--two"
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
    leftClass: "story-photo-left--three",
    rightClass: "story-photo-right--three"
  }
];

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
    <section ref={section} id="work" className="scroll-story" aria-label="Home buying concerns">
      <div className="story-stage">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.accent}
            className={`story-chapter ${index === 0 ? "story-chapter--initial" : ""}`}
            data-story-chapter
          >
            <div className={`story-photo story-photo-left ${chapter.leftClass}`}>
              <div className="story-photo-reveal" data-story-media>
                <Image
                  src={chapter.leftImage}
                  alt={chapter.leftAlt}
                  fill
                  sizes="(max-width: 639px) 44vw, 24vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="story-copy">
              <p className="story-eyebrow" data-story-copy>
                {chapter.eyebrow}
              </p>
              <h2 className="story-heading" data-story-copy>
                <span>{chapter.title}</span>
                <em>{chapter.accent}</em>
              </h2>
              <p className="story-description" data-story-copy>
                {chapter.description}
              </p>
            </div>

            <div className={`story-photo story-photo-right ${chapter.rightClass}`}>
              <div className="story-photo-reveal" data-story-media>
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

        <div className="story-scroll-cue" aria-hidden="true">
          <span className="story-mouse"><span /></span>
          <span className="story-chevron" />
        </div>
      </div>
    </section>
  );
}
