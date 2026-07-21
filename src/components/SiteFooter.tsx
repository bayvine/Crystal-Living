import { ArrowRight, Camera, House, Mail } from "lucide-react";
import DecorativeStar from "@/components/ui/DecorativeStar";
import { contactDetails } from "@/lib/contact";

const footerLinks = [
  { label: "About", href: "#studio" },
  { label: "Resources", href: "#buyer-guide" },
  { label: "Stories", href: "#client-stories" },
  { label: "Buyer guide", href: "#buyer-guide" },
  { label: "Contact", href: "#faq" }
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#191919] text-[#f7f5f3]">
      <div className="mx-auto w-[min(calc(100%-clamp(3rem,8vw,7rem)),78rem)] pt-[clamp(3.75rem,6vw,5.25rem)] pb-[1.8rem] max-sm:w-[calc(100%-2.5rem)] max-sm:pt-14">
        <div className="grid grid-cols-[minmax(24rem,1.25fr)_minmax(8rem,0.35fr)_minmax(20rem,0.7fr)] items-start gap-[clamp(3rem,7vw,7rem)] max-[850px]:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-12">
          <div className="max-w-[31rem] max-[850px]:col-span-full max-sm:col-auto">
            <DecorativeStar className="h-[2.4rem] w-[2.4rem] [--star-stroke:0.16rem]" />
            <p className="mt-[1.8rem] font-serif text-[clamp(1.75rem,2.6vw,2.35rem)] font-normal uppercase">Crystal Living</p>
            <p className="mt-2 text-[0.66rem] text-white/75 uppercase">Founder &amp; real estate expert</p>
            <p className="mt-[1.7rem] font-serif text-[clamp(1.25rem,2vw,1.75rem)] text-highlight-lavender italic">Guided, prepared, &amp; empowered</p>
            <p className="mt-[0.45rem] max-w-96 text-[0.68rem] leading-[1.45] text-white/80">
              Helping first-time home buyers in Denver and Aurora move forward with clarity.
            </p>
          </div>

          <nav className="grid gap-[1.4rem] pt-[0.2rem]" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a className="w-fit text-[0.68rem] text-white/80 uppercase transition-colors hover:text-highlight-lavender" href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>

          <div>
            <p className="text-[0.68rem]">Ready for what’s next?</p>
            <p className="mt-4 max-w-[23rem] font-serif text-[clamp(1.65rem,2.6vw,2.45rem)] leading-[1.08] font-normal">
              Let’s make your <em className="font-normal text-highlight-lavender">first move</em> with confidence.
            </p>
            <a
              className="mt-6 inline-flex min-h-11 min-w-48 items-center justify-between gap-4 rounded-[0.22rem] bg-[#9188cf] px-[1.2rem] py-[0.8rem] text-[0.68rem] uppercase transition-colors hover:bg-[#aaa1ef]"
              href={`${contactDetails.emailHref}?subject=My first home plan`}
            >
              Start your home plan
              <ArrowRight size={17} strokeWidth={1.4} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-[3.4rem] flex items-center justify-between gap-8 border-t border-white/50 pt-[1.8rem] max-sm:flex-col max-sm:items-start">
          <p className="text-[0.65rem] text-white/75 uppercase">© Rachel Osborne 2026</p>
          <div className="flex items-center gap-[clamp(1.4rem,3vw,2.5rem)] max-sm:w-full max-sm:flex-col max-sm:items-start max-sm:gap-4">
            <a className="inline-flex items-center gap-[0.65rem] text-[0.65rem] text-white/80 uppercase transition-colors hover:text-highlight-lavender" href={contactDetails.emailHref}>
              <Mail className="text-[#c1b9ff]" size={19} strokeWidth={1.5} aria-hidden="true" />
              Email
            </a>
            <a className="inline-flex items-center gap-[0.65rem] text-[0.65rem] text-white/80 uppercase transition-colors hover:text-highlight-lavender" href="#client-stories">
              <House className="text-[#c1b9ff]" size={19} strokeWidth={1.5} aria-hidden="true" />
              Listings
            </a>
            <a className="inline-flex items-center gap-[0.65rem] text-[0.65rem] text-white/80 uppercase transition-colors hover:text-highlight-lavender" href={contactDetails.instagramHref} target="_blank" rel="noreferrer">
              <Camera className="text-[#c1b9ff]" size={19} strokeWidth={1.5} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
