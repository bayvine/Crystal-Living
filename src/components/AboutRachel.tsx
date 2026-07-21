"use client";

import Image from "next/image";
import { ArrowRight, House, Quote } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "Local expertise",
    description: "Deep knowledge of Denver and surrounding communities."
  },
  {
    title: "First-time focus",
    description: "I specialize in first-time home buyers and relocations."
  },
  {
    title: "Client-first approach",
    description: "Your goals come first. Always."
  },
  {
    title: "Trusted & recognized",
    description: "Featured in top publications and five-star client reviews."
  }
];

const benefitGroupClasses = {
  primary: "grid grid-cols-4 max-sm:flex max-sm:shrink-0",
  duplicate: "hidden max-sm:flex max-sm:shrink-0 motion-reduce:hidden"
} as const;

function BenefitGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={benefitGroupClasses[duplicate ? "duplicate" : "primary"]}
      aria-hidden={duplicate ? true : undefined}
    >
      {benefits.map((benefit) => (
        <article className="grid min-w-0 grid-cols-[3.1rem_minmax(0,1fr)] items-center gap-[0.9rem] border-r border-black/10 px-5 py-8 last:border-r-0 max-sm:w-72 max-sm:shrink-0 max-sm:px-5 max-sm:py-6 max-sm:last:border-r" key={benefit.title}>
          <span className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-lavender text-lavender" aria-hidden="true">
            <House size={22} strokeWidth={1.5} />
          </span>
          <div>
            <h3 className="mb-1 font-sans text-[0.72rem] font-bold uppercase">{benefit.title}</h3>
            <p className="text-[0.74rem] leading-[1.4]">{benefit.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function AboutRachel() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;

    if (!sectionElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      const copy = gsap.utils.toArray<HTMLElement>("[data-about-copy]", sectionElement);
      const portrait = sectionElement.querySelector<HTMLElement>("[data-about-portrait]");
      const quote = sectionElement.querySelector<HTMLElement>("[data-about-quote]");
      const benefits = sectionElement.querySelector<HTMLElement>("[data-about-benefits]");

      gsap.from(copy, {
        autoAlpha: 0,
        y: 34,
        duration: 0.78,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 78%",
          once: true
        }
      });

      if (portrait) {
        gsap.from(portrait, {
          autoAlpha: 0,
          clipPath: "inset(9% 0 0 0 round 12px)",
          scale: 1.035,
          duration: 1.05,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility,clipPath",
          scrollTrigger: {
            trigger: portrait,
            start: "top 86%",
            once: true
          }
        });
      }

      if (quote) {
        gsap.from(quote, {
          autoAlpha: 0,
          y: 28,
          scale: 0.97,
          duration: 0.72,
          delay: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: quote,
            start: "top 88%",
            once: true
          }
        });
      }

      if (benefits) {
        gsap.from(benefits, {
          autoAlpha: 0,
          y: 24,
          duration: 0.72,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          scrollTrigger: {
            trigger: benefits,
            start: "top 94%",
            once: true
          }
        });
      }
    }, sectionElement);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={section}
      id="studio"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream bg-[url('/patterns/pattern-bg.png')] bg-cover bg-center"
      aria-labelledby="about-rachel-title"
    >
      <div className="mx-auto grid w-[min(calc(100%-clamp(2.5rem,20vw,21.25rem)),87rem)] flex-1 grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-center gap-[clamp(4rem,12vw,12rem)] py-[clamp(5rem,10vh,7rem)] pb-[clamp(4rem,8vh,6rem)] max-sm:flex max-sm:w-[calc(100%-2.5rem)] max-sm:flex-col max-sm:items-stretch max-sm:gap-[2.4rem] max-sm:py-[4.5rem] max-sm:pb-12">
        <div className="max-w-[29rem] max-sm:max-w-none">
          <p className="mb-[0.45rem] text-[0.82rem] text-black/70" data-about-copy>
            I get it.
          </p>
          <h2 id="about-rachel-title" className="font-serif text-[clamp(2.25rem,2.1vw,2.5rem)] leading-[1.02] font-normal max-sm:text-[clamp(2.45rem,11.5vw,3.25rem)]" data-about-copy>
            I understand,
            <br />
            and I’m here <em className="font-normal whitespace-nowrap text-highlight-lavender">for you.</em>
          </h2>

          <p className="mt-[clamp(1.6rem,4vh,2.5rem)] max-w-[27rem] text-[clamp(0.88rem,1.05vw,1rem)] leading-[1.5] max-sm:mt-6" data-about-copy>
            Buying your first home is more than a transaction. It’s a life-changing transition.
            I’ve been there, and I’m here to guide you with clarity, strategy, and genuine support
            every step of the way.
          </p>

          <div className="mt-[clamp(1.7rem,4vh,2.6rem)]" data-about-copy>
            <p className="font-serif text-[clamp(1.5rem,2.2vw,2rem)] text-lavender italic">Rachel Osborne</p>
            <p className="mt-[0.45rem] flex items-center gap-3 text-[0.76rem] text-black/70 uppercase max-sm:flex-wrap">
              Founder <span aria-hidden="true">•</span> Denver real estate expert
            </p>
          </div>

          <div className="mt-[clamp(2rem,4vh,2.8rem)] flex items-center gap-[clamp(1.5rem,3vw,2.4rem)] max-sm:mt-8 max-sm:flex-col max-sm:items-stretch max-sm:gap-4" data-about-copy>
            <a href="#approach" className="inline-flex min-h-[2.9rem] min-w-[14.5rem] items-center justify-center gap-5 rounded bg-lavender text-[0.74rem] font-medium text-white uppercase transition-colors hover:bg-highlight-lavender hover:text-black max-sm:w-full max-sm:min-w-0 max-sm:px-5">
              Start your home plan
              <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href="#home-hero-title" className="inline-flex min-h-[2.9rem] items-center justify-between gap-5 border-b border-black text-[0.74rem] font-medium text-black uppercase max-sm:w-full max-sm:px-5">
              Meet Rachel
              <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative w-[min(100%,41rem)] justify-self-end max-sm:flex max-sm:w-full max-sm:flex-col">
          <div className="relative aspect-[1.1/0.92] w-full overflow-hidden rounded-xl bg-[#d8d8d8] shadow-[0_1.2rem_2.8rem_rgb(51_51_51/10%)] max-sm:aspect-[4/4.5]" data-about-portrait>
            <Image
              src="/uploads/about/rachel-portrait.webp"
              alt="A real estate professional wearing a black suit"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 48vw"
              className="object-cover object-[center_22%]"
            />
          </div>

          <blockquote className="absolute -right-6 -bottom-9 w-[min(17rem,48%)] rounded-lg bg-white p-6 shadow-[0_0.8rem_1.8rem_rgb(51_51_51/14%)] max-sm:static max-sm:mt-4 max-sm:w-full" data-about-quote>
            <Quote className="fill-lavender text-lavender" size={26} strokeWidth={1.4} aria-hidden="true" />
            <p className="mt-[0.35rem] text-[0.83rem] leading-[1.45] italic">
              My goal is simple:
              <br />
              To remove the overwhelm and help you make confident decisions that shape your
              future, not just your address.
            </p>
          </blockquote>
        </div>
      </div>

      <div className="mx-auto mb-[clamp(2rem,5vh,3.5rem)] w-[min(calc(100%-clamp(2.5rem,20vw,21.25rem)),87rem)] overflow-hidden border-t border-black/10 max-sm:mb-6 max-sm:w-full motion-reduce:overflow-x-auto" aria-label="Client benefits" data-about-benefits>
        <div className="max-sm:flex max-sm:w-max max-sm:animate-[about-benefits-marquee_26s_linear_infinite] max-sm:will-change-transform motion-reduce:animate-none motion-reduce:transform-none">
          <BenefitGroup />
          <BenefitGroup duplicate />
        </div>
      </div>
    </section>
  );
}
