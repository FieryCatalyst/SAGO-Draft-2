import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgeGate from "@/components/layout/AgeGate";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sagowhisky.co.ke"
  ),
  title: {
    default: "Sago Whisky — Gold Reserve | Premium Oak Whisky Kenya",
    template: "%s | Sago Whisky",
  },
  description:
    "Experience Sago Gold Reserve Whisky — Premium Oak Whisky crafted from finest grain. Now available in Kenya. Play & Win exclusive rewards at participating bars.",
  keywords: [
    "Sago Whisky",
    "Gold Reserve",
    "Premium Oak Whisky",
    "Kenya Whisky",
    "Luxury Whisky",
    "Whisky Kenya",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Sago Whisky — Gold Reserve | Premium Oak Whisky",
    description:
      "Crafted from the finest grain. The last pour… the deepest one… for you.",
    type: "website",
    locale: "en_KE",
    siteName: "Sago Whisky",
    images: [
      {
        url: "/images/sago-bottle-hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Sago Gold Reserve Whisky Bottle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sago Whisky — Gold Reserve",
    description: "Premium Oak Whisky. Now in Kenya.",
    images: ["/images/sago-bottle-hero.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body className="bg-sago-black text-sago-cream antialiased">
        <AgeGate />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
