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

function BenefitGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div
      className={`about-benefit-group ${duplicate ? "about-benefit-group--duplicate" : ""}`}
      aria-hidden={duplicate ? true : undefined}
    >
      {benefits.map((benefit) => (
        <article className="about-benefit" key={benefit.title}>
          <span className="about-benefit-icon" aria-hidden="true">
            <House size={22} strokeWidth={1.5} />
          </span>
          <div>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
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
      className="about-rachel"
      aria-labelledby="about-rachel-title"
    >
      <div className="about-rachel-content">
        <div className="about-rachel-copy">
          <p className="about-rachel-eyebrow" data-about-copy>
            I get it.
          </p>
          <h2 id="about-rachel-title" className="about-rachel-heading" data-about-copy>
            I understand,
            <br />
            and I’m here <em>for you.</em>
          </h2>

          <p className="about-rachel-intro" data-about-copy>
            Buying your first home is more than a transaction. It’s a life-changing transition.
            I’ve been there, and I’m here to guide you with clarity, strategy, and genuine support
            every step of the way.
          </p>

          <div className="about-rachel-identity" data-about-copy>
            <p className="about-rachel-signature">Rachel Osborne</p>
            <p className="about-rachel-role">
              Founder <span aria-hidden="true">•</span> Denver real estate expert
            </p>
          </div>

          <div className="about-rachel-actions" data-about-copy>
            <a href="#work" className="about-rachel-primary">
              Start your home plan
              <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href="#home-hero-title" className="about-rachel-secondary">
              Meet Rachel
              <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="about-rachel-visual">
          <div className="about-rachel-portrait" data-about-portrait>
            <Image
              src="/uploads/about/rachel-portrait.webp"
              alt="A real estate professional wearing a black suit"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 48vw"
              className="object-cover"
            />
          </div>

          <blockquote className="about-rachel-quote" data-about-quote>
            <Quote size={26} strokeWidth={1.4} aria-hidden="true" />
            <p>
              My goal is simple:
              <br />
              To remove the overwhelm and help you make confident decisions that shape your
              future, not just your address.
            </p>
          </blockquote>
        </div>
      </div>

      <div className="about-benefits" aria-label="Client benefits" data-about-benefits>
        <div className="about-benefits-track">
          <BenefitGroup />
          <BenefitGroup duplicate />
        </div>
      </div>
    </section>
  );
}
