import type { Metadata, Viewport } from "next";
import { Playfair_Display } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crystal Living",
    template: "%s | Crystal Living"
  },
  description:
    "A Next.js, Prismic, GSAP, Tailwind CSS, and Netlify scaffold for a motion-led editorial portfolio.",
  openGraph: {
    title: "Crystal Living",
    description:
      "A motion-led editorial portfolio scaffold powered by Next.js, Prismic, GSAP, Tailwind CSS, and Netlify.",
    url: siteUrl,
    siteName: "Crystal Living",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#F7F3F3"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
      </head>
      <body className={playfairDisplay.variable}>
        <div className="grain" aria-hidden="true" />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
