import { categories, categoryImages } from "../_data/shop";
import { Button, Photo, Section, SectionTitle } from "./ui";

export function CategoryIntro() {
  return (
    <Section bg="bg-subtle">
      <SectionTitle>{"게부터 랍스터까지.\n골라만 주세요."}</SectionTitle>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-8">
        {categories.map((c, i) => (
          <div key={c} className="flex flex-col gap-2 md:gap-4">
            <Photo
              name={categoryImages[i]}
              alt={c}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-40 md:h-[280px]"
            />
            <p className="text-base font-medium text-ink md:text-lg md:font-bold">{c}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Options() {
  const options = [
    { name: "활 (살아있는 상태로)", desc: "활 상품 설명 영역", image: "lobster-claws" },
    { name: "자숙 (쪄서)", desc: "자숙 상품 설명 영역", image: "red-crab-ice" },
  ];
  return (
    <Section>
      <SectionTitle>{"활로 받을까,\n쪄서 받을까."}</SectionTitle>
      <div className="grid gap-8 md:grid-cols-2">
        {options.map((o) => (
          <div key={o.name} className="flex flex-col gap-3 md:gap-4">
            <Photo name={o.image} alt={o.name} sizes="(min-width: 768px) 50vw, 100vw" className="h-60 md:h-[360px]" />
            <p className="text-lg font-bold md:text-2xl md:leading-8">{o.name}</p>
            <p className="text-base text-secondary">{o.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Managers() {
  const shots = [
    { image: "market-tank", alt: "수조에 담긴 활 수산물" },
    { image: "market-fish", alt: "얼음 위에 진열한 생선" },
    { image: "market-shellfish", alt: "진열대의 게와 조개류" },
    { image: "croaker-ice", alt: "얼음 위에 놓인 조기" },
  ];
  return (
    <Section bg="bg-subtle">
      <SectionTitle sub="아침마다 게부터 고르는 점장님들.">고르는 사람이 다릅니다.</SectionTitle>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {shots.map((s, i) => (
          <div key={s.image} className="flex flex-col gap-2 md:gap-3">
            <Photo name={s.image} alt={s.alt} className="h-[200px] md:h-80" />
            <p className="text-base font-medium md:text-lg md:font-bold">○○점 점장 {i + 1}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Reviews() {
  const shots = [
    { image: "crab-meal", alt: "상에 오른 찐 게" },
    { image: "crab-platter", alt: "접시에 담긴 대게" },
    { image: "seafood", alt: "해물 모듬 요리" },
  ];
  return (
    <Section>
      <SectionTitle>먼저 받아본 분들.</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {shots.map((s) => (
          <article key={s.image} className="flex flex-col gap-3 rounded-xl bg-subtle p-4 md:gap-4 md:p-8">
            <Photo name={s.image} alt={s.alt} sizes="(min-width: 768px) 33vw, 100vw" className="h-40 md:h-[200px]" />
            <p className="text-base">후기 내용이 들어가는 영역입니다. 구매 후기 텍스트를 여기에 넣어 주세요.</p>
            <p className="text-xs text-tertiary">구매자 · 상품명</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function MoreCategories() {
  const tiles = [
    { name: "수산물", image: "fish-market" },
    { name: "농산물", image: "vegetables" },
    { name: "선물세트", image: "gift-basket" },
  ];
  return (
    <Section bg="bg-subtle">
      <SectionTitle>갑각류 말고도.</SectionTitle>
      <div className="grid gap-6 md:grid-cols-3">
        {tiles.map((t) => (
          <div key={t.name} className="flex flex-col gap-2 md:gap-4">
            <Photo name={t.image} alt={t.name} sizes="(min-width: 768px) 33vw, 100vw" className="h-[180px] md:h-[280px]" />
            <p className="text-lg font-bold">{t.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function GiftBanner() {
  return (
    <section className="bg-brand py-16 text-center md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-4">
        <SectionTitle tone="light">{"명단만 주시면,\n여러 곳에 나눠 보내요."}</SectionTitle>
        <p className="mb-6 text-base text-line-strong md:mb-6 md:text-lg">선물 배송 안내 문구가 들어가는 영역입니다.</p>
        <Button variant="white" className="w-full md:w-auto">선물세트 보기</Button>
      </div>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="py-16 text-center md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4">
        <h2 className="text-[32px] font-bold leading-[44px] md:text-[56px] md:leading-[72px]">대게 킹크랩은 바다곳간.</h2>
        <Button className="w-full md:w-auto" href="/product/detail.html?product_no=41">대게 구매하기</Button>
      </div>
    </section>
  );
}
