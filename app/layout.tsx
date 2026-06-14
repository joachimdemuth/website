import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ViewTransition } from "react";
import { GradientText } from "./components/gradient-text";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joachimdemuth.com"),
  title: {
    default: "Joachim Demuth",
    template: "%s — Joachim Demuth",
  },
  description:
    "Tech Lead based in Copenhagen. Building products and teams at P-Secure.",
  keywords: ["Joachim Demuth", "Tech Lead", "Copenhagen", "Design Engineer", "P-Secure", "product engineering"],
  authors: [{ name: "Joachim Demuth", url: "https://joachimdemuth.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joachimdemuth.com",
    siteName: "Joachim Demuth",
    title: "Joachim Demuth",
    description: "Tech Lead based in Copenhagen. Building products and teams at P-Secure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joachim Demuth",
    description: "Tech Lead based in Copenhagen. Building products and teams at P-Secure.",
    creator: "@joachimdemuth",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="mx-auto max-w-[640px] px-6 py-16 md:py-10">
          <nav className="mb-16 flex items-center gap-6 text-sm text-muted">
            <Link href="/">
              <GradientText>home</GradientText>
            </Link>
            <Link href="/projects">
              <GradientText>projects</GradientText>
            </Link>
            <Link href="/music">
              <GradientText>music</GradientText>
            </Link>
            <Link href="/photos">
              <GradientText>photos</GradientText>
            </Link>
          </nav>
          <ViewTransition>{children}</ViewTransition>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
