import Image from "next/image";
import Link from "next/link";
import Desk from "./desk";
import { Suspense } from "react";

async function AccountDesk({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const { account, notice } = await searchParams;
  return <Desk accountStatus={typeof account === "string" ? account : undefined} noticeStatus={typeof notice === "string" ? notice : undefined} />;
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <header className="masthead">
        <Link className="brand" href="/">물결편지 <span>COASTAL LETTER</span></Link>
        <nav aria-label="주 메뉴"><a href="#stories">바다 이야기</a><a href="#notices">공지사항</a><a href="#account">계정</a></nav>
      </header>
      <main>
        <section className="hero">
          <Image src="/images/hero.jpg" alt="" fill priority sizes="100vw" />
          <div className="hero-copy">
            <p className="eyebrow">COASTAL LETTER</p>
            <h1>바다에서 온<br />한 통의 편지</h1>
            <p>제철 해산물 이야기와 물결편지의 새 소식을 전합니다.</p>
            <a className="button" href="#notices">공지사항 보기 <span aria-hidden>↗</span></a>
          </div>
        </section>
        <section className="stories wrap" id="stories">
          <p className="eyebrow">FROM THE COAST</p>
          <h2>바다 이야기</h2>
          <div className="story-grid">
            <article><Image src="/images/fish-market.jpg" alt="어시장 풍경" width={640} height={400} /><h3>어시장의 아침</h3><p>하루의 첫 경매가 시작되면 항구는 금세 활기를 띱니다. 어종별로 채워진 상자에는 그날 바다가 내어준 계절이 담겨 있습니다.</p></article>
            <article><Image src="/images/crab-meal.jpg" alt="게 요리 한 상" width={640} height={400} /><h3>식탁에 오른 바다</h3><p>게를 쪄서 따뜻할 때 맛보면 살의 단맛이 먼저 느껴집니다. 남은 살은 볶음밥이나 국에 넣어 한 끼 더 즐길 수 있습니다.</p></article>
          </div>
        </section>
        <Suspense fallback={<p className="wrap">공지와 계정을 불러오는 중입니다.</p>}><AccountDesk searchParams={searchParams} /></Suspense>
      </main>
      <footer className="wrap">물결편지 <span>COASTAL LETTER</span></footer>
    </>
  );
}