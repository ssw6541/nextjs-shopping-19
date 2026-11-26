import { categories, products, type Product } from "../_data/shop";
import { CategoryTag, Photo, Section } from "./ui";

function ProductCard({ name, original, sale, image, examplePrice }: Product) {
  return (
    <a href="#" className="flex flex-col gap-3">
      <Photo name={image} alt={name} className="h-[164px] md:h-[280px]" />
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 text-sm leading-5 text-ink">{name}</p>
        {original && <p className="text-sm leading-5 text-tertiary line-through">{original}</p>}
        <p className="text-xl font-bold leading-7 text-ink">{sale}</p>
        {examplePrice && <p className="text-xs text-secondary">예시 가격</p>}
      </div>
    </a>
  );
}

export function ProductLineup() {
  return (
    <Section id="lineup">
      <h2 className="text-2xl font-bold md:text-4xl md:leading-[48px]">전체 품목</h2>
      <div className="mt-4 flex flex-wrap gap-2 md:mt-6 md:gap-3">
        {categories.map((c) => (
          <CategoryTag key={c}>{c}</CategoryTag>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-12 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </Section>
  );
}
