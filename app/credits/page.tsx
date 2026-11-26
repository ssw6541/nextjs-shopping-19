import type { Metadata } from "next";
import Link from "next/link";
import { credits } from "../_data/credits";

export const metadata: Metadata = {
  title: "이미지 출처 | 바다곳간",
};

export default function CreditsPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12 md:py-24 xl:px-0">
      <Link href="/" className="text-sm text-secondary">← 메인으로</Link>
      <h1 className="mt-4 text-2xl font-bold md:text-4xl">이미지 출처</h1>
      <p className="mt-2 text-secondary">
        이 사이트의 사진은 Wikimedia Commons의 오픈 라이선스(CC0, 퍼블릭 도메인, CC BY, CC BY-SA) 이미지입니다.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {credits.map((c) => (
          <li key={c.file} className="flex flex-col gap-1 py-4 text-sm md:flex-row md:justify-between">
            <span className="text-ink">
              {c.title} <span className="text-tertiary">— {c.artist}</span>
            </span>
            <span className="text-secondary">
              {c.license} ·{" "}
              <a href={c.source} className="underline" target="_blank" rel="noopener noreferrer">
                원본
              </a>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
