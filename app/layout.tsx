import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://ai-tools-compare-ten.vercel.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
  const gaScript = GA_ID
    ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`
    : null;

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* AdSense */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3529976649815717"
          crossOrigin="anonymous"
        />
        {/* Google Analytics - Vercel環境変数 NEXT_PUBLIC_GA_ID に測定IDを設定してください (例: G-XXXXXXXXXX) */}
        {GA_ID && (
          <>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            {gaScript && (
              <script dangerouslySetInnerHTML={{ __html: gaScript }} />
            )}
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
