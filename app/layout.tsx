import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "물결편지 | 바다의 소식",
  description: "제철 해산물 이야기와 물결편지의 운영 공지를 만나보세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}