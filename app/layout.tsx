import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// Figma 디자인과 동일한 폰트 (Pretendard 적용 전까지 Noto Sans KR 사용)
const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "바다곳간",
  description: "대게·킹크랩·랍스터, 러시아 직송 활대게 전문 쇼핑몰",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${noto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
