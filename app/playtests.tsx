"use client";

import { useState } from "react";

const tests = [
  {
    id: "signal", title: "시그널 리레이", version: "0.1.0", status: "진행 중",
    genre: "경로 퍼즐", duration: "약 2분", icon: "radio", theme: "violet",
    description: "폐쇄된 관측소에서 중계기 두 곳을 방문한 뒤 연결 지점에 도착하는 경로 퍼즐입니다.",
    checks: ["중계기와 출구를 한눈에 구분할 수 있나요?", "이동과 재시작 방법이 명확한가요?"],
  },
  {
    id: "fern", title: "펀우드 패스", version: "0.0.4", status: "모집 중",
    genre: "탐험", duration: "예상 10분", icon: "trees", theme: "green",
    description: "숲길의 표식과 지형을 따라 야영지를 찾는 탐험 게임입니다. 빌드 공개를 준비 중입니다.",
    checks: ["표지판 없이도 길을 찾을 수 있나요?", "지도에서 지나온 길을 확인하기 쉬운가요?"],
  },
  {
    id: "dust", title: "더스트 오비터", version: "0.0.8", status: "종료",
    genre: "우주 비행", duration: "약 8분", icon: "rocket", theme: "orange",
    description: "소형 탐사선으로 잔해 지대를 지나 정거장에 도킹하는 테스트였습니다. 이번 테스트는 종료됐습니다.",
    checks: ["감속 시점이 예측 가능한가요?", "도킹 지점의 안내가 충분한가요?"],
  },
] as const;
const filters = ["전체", "진행 중", "모집 중", "종료"] as const;
type Test = typeof tests[number];

function SignalDemo() {
  const [cell, setCell] = useState(0);
  const [relays, setRelays] = useState<number[]>([]);
  const done = cell === 15 && relays.length === 2;
  const walls = [5, 9, 10];

  function canMove(next: number) {
    return !done && !walls.includes(next) &&
      Math.abs(Math.floor(cell / 4) - Math.floor(next / 4)) + Math.abs(cell % 4 - next % 4) === 1;
  }

  function move(next: number) {
    if (next < 0 || next > 15 || !canMove(next)) return;
    setCell(next);
    if ((next === 3 || next === 12) && !relays.includes(next)) setRelays([...relays, next]);
  }

  return <div className="demo">
    <p>인접한 칸을 눌러 이동하세요. 중계기 ◇ 두 곳을 거쳐 출구 ↗에 도달하세요.</p>
    <div className="board" role="group" aria-label="시그널 리레이 게임판">
      {Array.from({ length: 16 }, (_, index) => {
        const label = walls.includes(index) ? "벽" : index === 15 ? "출구" : index === 3 || index === 12 ? (relays.includes(index) ? "연결된 중계기" : "중계기") : "통로";
        return <button key={index} type="button" className={cell === index ? "current" : walls.includes(index) ? "wall" : ""} disabled={!canMove(index)} aria-label={`${Math.floor(index / 4) + 1}행 ${index % 4 + 1}열 ${label}${cell === index ? ", 현재 위치" : ""}`} onClick={() => move(index)}>
          {cell === index ? "●" : walls.includes(index) ? "×" : index === 15 ? "↗" : index === 3 || index === 12 ? (relays.includes(index) ? "◆" : "◇") : "·"}
        </button>;
      })}
    </div>
    <p role="status">{done ? "연결 완료! 테스트를 마쳤습니다." : `중계기 ${relays.length}/2 연결`}</p>
    <button className="secondary" type="button" onClick={() => { setCell(0); setRelays([]); }}>재시작</button>
  </div>;
}

function TestDetail({ test }: { test: Test }) {
  return <section className="test-detail panel" id="test-detail" aria-labelledby="detail-title">
    <div><span className="status" data-status={test.status}>{test.status}</span><h2 id="detail-title">{test.title}</h2><p>{test.description}</p><p className="muted">{test.genre} · {test.duration} · 빌드 {test.version}</p></div>
    <div><h3>테스트 확인 항목</h3><ul>{test.checks.map((check) => <li key={check}>{check}</li>)}</ul></div>
    {test.id === "signal" && <details><summary>브라우저에서 테스트 시작</summary><SignalDemo /></details>}
  </section>;
}

export default function Playtests() {
  const [filter, setFilter] = useState<typeof filters[number]>("전체");
  const [selected, setSelected] = useState<Test>(tests[0]);
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase("ko-KR");
  const visibleTests = tests.filter((test) =>
    (filter === "전체" || test.status === filter) &&
    [test.title, test.genre, test.version, test.status].some((value) => value.toLocaleLowerCase("ko-KR").includes(search)),
  );

  function openTest(test: Test) {
    setSelected(test);
    document.getElementById("test-detail")?.scrollIntoView({ block: "nearest" });
  }

  return <section id="playtests" aria-labelledby="playtests-title">
    <header className="page-head"><h1 id="playtests-title">플레이테스트</h1><p>개발 중인 인디게임 빌드를 둘러보고 브라우저에서 체험하세요.</p></header>
    <section className="featured" id="featured" aria-labelledby="featured-title">
      <div className="featured-copy">
        <span className="status" data-status="진행 중">플레이 가능</span>
        <h2 id="featured-title">시그널 리레이</h2>
        <p>관측소의 중계기 두 곳을 연결하는 브라우저 경로 퍼즐.</p>
        <button type="button" onClick={() => openTest(tests[0])}>테스트 상세 보기 <span aria-hidden>↗</span></button>
      </div>
      <div className="signal-art" aria-hidden><span>◇</span><span>●</span><span>◇</span></div>
    </section>
    <section id="test-library" aria-labelledby="library-title">
      <div className="library-head">
        <h2 id="library-title">빌드 탐색</h2>
        <label className="build-search"><span>빌드 검색</span><input type="search" value={query} placeholder="게임 이름, 장르, 버전" onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <div className="filters" role="group" aria-label="테스트 상태">
        {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      {visibleTests.length === 0 && <p role="status">조건에 맞는 빌드가 없습니다.</p>}
      <div className="test-grid">
        {visibleTests.map((test) => <button key={test.id} type="button" className="test-card" aria-pressed={selected.id === test.id} aria-controls="test-detail" onClick={() => openTest(test)}>
          <span className={`card-art ${test.theme}`} aria-hidden><span className="card-icon" style={{ maskImage: `url(https://cdn.jsdelivr.net/npm/lucide-static@0.468.0/icons/${test.icon}.svg)` }} /></span>
          <span className="card-content"><span className="status" data-status={test.status}>{test.status}</span><strong>{test.title}</strong><span className="muted">{test.genre} · v{test.version}</span></span>
        </button>)}
      </div>
    </section>
    <TestDetail key={selected.id} test={selected} />
  </section>;
}