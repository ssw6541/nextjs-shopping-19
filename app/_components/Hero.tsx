import { Button, Photo } from "./ui";

export function Hero() {
  return (
    <section className="bg-subtle py-12 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 md:grid md:grid-cols-2 md:items-center md:gap-x-16 md:gap-y-6 md:px-0 xl:px-0">
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <h1 className="text-[32px] font-bold leading-[44px] text-ink md:text-[56px] md:leading-[72px]">
            대게 킹크랩은
            <br />
            <span className="text-accent">“바다곳간.”</span>
          </h1>
          <p className="mt-4 text-base text-secondary md:mt-6 md:text-lg md:leading-7">
            러시아 수입업체에서 직송한 활대게와 킹크랩을 매일 아침 직영 매장 점장이 직접 골라 보내드립니다.
          </p>
        </div>

        <Photo
          name="hero"
          alt="접시에 올린 자숙 대게"
          priority
          sizes="(min-width: 1200px) 600px, (min-width: 768px) 50vw, 100vw"
          className="h-[300px] md:col-start-2 md:row-span-2 md:row-start-1 md:h-[480px]"
        />

        <div className="flex flex-col gap-3 md:col-start-1 md:row-start-2 md:flex-row md:gap-4 md:self-start">
          <Button href="/product/detail.html?product_no=41">대게 구매하기</Button>
          <Button variant="outline" href="#lineup">전체 품목 보기</Button>
        </div>
      </div>
    </section>
  );
}
