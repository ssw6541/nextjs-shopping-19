import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORBIT LAB | 인디 플레이테스트 센터",
  description: "인디게임 테스트 상태와 빌드를 확인하고, 브라우저에서 샘플 테스트에 참여하세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}