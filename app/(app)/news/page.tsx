"use client";

import { HeroSimple } from "@/ui/organism";
import { Container, Section } from "@/ui/molecules";
import hero_simple from "@/public/hero-two-simple.jpg";
import { useNewsList } from "@/hooks/news/useNewsList";
import { BackgroundSection, NewsCard } from "@/ui/atoms";
import { OrderFilter } from "./components/order-filter.component";
import { CategoryFilter } from "./components/category-filter.component";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function News() {
  const { data: news } = useNewsList({
    page: 0,
    size: 10,
  });

  return (
    <>
      <HeroSimple title="Noticias" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container>
          <div className="flex flex-col sm:flex-row md:justify-end gap-3 md:gap-5">
            <OrderFilter />
            <CategoryFilter />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-13">
            {news?.data?.map((news) => (
              <NewsCard key={news.id} item={news} showImage={true} />
            ))}
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
