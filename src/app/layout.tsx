import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Arı Yatay",
  applicationName: "Arı Yatay",
  description:
    "İTÜ'de yatay geçiş için gereken GPA değerini hesaplamanıza yardımcı olan bir uygulamadır.",
  keywords: [
    "itü yatay",
    "itü yatay geçiş",
    "itü gpa",
    "itü gpa ile yatay geçiş",
    "itu yatay geçiş hesaplama",
    "itu puan hesaplama",
    "itü kurumiçi",
    "itü",
    "yatay geçiş",
    "gpa",
    "itu",
    "ari yatay",
    "arı yatay",
    "arıyatay"
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  appleWebApp: {
    title: "Arı Yatay",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
