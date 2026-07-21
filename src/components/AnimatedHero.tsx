"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ContentContainer from "@/components/ui/ContentContainer";

const navigationLinks = [
  { label: "About", href: "#studio" },
  { label: "Home buyer’s guide", href: "#buyer-guide" },
  { label: "Blog", href: "#client-stories" },
  { label: "FAQ", href: "#faq" }
] as const;

export default function AnimatedHero() {
  const root = useRef<HTMLElement>(null);
  const background = useRef<HTMLDivElement>(null);
  const house = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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

      if (reducedMotion) {
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(backgroundElement, {
          autoAlpha: 0,
          scale: 1.045,
          duration: 1.35,
          ease: "power2.out"
        })
        .from(houseElement, { autoAlpha: 0, yPercent: 5, duration: 1.15 }, 0.12)
        .from("[data-hero-nav]", { autoAlpha: 0, y: -14, duration: 0.72, stagger: 0.07 }, 0.18)
        .from("[data-hero-kicker]", { autoAlpha: 0, y: 14, duration: 0.65 }, 0.34)
        .from("[data-hero-line]", { yPercent: 112, duration: 0.9, stagger: 0.12, ease: "power4.out" }, 0.4)
        .from("[data-hero-copy]", { autoAlpha: 0, y: 18, duration: 0.72 }, 0.72)
        .from("[data-hero-actions] > a", { autoAlpha: 0, y: 12, duration: 0.62, stagger: 0.09 }, 0.82);

      const moveBackground = gsap.quickTo(backgroundElement, "xPercent", {
        duration: 1.4,
        ease: "power3.out"
      });
      const moveHouse = gsap.quickTo(houseElement, "xPercent", {
        duration: 1,
        ease: "power3.out"
      });

      handlePointerMove = (event: PointerEvent) => {
        const rect = rootElement.getBoundingClientRect();
        const offset = gsap.utils.clamp(
          -0.5,
          0.5,
          (event.clientX - rect.left) / rect.width - 0.5
        );
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
        className="absolute -inset-[4%] z-0 will-change-transform"
        data-hero-background
      >
        <Image
          src="/uploads/optimized/background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-center"
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgb(247_243_243/48%)_0%,rgb(247_243_243/20%)_52%,rgb(51_51_51/10%)_100%)]" />
      <div className="absolute inset-y-0 left-0 z-[2] w-[72%] bg-[linear-gradient(90deg,rgb(247_243_243/30%),transparent)] sm:w-[58%]" />

      <header className="absolute inset-x-0 top-0 z-40 h-20 lg:h-24 [@media(max-height:700px)]:h-16 [@media(orientation:landscape)_and_(max-height:500px)]:h-12">
        <ContentContainer size="wide" className="h-full">
        <nav className="flex h-full items-start justify-between" aria-label="Primary">
          <Link
            href="/"
            data-hero-nav
            className="pt-6 font-serif text-[0.82rem] font-medium uppercase sm:pt-8"
          >
            Crystal Living
          </Link>
          <div className="flex items-start gap-10">
            <div className="hidden items-center gap-8 pt-8 lg:flex" data-hero-nav>
              {navigationLinks.map((link) => (
                <a className="text-[0.7rem] font-medium uppercase text-black transition-colors hover:text-lavender" href={link.href} key={link.label}>
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              data-hero-nav
              className="inline-flex h-12 items-center gap-6 rounded-[0.22rem] bg-lavender px-5 text-[0.68rem] font-medium uppercase text-white transition-colors hover:bg-highlight-lavender hover:text-black sm:h-14 sm:px-7 [@media(orientation:landscape)_and_(max-height:500px)]:h-12"
            >
              Schedule free intro
              <span aria-hidden="true">{"\u2192"}</span>
            </a>
          </div>
        </nav>
        </ContentContainer>
      </header>

      <div
        ref={house}
        className="absolute bottom-[-1%] right-[-55%] z-[5] h-auto w-[165%] will-change-transform sm:right-[-28%] sm:z-20 sm:w-[118%] lg:bottom-[-6%] lg:right-[-4%] lg:w-[95%] lg:[@media(max-height:700px)]:w-[min(95%,150vh)] min-[1980px]:right-[-1%] min-[1980px]:w-[min(68%,135vh)] [@media(orientation:landscape)_and_(max-height:500px)]:right-[-5%] [@media(orientation:landscape)_and_(max-height:500px)]:bottom-[-3%] [@media(orientation:landscape)_and_(max-height:500px)]:w-[min(118%,130vh)]"
        data-hero-house
      >
        <Image
          src="/uploads/optimized/home.webp"
          alt="A modern Denver home at sunset"
          width={1534}
          height={862}
          priority
          sizes="(min-width: 1980px) min(68vw, 135vh), (min-width: 1024px) 95vw, (min-width: 640px) 118vw, 165vw"
          className="h-auto w-full"
        />
      </div>

      <div className="absolute top-[48%] right-4 left-4 z-30 flex -translate-y-1/2 flex-col items-center text-center sm:contents sm:transform-none">
        <ContentContainer size="wide" className="z-10 max-sm:w-full text-center sm:absolute sm:top-[18%] sm:left-1/2 sm:-translate-x-1/2 [@media(orientation:landscape)_and_(max-height:500px)]:top-14">
          <p
            data-hero-kicker
            className="font-sans text-[0.66rem] font-medium uppercase text-lavender sm:text-xs"
          >
            Guiding first-time buyers in Denver &amp; Aurora
          </p>
          <h1
            id="home-hero-title"
            className="mx-auto mt-5 font-serif text-[clamp(2.45rem,11.5vw,3.4rem)] leading-[0.92] font-normal text-black sm:mt-7 sm:text-[min(clamp(4rem,8.7vw,8.4rem),15vh)] max-sm:[@media(max-height:620px)]:text-[2.35rem] [@media(orientation:landscape)_and_(max-height:500px)]:mt-3 [@media(orientation:landscape)_and_(max-height:500px)]:text-[14vh]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block whitespace-nowrap" data-hero-line>Your first home.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block sm:whitespace-nowrap" data-hero-line>
                Your <em className="font-normal text-lavender">next</em> chapter.
              </span>
            </span>
          </h1>
        </ContentContainer>

        <div className="z-30 mt-[clamp(1.5rem,4svh,2.25rem)] w-full max-w-[20rem] sm:absolute sm:bottom-[12%] sm:left-[max(2rem,calc((100%-87rem)/2))] sm:mt-0 sm:max-w-xs sm:text-left lg:bottom-[17%] lg:[@media(max-height:700px)]:bottom-[14%] [@media(orientation:landscape)_and_(max-height:500px)]:bottom-[4%] [@media(orientation:landscape)_and_(max-height:500px)]:left-[max(2rem,calc((100%-87rem)/2))] [@media(orientation:landscape)_and_(max-height:500px)]:max-w-[260px]">
          <p data-hero-copy className="font-serif text-[clamp(1.05rem,5vw,1.35rem)] leading-[1.12] text-black sm:text-2xl [@media(orientation:landscape)_and_(max-height:500px)]:text-[1.1rem] [@media(orientation:landscape)_and_(max-height:500px)]:leading-[1.05]">
            A clear step-by-step process
            <br />
            to help you move forward
            <br />
            with <em className="font-normal text-lavender">confidence</em>
          </p>
          <div data-hero-actions className="mt-5 flex flex-col items-center gap-3 sm:items-start [@media(orientation:landscape)_and_(max-height:500px)]:mt-3 [@media(orientation:landscape)_and_(max-height:500px)]:gap-2">
            <a
              href="#work"
              className="inline-flex h-11 items-center gap-5 rounded-[0.22rem] bg-lavender px-5 text-[0.68rem] font-medium uppercase text-white transition-colors hover:bg-highlight-lavender hover:text-black sm:h-12 sm:text-xs [@media(orientation:landscape)_and_(max-height:500px)]:h-10 [@media(orientation:landscape)_and_(max-height:500px)]:px-4 [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.625rem]"
            >
              Start your home buying plan
              <span aria-hidden="true">{"\u2192"}</span>
            </a>
            <a
              href="#studio"
              className="inline-flex items-center gap-4 border-b border-white pb-1.5 text-[0.68rem] font-medium uppercase text-white drop-shadow-sm transition-colors hover:border-highlight-lavender hover:text-highlight-lavender sm:text-xs [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.625rem]"
            >
              Download the free guide
              <span aria-hidden="true">{"\u2192"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
