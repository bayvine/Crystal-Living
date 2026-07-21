"use client";

import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    number: "(01)",
    title: "From overwhelmed to empowered.",
    description:
      "We broke everything down, created a plan, and found a home that checked every box—and felt just right.",
    meta: "First-time buyers · Aurora, CO",
    image: "/uploads/results/new-home-couple.webp",
    alt: "A couple celebrating with the keys to their first home",
  },
  {
    number: "(02)",
    title: "A fresh start, made simple.",
    description:
      "With clear guidance and steady support, the right neighborhood and the right home finally came together.",
    meta: "Relocating buyers · Denver, CO",
    image: "/uploads/results/sunlit-chair.webp",
    alt: "A bright living space filled with afternoon sunlight",
  },
  {
    number: "(03)",
    title: "The one that felt like home.",
    description:
      "A thoughtful search, a confident offer, and a closing day that opened the door to their next chapter.",
    meta: "Growing family · Lakewood, CO",
    image: "/uploads/results/calm-bedroom.webp",
    alt: "A peaceful bedroom in a welcoming new home",
  }
];

export default function ClientStories() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const sectionElement = section.current;

    if (!sectionElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-stories-intro] > *", {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionElement, start: "top 76%", once: true }
      });

      gsap.from("[data-story-card]", {
        autoAlpha: 0,
        y: 42,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-stories-grid]", start: "top 82%", once: true }
      });
    }, sectionElement);

    return () => context.revert();
  }, []);

  return (
    <section ref={section} id="client-stories" className="relative isolate overflow-hidden bg-white [--card-copy-height:15rem] [--card-radius:6.2rem]" aria-labelledby="stories-title">
      <div className="pointer-events-none absolute bottom-[4.5rem] left-[max(-2.5rem,calc((var(--site-width)-77.5rem)/2-6.5rem))] z-0 aspect-square w-[clamp(12rem,18vw,15.5rem)] bg-[radial-gradient(circle,#fff_0_27%,transparent_27.5%),repeating-conic-gradient(from_-2deg,rgb(182_175_250/16%)_0deg_0.65deg,transparent_0.65deg_7.2deg)] opacity-70" aria-hidden="true" />
      <div className="relative z-[1] mx-auto grid w-[min(calc(100%-clamp(4rem,20vw,18rem)),77.5rem)] grid-cols-[minmax(14rem,19rem)_repeat(3,minmax(13rem,16.4rem))] justify-between gap-x-[clamp(1.5rem,2.4vw,2rem)] py-[clamp(5rem,7.4vw,6.7rem)] pb-[clamp(3rem,4vw,3.5rem)] max-[1100px]:grid-cols-2 max-sm:flex max-sm:w-[calc(100%-2.5rem)] max-sm:flex-col max-sm:gap-5 max-sm:py-[4.5rem] max-sm:pb-14">
        <div className="relative z-[1] self-start pr-[clamp(0.5rem,2vw,1.75rem)] max-[1100px]:min-h-[26rem] max-sm:min-h-0 max-sm:pr-0" data-stories-intro>
          <p className="mb-[1.15rem] text-[0.78rem]">Client stories.</p>
          <h2 id="stories-title" className="font-serif text-[clamp(2.65rem,4vw,4rem)] leading-[1.02] font-normal text-[#111]">
            Real stories.
            <em className="mt-[0.25em] block font-normal whitespace-nowrap text-highlight-lavender">Real results.</em>
          </h2>
          <p className="mt-[1.85rem] max-w-56 text-[0.78rem] leading-[1.45] max-sm:max-w-[19rem]">
            Buying a first home can feel uncertain. But with the right guidance, it becomes the
            beginning of something incredibly meaningful.
          </p>
          <a className="mt-[1.7rem] flex w-[min(100%,14rem)] items-center justify-between border-b border-current pb-[0.4rem] text-[0.73rem] text-black uppercase" href="#story-1">
            Read more stories
            <ArrowRight size={18} strokeWidth={1.35} aria-hidden="true" />
          </a>
        </div>

        <blockquote className="absolute top-[clamp(4.45rem,5.7vw,5rem)] right-[clamp(0rem,2vw,2.75rem)] z-[1] flex w-[min(22rem,31vw)] gap-2 max-[1100px]:top-28 max-[1100px]:right-[5%] max-[1100px]:w-[38%] max-sm:static max-sm:my-6 max-sm:mt-11 max-sm:w-full max-sm:bg-cream max-sm:p-6">
          <Quote size={27} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <div>
            <p className="font-serif text-[0.88rem] leading-[1.25] italic">Rachel made the process feel manageable and even exciting.</p>
            <cite className="mt-[0.55rem] block text-[0.66rem] not-italic">— Taylor &amp; Jordan</cite>
          </div>
        </blockquote>

        <div className="relative z-[1] col-[2/-1] grid grid-cols-3 gap-x-[clamp(1.5rem,2.4vw,2rem)] max-[1100px]:col-span-full max-[1100px]:grid-cols-2 max-[1100px]:gap-5 max-sm:grid-cols-1" data-stories-grid>
          {stories.map((story, index) => (
            <article id={`story-${index + 1}`} className="mt-[clamp(4.2rem,5.5vw,5rem)] grid w-full self-end overflow-visible bg-transparent [grid-template-rows:auto_var(--card-copy-height)] max-[1100px]:mt-0" data-story-card key={story.number}>
              <div className="relative z-[1] aspect-[1.15/0.93] w-full overflow-hidden rounded-tr-[var(--card-radius)] bg-white max-sm:aspect-[4/3]">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 767px) 88vw, (max-width: 1100px) 42vw, 16rem"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.65,0.25,1)] hover:scale-[1.035]"
                />
              </div>
              <div className="relative z-[1] flex h-[var(--card-copy-height)] min-h-0 flex-col overflow-hidden bg-cream px-[1.7rem] pt-6 pb-[1.6rem]">
                <p className="font-serif text-[0.58rem] text-highlight-lavender italic">{story.number}</p>
                <h3 className="mt-[0.8rem] max-w-52 font-serif text-[clamp(1.25rem,1.45vw,1.48rem)] leading-[1.08] font-normal">{story.title}</h3>
                <p className="mt-4 text-[0.65rem] leading-[1.4]">{story.description}</p>
                <span className="mt-auto block pt-[1.1rem] text-[0.54rem] text-[#7f77ed] uppercase">{story.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="relative z-[1] grid min-h-[7.5rem] grid-cols-[auto_minmax(15rem,1fr)_minmax(13rem,18rem)_auto] items-center gap-[clamp(2rem,4vw,3.5rem)] bg-[#f3eef1] px-[max(2rem,calc((var(--site-width)-71rem)/2))] py-6 max-[1100px]:grid-cols-[1fr_1.5fr] max-sm:grid-cols-1 max-sm:gap-6 max-sm:px-5 max-sm:py-10">
        <div className="flex items-center gap-6 border-r border-lavender/45 pr-8 max-sm:justify-between max-sm:border-r-0 max-sm:border-b max-sm:pb-6">
          <strong className="font-serif text-[clamp(2.5rem,4vw,3.25rem)] font-normal text-lavender">100+</strong>
          <span className="text-[0.68rem] leading-[1.45] uppercase">First-time buyers<br />helped &amp; counting</span>
        </div>
        <p className="max-w-72 text-[0.68rem] leading-[1.45] max-sm:max-w-[22rem]">Every story is different, but the result is always the same: a life-changing move.</p>
        <a className="flex min-w-[14.5rem] items-center justify-between gap-4 border-b border-current pb-[0.4rem] text-[0.68rem] leading-[1.45] text-black uppercase" href="https://www.google.com/search?q=Crystal+Living+real+estate+reviews" target="_blank" rel="noreferrer">
          See more reviews on Google
          <ArrowRight size={18} strokeWidth={1.35} aria-hidden="true" />
        </a>
        <div className="grid justify-items-center text-[#6f63e8] max-sm:justify-items-start" aria-label="5 out of 5 average rating">
          <span aria-hidden="true">★★★★★</span>
          <small className="mt-[0.2rem] text-[0.65rem] uppercase">5.0 avg rating</small>
        </div>
      </div>
    </section>
  );
}
