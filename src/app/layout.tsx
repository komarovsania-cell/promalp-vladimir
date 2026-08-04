import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const unbounded = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-unbounded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://xn--80adsjkdjohk.xn--p1ai";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "ВинСтарКом — промышленный альпинизм во Владимире и области",
  description:
    "Высотные работы любой сложности: фасады, кровля, монтаж, клининг, электромонтаж. Опыт работы более 10 лет, работа по договору, гарантия. Владимир, Ковров, Муром, Александров.",
  keywords: [
    "промышленный альпинизм владимир",
    "высотные работы владимир",
    "мойка окон владимир",
    "монтаж фасада владимир",
    "промальп",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "ВинСтарКом — промышленный альпинизм во Владимире и области",
    description:
      "Высотные работы любой сложности без посредников. Опыт работы более 10 лет, договор, гарантия.",
    url: BASE_URL,
    siteName: "ВинСтарКом",
    locale: "ru_RU",
    type: "website",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "ВинСтарКом",
  image: `${BASE_URL}/logo.png`,
  logo: `${BASE_URL}/logo.png`,
  url: BASE_URL,
  telephone: "+7-915-768-24-99",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Владимир",
    addressRegion: "Владимирская область",
    addressCountry: "RU",
  },
  areaServed: ["Владимир", "Ковров", "Муром", "Александров", "Владимирская область"],
  priceRange: "от 65 ₽",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },
  description:
    "Промышленный альпинизм и высотные работы во Владимире и области: фасады, кровля, монтаж, клининг, электромонтаж. Работа по договору, гарантия.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="logo-watermark" />
        <div className="noise-overlay bg-grain" />
        {children}
      </body>
    </html>
  );
}
