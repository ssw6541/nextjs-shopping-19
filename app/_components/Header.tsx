import Link from "next/link";
import { navItems, utilityLinks } from "../_data/shop";

export function Header() {
  return (
    <header>
      <a href="#" className="block bg-brand px-4 py-3 text-center text-xs text-white md:text-sm">
        특가 뜨면 카톡이 울려요 · 갑각류 비밀창고로 모십니다
      </a>

      {/* PC 유틸리티 링크 */}
      <div className="mx-auto hidden max-w-[1200px] justify-end gap-4 py-2.5 text-xs text-secondary md:flex">
        {utilityLinks.map((l) => (
          <a key={l} href="#">{l}</a>
        ))}
      </div>

      <div className="border-b border-line md:border-b">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 md:px-0 md:py-6">
          <Link href="/" className="text-lg font-bold text-ink md:text-2xl md:leading-8">
            바다곳간
          </Link>
          {/* 모바일: 간단 링크 / PC: 메인 메뉴 */}
          <div className="flex gap-4 text-xs text-ink md:hidden">
            <a href="#">로그인</a>
            <a href="#">장바구니 0</a>
            <a href="#">메뉴</a>
          </div>
          <nav className="hidden gap-10 text-base font-medium md:flex">
            {navItems.map((n) => (
              <a key={n} href="#">{n}</a>
            ))}
          </nav>
        </div>
      </div>

      {/* 모바일 카테고리 메뉴 (가로 스크롤) */}
      <nav className="flex gap-6 overflow-x-auto border-b border-line px-4 py-3 text-sm font-medium whitespace-nowrap md:hidden">
        {navItems.map((n) => (
          <a key={n} href="#">{n}</a>
        ))}
      </nav>
    </header>
  );
}
