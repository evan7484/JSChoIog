import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "JSChoIog",
    template: "%s | JSChoIog",
  },
  description:
    "성실함과 열정을 바탕으로 성장하는 개발자 JSChoIog의 기술 블로그입니다.",
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  verification: {
    other: {
      "naver-site-verification": "f3181935906491b568c387c16d9d8d13a3021534",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 첫 페인트 전에 테마 클래스를 적용해 FOUC(잘못된 테마 깜빡임) 방지 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 dark:text-gray-200`}
      >
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "JSChoIog",
            url: SITE_URL,
            inLanguage: "ko",
          }}
        />
        <MotionConfig reducedMotion="user">
          <Header />
          {/* pt-24: 고정 헤더(모바일 80px/데스크톱 88px)에 본문이 가리지 않도록
              overflow-x-clip: About 히어로의 데코 블러 원이 모바일 가로 스크롤을 만들지 않도록 */}
          <main className="pt-24 overflow-x-clip">{children}</main>
          <Footer />
        </MotionConfig>
        {/* GA4 — 측정 ID가 설정된 환경(프로덕션)에서만 로드 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
