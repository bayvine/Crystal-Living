"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecorativeStar from "@/components/ui/DecorativeStar";
import ContentContainer from "@/components/ui/ContentContainer";

gsap.registerPlugin(ScrollTrigger);

const guideBenefits = [
  "Understand the home buying process.",
  "Learn what to expect and what to avoid.",
  "Get clarity on costs, timelines, and more."
];

export default function BuyerGuide() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;

    if (!sectionElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-guide-copy] > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.72,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionElement, start: "top 76%", once: true }
      });

      gsap.from("[data-guide-book]", {
        autoAlpha: 0,
        y: 36,
        rotate: -7,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionElement, start: "top 74%", once: true }
      });
    }, sectionElement);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={section}
      id="buyer-guide"
      className="bg-white text-[#181818]"
      aria-labelledby="buyer-guide-title"
    >
      <ContentContainer size="wide" className="grid min-h-[min(46rem,88svh)] grid-cols-2 overflow-hidden max-[800px]:grid-cols-1">
        <div className="w-[min(100%,40rem)] self-center justify-self-center px-[clamp(2rem,8vw,6.5rem)] py-[clamp(4.5rem,8vw,7rem)] max-[800px]:w-[min(100%,38rem)] max-[800px]:px-8 max-[800px]:py-[4.5rem] max-sm:px-5 max-sm:py-16" data-guide-copy>
          <p className="mb-[2.2rem] text-[0.72rem] text-[#181818]/70 uppercase">Free first-time buyer guide</p>
          <h2 id="buyer-guide-title" className="font-serif text-[clamp(3.15rem,4.6vw,4.8rem)] leading-[0.98] font-normal max-sm:text-[clamp(3rem,15vw,4rem)]">
            Start with the
            <em className="mt-[0.28em] block font-normal text-highlight-lavender">guide.</em>
          </h2>
          <p className="mt-[2.1rem] max-w-96 text-[0.82rem] leading-[1.5]">
            Buying your first home comes with a lot of questions. This guide walks you through
            the essentials so you can feel informed, prepared, and confident in your next step.
          </p>

          <ul className="mt-[2.15rem] grid list-none gap-4 p-0">
            {guideBenefits.map((benefit) => (
              <li className="flex items-center gap-[0.85rem] text-[0.78rem]" key={benefit}>
                <span className="inline-grid h-[1.15rem] w-[1.15rem] shrink-0 place-items-center rounded-full bg-highlight-lavender text-white" aria-hidden="true">
                  <Check size={12} strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <a className="mt-[3.35rem] inline-flex min-h-[2.9rem] min-w-56 items-center justify-between gap-4 rounded-[0.22rem] bg-[#9188cf] px-[1.35rem] py-[0.85rem] text-[0.72rem] text-white uppercase transition-colors hover:bg-[#aaa1ef] max-sm:w-full" href="#home-hero-title">
            Download the guide
            <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>

        <div className="relative isolate grid min-h-full place-items-center overflow-hidden bg-[#d8d2e1] max-[800px]:min-h-[42rem] max-sm:min-h-[31rem]" aria-label="First-time buyer guide preview">
          <div className="absolute inset-0 -z-10 bg-[url('/patterns/pattern-bg.png')] bg-[length:135%_auto] bg-center bg-no-repeat opacity-[0.22] grayscale" aria-hidden="true" />
          <div className="absolute -top-16 -right-8 h-72 w-48 rotate-[18deg] rounded-[50%] bg-[url('/uploads/results/lavender-still-life.webp')] bg-[position:54%_20%] bg-[length:175%_auto] bg-no-repeat opacity-[0.42] saturate-50" aria-hidden="true" />
          <div className="relative w-[min(67%,27rem)] origin-center -rotate-6 overflow-hidden bg-[#f8f7f5] shadow-[0_1.5rem_3.5rem_rgb(43_34_58/27%)] before:absolute before:inset-y-0 before:left-0 before:z-[3] before:w-[0.65rem] before:bg-[rgb(57_47_72/10%)] before:shadow-[0.4rem_0_0.8rem_rgb(57_47_72/8%)] before:content-[''] max-[800px]:w-[min(68%,26rem)] max-sm:w-[min(73%,20rem)]" data-guide-book>
            <div className="flex min-h-52 flex-col items-center justify-center p-8 text-center max-sm:min-h-[9.5rem]">
              <DecorativeStar className="mb-[0.65rem] h-[1.6rem] w-[1.6rem] [--star-stroke:0.12rem]" />
              <small className="text-[0.55rem] tracking-[0.24em] uppercase">The first-time</small>
              <strong className="mt-2 font-serif text-[clamp(1.65rem,2.6vw,2.45rem)] font-normal text-[#9e95d7]">Buyer Guide</strong>
              <p className="mt-[0.6rem] max-w-52 font-serif text-[0.68rem] leading-[1.3]">Your roadmap to buying with confidence and clarity.</p>
            </div>
            <div className="relative h-[clamp(11rem,19vw,16rem)] max-sm:h-44">
              <Image
                src="/uploads/results/calm-bedroom.webp"
                alt=""
                fill
                sizes="(max-width: 767px) 72vw, 34vw"
                className="object-cover object-[center_66%]"
              />
            </div>
            <div className="grid min-h-[4.5rem] place-content-center bg-[#c5bde0] text-center uppercase">
              <span className="font-serif text-[0.64rem] tracking-[0.22em]">Rachel Osborne</span>
              <small className="mt-[0.35rem] text-[0.42rem] tracking-[0.24em]">Denver real estate</small>
            </div>
          </div>
        </div>
      </ContentContainer>

      <div className="bg-[#f1ecef]">
        <ContentContainer className="flex min-h-32 items-center gap-9 py-7 max-sm:items-start max-sm:gap-[1.2rem] max-sm:py-9">
          <DecorativeStar className="h-11 w-11 shrink-0 [--star-stroke:0.22rem] max-sm:h-8 max-sm:w-8" />
          <div>
            <p className="font-serif text-[clamp(1.15rem,1.7vw,1.55rem)]">
              Knowledge brings confidence. <em className="font-normal text-highlight-lavender">Confidence brings clarity.</em>
            </p>
            <span className="mt-[0.45rem] block text-[0.72rem]">Let’s take the guesswork out of your next chapter.</span>
          </div>
        </ContentContainer>
      </div>
    </section>
  );
}
