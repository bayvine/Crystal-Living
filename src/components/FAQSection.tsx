"use client";

import { ArrowRight, Mail, Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How do I know if I’m ready to buy my first home?",
    answer:
      "You’re likely ready to begin when your income feels stable, you have room in your budget for a monthly payment, and you plan to stay in the area for a few years. You do not need every detail figured out before starting. A first conversation can help you understand what is realistic."
  },
  {
    question: "How much money do I need for a down payment?",
    answer:
      "Many first-time buyers purchase with less than 20% down. The right amount depends on your loan program, savings, monthly budget, and closing costs. We’ll compare the available options before you decide what feels comfortable."
  },
  {
    question: "Should I talk to a lender before looking at homes?",
    answer:
      "Yes. A lender can confirm your buying range, explain estimated payments, and identify any steps that could strengthen your application. That makes the home search more focused and keeps surprises to a minimum."
  },
  {
    question: "How long does the home buying process take?",
    answer:
      "The timeline varies, but most buyers spend several weeks preparing and searching, followed by roughly 30 to 45 days from an accepted offer to closing. Your pace can be faster or slower depending on your goals and the market."
  },
  {
    question: "What happens after my offer is accepted?",
    answer:
      "You’ll move through inspection, appraisal, financing, title work, and a final walkthrough. I’ll track each deadline, coordinate with the other professionals involved, and explain what needs your attention at every step."
  }
];

const answerStateClasses = {
  open: "grid-rows-[1fr]",
  closed: "grid-rows-[0fr]"
} as const;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white text-[#181818]" aria-labelledby="faq-title">
      <div className="mx-auto grid min-h-[min(47rem,92svh)] w-[min(calc(var(--site-width)-clamp(3rem,13vw,12rem)),78rem)] grid-cols-[minmax(28rem,1.15fr)_minmax(22rem,0.85fr)] items-start gap-[clamp(5rem,11vw,10rem)] py-[clamp(5rem,8vw,7.5rem)] [--faq-gutter:calc((var(--site-width)-min(calc(var(--site-width)-clamp(3rem,13vw,12rem)),78rem))/2)] max-[900px]:w-[min(calc(100%-3rem),46rem)] max-[900px]:grid-cols-1 max-[900px]:gap-16 max-sm:w-[calc(100%-2.5rem)] max-sm:gap-12 max-sm:py-16">
        <div className="border-b border-[#181818]/25">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article className="border-t border-[#181818]/25 first:border-t-0" key={faq.question}>
                <button
                  type="button"
                  className="grid w-full grid-cols-[1.7rem_minmax(0,1fr)] items-center gap-[1.3rem] py-[1.9rem] text-left text-inherit max-sm:gap-[0.9rem] max-sm:py-[1.55rem]"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="grid h-[1.65rem] w-[1.65rem] place-items-center rounded-full border border-[#8f87cc] text-[#8f87cc]" aria-hidden="true">
                    {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                  </span>
                  <span className="font-serif text-[clamp(1.15rem,1.6vw,1.45rem)] leading-[1.25]">{faq.question}</span>
                </button>
                <div
                  id={answerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${answerStateClasses[isOpen ? "open" : "closed"]}`}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 max-w-lg pb-[2.4rem] pl-12 text-[0.78rem] leading-[1.5] max-sm:pl-0">{faq.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex min-h-[35rem] flex-col text-right max-[900px]:order-first max-[900px]:min-h-0 max-[900px]:text-left">
          <p className="mb-[0.65rem] text-[0.72rem] text-[#181818]/60">Frequently asked questions.</p>
          <h2 id="faq-title" className="font-serif text-[clamp(3.1rem,4.4vw,4.7rem)] leading-[0.98] font-normal max-sm:text-[clamp(3rem,15vw,4rem)]">
            Questions
            <em className="mt-[0.27em] block font-normal text-highlight-lavender">answered.</em>
          </h2>
          <p className="mt-8 ml-auto max-w-[23rem] text-[0.78rem] leading-[1.48] max-[900px]:ml-0">
            Buying your first home comes with a lot of questions, and that’s completely normal.
            Here are answers to the questions first-time buyers ask most often.
          </p>
          <p className="mt-[1.3rem] ml-auto max-w-[21rem] text-[0.76rem] leading-[1.45] max-[900px]:ml-0">
            If you don’t see your question here, please reach out. I’m here to help.
          </p>

          <div className="mt-auto mr-[calc(var(--faq-gutter)*-1)] grid min-h-[7.4rem] grid-cols-[auto_minmax(0,1fr)_9rem] items-center gap-6 bg-[#f1ecef] py-6 pr-[calc(var(--faq-gutter)+1.7rem)] pl-[1.7rem] text-left max-[900px]:mt-11 max-[900px]:mr-0 max-[900px]:pr-[1.7rem] max-sm:grid-cols-[auto_minmax(0,1fr)] max-sm:gap-4 max-sm:p-[1.35rem]">
            <span className="grid h-[2.15rem] w-[2.15rem] place-items-center rounded-full border border-[#8f87cc] text-[#8f87cc]" aria-hidden="true">
              <Mail size={18} strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-serif text-[0.8rem]">
                Still have questions? <em className="font-normal text-[#8f87cc]">Let’s connect.</em>
              </p>
              <span className="mt-[0.45rem] block text-[0.7rem]">I’m here to guide you every step of the way.</span>
            </div>
            <a className="flex items-center justify-between gap-4 border-b border-current pb-[0.4rem] text-[0.72rem] uppercase max-sm:col-span-full max-sm:mt-2" href="#studio">
              Let’s connect
              <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
