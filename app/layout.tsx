import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";

export const metadata: Metadata = {
  title: "AIツール比較サイト",
  description: "ChatGPT、Claude、Geminiなど人気AIツールを徹底比較。用途別・カテゴリ別に最適なAIツールが見つかります。",
  verification: {
    google: "X6orpG-UcJpIZWQ8kOvac6XrXv7_GocQWCtvzKjtPw0",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "AIツール比較サイト",
    title: "AIツール比較サイト",
    description: "ChatGPT、Claude、Geminiなど人気AIツールを徹底比較。用途別・カテゴリ別に最適なAIツールが見つかります。",
  },
  twitter: {
    card: "summary",
    title: "AIツール比較サイト",
    description: "ChatGPT、Claude、Geminiなど人気AIツールを徹底比較。用途別・カテゴリ別に最適なAIツールが見つかります。",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3529976649815717"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
