"use client";

import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecorativeStar from "@/components/ui/DecorativeStar";

gsap.registerPlugin(ScrollTrigger);

export default function TrustedProfile() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;

    if (!sectionElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-trusted-portrait]", {
        autoAlpha: 0,
        y: 36,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionElement, start: "top 76%", once: true }
      });

      gsap.from("[data-trusted-copy] > *", {
        autoAlpha: 0,
        y: 26,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionElement, start: "top 72%", once: true }
      });
    }, sectionElement);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={section}
      id="trusted-profile"
      className="relative isolate overflow-hidden bg-[#1d1d1d] text-[#f5f3f1] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[url('/patterns/pattern-bg.png')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-[0.38] before:mix-blend-screen before:brightness-[3] before:grayscale before:content-['']"
      aria-labelledby="trusted-profile-title"
    >
      <div className="relative z-[1] mx-auto grid min-h-[min(52rem,100svh)] w-[min(calc(100%-clamp(3rem,10vw,9.5rem)),81rem)] grid-cols-[minmax(20rem,0.88fr)_minmax(28rem,1.12fr)] items-end gap-[clamp(4rem,9vw,9rem)] max-[900px]:min-h-0 max-[900px]:w-[min(calc(100%-3rem),48rem)] max-[900px]:grid-cols-[minmax(15rem,0.85fr)_minmax(20rem,1.15fr)] max-[900px]:gap-10 max-sm:flex max-sm:w-[calc(100%-2.5rem)] max-sm:flex-col max-sm:gap-0 max-sm:pt-16">
        <div className="relative self-end max-sm:order-2 max-sm:w-full" data-trusted-portrait>
          <DecorativeStar className="absolute top-[3.8rem] -left-[1.2rem] z-[2] h-24 w-24 [--star-stroke:0.5rem] max-sm:top-9 max-sm:-left-[0.65rem] max-sm:h-[4.75rem] max-sm:w-[4.75rem]" />
          <div className="relative aspect-[0.72/1] w-full overflow-hidden rounded-[50%_50%_0_0/18%_18%_0_0] bg-[#333] max-sm:aspect-[0.84/1]">
            <Image
              src="/uploads/about/rachel-portrait.webp"
              alt="Rachel Osborne, Denver real estate expert"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 42vw"
              className="object-cover object-[center_22%]"
            />
          </div>
        </div>

        <div className="flex max-w-[39rem] self-center flex-col py-[clamp(4.5rem,7vw,6rem)] pb-[clamp(3rem,5vw,4rem)] max-[900px]:py-16 max-sm:order-1 max-sm:max-w-none max-sm:pt-0 max-sm:pb-14" data-trusted-copy>
          <div>
            <p className="mb-[0.7rem] text-[0.76rem] text-white/80">Rachel Osborne.</p>
            <h2 id="trusted-profile-title" className="font-serif text-[clamp(2.75rem,4.25vw,4.15rem)] leading-[1.03] font-normal max-sm:text-[clamp(2.55rem,12vw,3.35rem)]">
              Trusted, recognized,
              <em className="mt-[0.22em] block font-normal text-highlight-lavender">&amp; recommended.</em>
            </h2>
          </div>

          <div className="mt-[1.65rem] grid gap-[1.05rem] max-sm:mt-6">
            <p className="text-[clamp(0.72rem,0.88vw,0.84rem)] leading-[1.48] text-white/80">
              Rachel Osborne is a Denver real estate expert dedicated to helping first-time
              buyers move forward with clarity, confidence, and genuine care.
            </p>
            <p className="text-[clamp(0.72rem,0.88vw,0.84rem)] leading-[1.48] text-white/80">
              Her approach pairs local market knowledge with calm, practical guidance, so every
              decision feels informed and every milestone feels manageable.
            </p>
            <p className="text-[clamp(0.72rem,0.88vw,0.84rem)] leading-[1.48] text-white/80">
              From the first conversation through closing day, Rachel stays focused on what fits
              your life, your goals, and the chapter you are ready to begin.
            </p>
          </div>

          <blockquote className="mt-[clamp(2.4rem,5vh,3.5rem)] flex max-w-[27rem] gap-3 text-highlight-lavender">
            <Quote size={27} fill="currentColor" strokeWidth={0} aria-hidden="true" />
            <div>
              <p className="font-serif text-[0.82rem] leading-[1.35] text-[#f5f3f1] italic">Rachel made the process feel manageable and even exciting.</p>
              <cite className="mt-[0.45rem] block text-[0.66rem] text-white/75 not-italic">— Taylor &amp; Jordan</cite>
            </div>
          </blockquote>

          <div className="mt-8 flex items-center gap-7 max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-4">
            <a className="inline-flex min-h-[2.8rem] min-w-[13.75rem] items-center justify-between gap-4 rounded-[0.22rem] bg-[#9188cf] px-5 py-[0.8rem] text-[0.72rem] text-white uppercase transition-colors hover:bg-[#aaa1ef] max-[900px]:w-full" href="#approach">
              Start your home plan
              <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
            </a>
            <a className="inline-flex min-h-[2.8rem] min-w-40 items-center justify-between gap-4 border-b border-white/70 text-[0.72rem] text-white uppercase max-[900px]:w-full" href="#studio">
              Meet Rachel
              <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-[clamp(2.2rem,4.5vh,3.2rem)]" aria-label="Featured publications">
            <p className="mb-[0.8rem] font-serif text-[0.56rem] italic uppercase">As featured in</p>
            <div className="flex flex-wrap items-baseline gap-[1.55rem] text-white/65 max-sm:gap-x-[1.4rem] max-sm:gap-y-4">
              <span className="font-serif text-[1.28rem] text-white">House Beautiful</span>
              <span className="font-sans text-[0.9rem] uppercase">CanvasRebel</span>
              <span className="font-serif text-base italic">VoyageDenver</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
