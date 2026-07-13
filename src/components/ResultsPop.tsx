"use client";

import Image from "next/image";
import { Asterisk, House } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    className: "results-image--flowers",
    src: "/uploads/results/lavender-still-life.webp",
    alt: "Lavender flowers arranged on a sunlit table",
    direction: "left"
  },
  {
    className: "results-image--chair",
    src: "/uploads/results/sunlit-chair.webp",
    alt: "A chair and table warmed by afternoon sunlight",
    direction: "right"
  },
  {
    className: "results-image--couple",
    src: "/uploads/results/new-home-couple.webp",
    alt: "A couple celebrating with the keys to their new home",
    direction: "bottom"
  },
  {
    className: "results-image--bedroom",
    src: "/uploads/results/calm-bedroom.webp",
    alt: "A calm bedroom prepared for a new beginning",
    direction: "bottom"
  }
];

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

function MaskedText({ text }: { text: string }) {
  return (
    <span className="results-masked-text" aria-hidden="true">
      {text.split(" ").map((word, wordIndex, words) => (
        <span className="results-word" key={`${word}-${wordIndex}`}>
          {Array.from(word).map((character, characterIndex) => (
            <span className="results-character-mask" key={`${character}-${characterIndex}`}>
              <span data-results-character>{character}</span>
            </span>
          ))}
          {wordIndex < words.length - 1 ? <span className="results-word-space">&nbsp;</span> : null}
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
        ".results-heading-line",
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
      className="results-pop"
      aria-labelledby="results-title"
    >
      <div className="results-stage">
        <div className="results-gallery">
          {images.map((image) => (
            <figure
              className={`results-image-window ${image.className}`}
              data-direction={image.direction}
              data-results-image-window
              key={image.src}
            >
              <div className="results-image-layer" data-results-parallax>
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
        </div>

        <div className="results-copy">
          <div className="results-label" data-results-label>
            <p>The results?</p>
            <span aria-hidden="true" />
          </div>

          <h2 id="results-title" className="results-heading" aria-label="Confidence in every step.">
            <span className="results-heading-line results-heading-line--accent">
              <MaskedText text="Confidence" />
            </span>
            <span className="results-heading-line">
              <MaskedText text="in every step." />
            </span>
          </h2>

          <p className="results-description" data-results-description>
            Buying your first home is more than a milestone; it’s the beginning of everything
            that’s yours.
          </p>

          <span className="results-mark" data-results-mark aria-hidden="true">
            <Asterisk size={44} strokeWidth={1.5} />
          </span>
        </div>

        <div className="results-benefits" aria-label="The results of the Crystal Living process">
          {benefits.map((benefit) => (
            <article className="results-benefit" data-results-benefit key={benefit.title}>
              <House size={22} strokeWidth={1.45} aria-hidden="true" />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
