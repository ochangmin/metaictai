import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NextAuthProvider } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Meta R&D 플랫폼",
  description: "50개 기초과학 시뮬레이터와 10개 데이터 기반 R&D 플랫폼. 농업·환경·R&D 분야 AI를 구현합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NextAuthProvider>
          <div className="layout-content">
            <Navbar />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
