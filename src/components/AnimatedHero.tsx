"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimatedHeroProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function AnimatedHero({
  eyebrow,
  heading,
  body,
  ctaLabel = "Start the edit",
  ctaHref = "#work"
}: AnimatedHeroProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-animate='hero']", {
        y: 34,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12
      });

      gsap.to("[data-animate='orbital']", {
        rotate: 8,
        yPercent: -8,
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate min-h-screen overflow-hidden px-5 py-6 sm:px-8 lg:px-10"
    >
      <nav
        className="relative z-10 mx-auto flex max-w-7xl items-center justify-between border-b border-black/10 pb-4 text-sm"
        aria-label="Primary"
      >
        <Link href="/" className="font-serif text-base font-semibold">
          Crystal Living
        </Link>
        <div className="flex items-center gap-5 text-[13px] text-black/65">
          <a className="transition hover:text-black" href="#work">
            Work
          </a>
          <a className="transition hover:text-black" href="#studio">
            Studio
          </a>
          <a className="transition hover:text-black" href="mailto:hello@example.com">
            Contact
          </a>
        </div>
      </nav>

      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:py-8">
        <div className="relative z-10 max-w-4xl">
          <p
            data-animate="hero"
            className="mb-5 font-sans text-xs uppercase tracking-[0.32em] text-lavender"
          >
            {eyebrow}
          </p>
          <h1
            data-animate="hero"
            className="max-w-5xl text-balance text-[clamp(4rem,15vw,12.5rem)] font-semibold leading-[0.82]"
          >
            {heading}
          </h1>
          <div
            data-animate="hero"
            className="mt-8 flex max-w-2xl flex-col gap-5 sm:flex-row sm:items-end"
          >
            <p className="text-lg leading-7 text-black/68 sm:text-xl">{body}</p>
            <a
              href={ctaHref}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-lavender"
            >
              {ctaLabel}
            </a>
          </div>
        </div>

        <div
          data-animate="hero"
          className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-black/10 bg-highlight-lavender shadow-2xl shadow-black/10"
        >
          <div
            data-animate="orbital"
            className="absolute left-1/2 top-1/2 h-[132%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-[48%] border border-white/60 bg-[linear-gradient(145deg,var(--color-lavender),var(--color-highlight-lavender)_48%,var(--color-cream))]"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/55 bg-white/55 p-5 shadow-xl shadow-black/10 backdrop-blur-md">
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-black/55">
              Current mood
            </p>
            <p className="mt-3 font-serif text-2xl font-semibold leading-tight">
              Tactile layouts, grounded color, smooth motion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
