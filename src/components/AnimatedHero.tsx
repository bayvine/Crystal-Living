"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedHero() {
  const root = useRef<HTMLElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const house = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = root.current;
    const backgroundElement = background.current;
    const houseElement = house.current;

    if (!rootElement || !backgroundElement || !houseElement) {
      return;
    }

    let handlePointerMove: ((event: PointerEvent) => void) | undefined;
    let handleScroll: (() => void) | undefined;
    let animationFrame = 0;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.from("[data-hero-reveal]", {
        y: 28,
        opacity: 0,
        duration: reducedMotion ? 0.01 : 1,
        stagger: reducedMotion ? 0 : 0.1,
        ease: "power3.out"
      });

      if (reducedMotion) {
        return;
      }

      const moveBackground = gsap.quickTo(backgroundElement, "xPercent", {
        duration: 1.4,
        ease: "power3.out"
      });
      const moveHouse = gsap.quickTo(houseElement, "xPercent", {
        duration: 1,
        ease: "power3.out"
      });

      handlePointerMove = (event: PointerEvent) => {
        const offset = event.clientX / window.innerWidth - 0.5;
        moveBackground(offset * -1.5);
        moveHouse(offset * 2.4);
      };

      window.addEventListener("pointermove", handlePointerMove, { passive: true });

      const updateScrollPosition = () => {
        animationFrame = 0;
        const rect = rootElement.getBoundingClientRect();
        const progress = gsap.utils.clamp(0, 1, -rect.top / rect.height);

        gsap.set(backgroundElement, {
          yPercent: progress * 7,
          scale: 1 + progress * 0.08
        });
        gsap.set(houseElement, { yPercent: progress * -7 });
      };

      handleScroll = () => {
        if (!animationFrame) {
          animationFrame = window.requestAnimationFrame(updateScrollPosition);
        }
      };

      if (!CSS.supports("animation-timeline: scroll()")) {
        updateScrollPosition();
        window.addEventListener("scroll", handleScroll, { passive: true });
      }
    }, rootElement);

    return () => {
      if (handlePointerMove) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate h-[100vh] overflow-hidden bg-cream supports-[height:100svh]:h-[100svh]"
      aria-labelledby="home-hero-title"
    >
      <div
        ref={background}
        className="hero-background-parallax absolute -inset-[4%] z-0 will-change-transform"
      >
        <Image
          src="/uploads/optimized/background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgb(247_243_243/48%)_0%,rgb(247_243_243/20%)_52%,rgb(51_51_51/10%)_100%)]" />
      <div className="absolute inset-y-0 left-0 z-[2] w-[72%] bg-[linear-gradient(90deg,rgb(247_243_243/30%),transparent)] sm:w-[58%]" />

      <header className="hero-header absolute inset-x-0 top-0 z-40 h-20 px-5 sm:px-8 lg:px-12">
        <nav className="mx-auto flex h-full max-w-[1440px] items-start justify-between" aria-label="Primary">
          <Link
            href="/"
            data-hero-reveal
            className="pt-6 font-serif text-lg font-semibold text-black sm:text-xl"
          >
            Crystal Living
          </Link>
          <a
            href="#work"
            data-hero-reveal
            className="hero-nav-cta inline-flex h-12 items-center bg-lavender px-5 text-xs font-medium uppercase text-white transition-colors hover:bg-highlight-lavender hover:text-black sm:h-14 sm:px-7"
          >
            Explore the plan
          </a>
        </nav>
      </header>

      <div className="hero-title-block absolute inset-x-5 top-[13%] z-10 mx-auto max-w-[1320px] text-center sm:inset-x-8 sm:top-[12%] lg:inset-x-12">
        <p
          data-hero-reveal
          className="font-sans text-[0.66rem] font-medium uppercase text-lavender sm:text-xs"
        >
          Guiding first-time buyers in Denver &amp; Aurora
        </p>
        <h1
          id="home-hero-title"
          data-hero-reveal
          className="hero-title mx-auto mt-5 max-w-[1240px] font-normal leading-[0.88] text-black sm:mt-7"
        >
          <span className="block">Your first home.</span>
          <span className="block sm:whitespace-nowrap">
            Your <em className="font-normal text-lavender">next</em> chapter.
          </span>
        </h1>
      </div>

      <div
        ref={house}
        className="hero-house-parallax absolute bottom-[-1%] right-[-47%] z-20 h-auto w-[145%] will-change-transform sm:right-[-28%] sm:w-[118%] lg:bottom-[-6%] lg:right-[-4%] lg:w-[95%]"
      >
        <Image
          src="/uploads/optimized/home.webp"
          alt="A modern Denver home at sunset"
          width={1534}
          height={862}
          priority
          sizes="(min-width: 1024px) 95vw, (min-width: 640px) 118vw, 145vw"
          className="h-auto w-full"
        />
      </div>

      <div className="hero-copy-block absolute bottom-[8%] left-5 z-30 max-w-[290px] sm:bottom-[12%] sm:left-[8%] sm:max-w-xs lg:bottom-[20%] lg:left-[15%]">
        <p data-hero-reveal className="hero-copy font-serif text-[1.35rem] leading-[1.12] text-black sm:text-2xl">
          A clear step-by-step process
          <br />
          to help you move forward
          <br />
          with <em className="font-normal text-lavender">confidence</em>
        </p>
        <div data-hero-reveal className="hero-actions mt-5 flex flex-col items-start gap-3">
          <a
            href="#work"
            className="hero-primary-action inline-flex h-11 items-center gap-5 bg-lavender px-5 text-[0.68rem] font-medium uppercase text-white transition-colors hover:bg-highlight-lavender hover:text-black sm:h-12 sm:text-xs"
          >
            Start your home buying plan
            <span aria-hidden="true">{"\u2192"}</span>
          </a>
          <a
            href="#studio"
            className="hero-secondary-action inline-flex items-center gap-4 border-b border-white pb-1.5 text-[0.68rem] font-medium uppercase text-white drop-shadow-sm transition-colors hover:border-highlight-lavender hover:text-highlight-lavender sm:text-xs"
          >
            Download the free guide
            <span aria-hidden="true">{"\u2192"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
