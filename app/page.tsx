import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { ProductLineup } from "./_components/ProductLineup";
import {
  CategoryIntro,
  ClosingCta,
  GiftBanner,
  Managers,
  MoreCategories,
  Options,
  Reviews,
} from "./_components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductLineup />
        <CategoryIntro />
        <Options />
        <Managers />
        <Reviews />
        <MoreCategories />
        <GiftBanner />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
