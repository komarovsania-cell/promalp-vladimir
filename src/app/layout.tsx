import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
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

export const metadata: Metadata = {
  title: "ВинСтарКом — Промышленный альпинизм во Владимире и области",
  description:
    "Высотные работы любой сложности: фасады, кровля, монтаж, клининг, электромонтаж. Опыт 10+ лет, работа по договору, гарантия. Владимир, Ковров, Муром, Александров.",
  keywords: [
    "промышленный альпинизм владимир",
    "высотные работы владимир",
    "мойка окон владимир",
    "монтаж фасада владимир",
    "промальп",
  ],
  openGraph: {
    title: "ВинСтарКом — Промышленный альпинизм во Владимире и области",
    description:
      "Высотные работы любой сложности без посредников. Опыт 10+ лет, договор, гарантия.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <div className="noise-overlay bg-grain" />
        {children}
      </body>
    </html>
  );
}
