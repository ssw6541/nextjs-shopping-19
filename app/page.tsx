import { Suspense } from "react";
import Link from "next/link";
import Desk from "./desk";
import Playtests from "./playtests";

async function AccountDesk({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const { account, notice } = await searchParams;
  return <Desk accountStatus={typeof account === "string" ? account : undefined} noticeStatus={typeof notice === "string" ? notice : undefined} />;
}

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <a className="skip-link" href="#playtests">본문으로 건너뛰기</a>
      <header className="topbar">
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden>◒</span> ORBIT LAB</Link>
        <a className="account-link" href="#account">내 계정 <span aria-hidden>↗</span></a>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <nav aria-label="주 메뉴">
            <a href="#playtests">플레이테스트</a>
            <a href="#test-library">빌드 탐색</a>
            <a href="#notices">운영 공지</a>
          </nav>
          <div className="side-group">
            <h2>플레이 가능</h2>
            <a href="#featured">시그널 리레이 <small>브라우저 퍼즐</small></a>
          </div>
          <a className="credits" href="https://lucide.dev/license">아이콘 · Lucide</a>
        </aside>
        <main>
          <Playtests />
          <Suspense fallback={<p role="status">공지와 계정을 불러오는 중입니다.</p>}>
            <AccountDesk searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </>
  );
}