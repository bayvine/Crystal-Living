import Image from "next/image";
import { ArrowRight, Camera, Mail, Phone } from "lucide-react";
import DecorativeStar from "@/components/ui/DecorativeStar";
import { contactDetails } from "@/lib/contact";

const contactMethods = [
  {
    label: contactDetails.email,
    href: contactDetails.emailHref,
    Icon: Mail
  },
  {
    label: contactDetails.phone,
    href: contactDetails.phoneHref,
    Icon: Phone
  },
  {
    label: contactDetails.instagram,
    href: contactDetails.instagramHref,
    Icon: Camera
  }
];

export default function ContactCTA() {
  return (
    <section
      id="contact"
      className="relative isolate grid min-h-[max(40rem,calc(100svh-2rem))] place-items-center overflow-hidden bg-[#20202a] text-white max-sm:min-h-[44rem]"
      aria-labelledby="contact-cta-title"
    >
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <Image
          src="/uploads/story/moving-home.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_48%] max-sm:object-[57%_center]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[rgb(15_17_31/68%)]" aria-hidden="true" />

      <div className="flex w-[min(calc(100%-3rem),64rem)] flex-col items-center py-[clamp(4rem,7vw,5.5rem)] pb-[clamp(3rem,5vw,4rem)] text-center max-sm:w-[calc(100%-2.5rem)] max-sm:py-16">
        <DecorativeStar className="h-[2.45rem] w-[2.45rem] [--star-stroke:0.17rem]" />
        <p className="mt-3 text-[0.76rem]">Ready for what’s next?</p>
        <h2
          id="contact-cta-title"
          className="mt-7 max-w-[53rem] font-serif text-[clamp(3rem,5vw,5.1rem)] leading-[1.02] font-normal max-sm:text-[clamp(2.8rem,14vw,4rem)]"
        >
          Let’s make your
          <br />
          <em className="font-normal text-highlight-lavender">first move</em> with confidence.
        </h2>
        <p className="mt-6 max-w-[25rem] text-[0.78rem] leading-[1.45] text-white/85">
          You don’t have to figure it out alone. I’m here to guide you every step of the way.
        </p>
        <a
          className="mt-6 inline-flex min-h-[2.9rem] min-w-56 items-center justify-between gap-4 rounded-[0.22rem] bg-[#9188cf] px-[1.35rem] py-[0.85rem] text-[0.72rem] uppercase transition-colors hover:bg-[#aaa1ef]"
          href={`${contactDetails.emailHref}?subject=My first home plan`}
        >
          Start your home plan
          <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
        </a>

        <div
          className="mt-[clamp(2.8rem,6vh,4rem)] grid w-[min(100%,44rem)] grid-cols-3 gap-8 max-sm:mt-11 max-sm:w-full max-sm:grid-cols-1 max-sm:gap-[1.35rem]"
          aria-label="Contact options"
        >
          {contactMethods.map(({ label, href, Icon }) => (
            <a
              className="group flex min-w-0 flex-col items-center gap-3 text-[0.72rem] text-white max-sm:min-h-11 max-sm:flex-row max-sm:justify-center"
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              key={label}
            >
              <Icon className="text-[#c1b9ff]" size={27} strokeWidth={1.55} aria-hidden="true" />
              <span className="max-w-full [overflow-wrap:anywhere] group-hover:underline group-hover:underline-offset-4">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
