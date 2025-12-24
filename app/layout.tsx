import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JSChoIog",
  description:
    "성실함과 열정을 바탕으로 성장하는 개발자 JSChoIog의 기술 블로그입니다.",
};

// ✅ @modal parallel route를 쓸 거라서 modal 슬롯을 같이 받음
export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50`}
      >
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="pt-20">{children}</main>

          {/* ✅ 프로젝트 모달이 여기로 렌더됨 */}
          {modal}

          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
