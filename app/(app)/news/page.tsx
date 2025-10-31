"use client";

import { HeroSimple } from "@/ui/organism";
import { news } from "./page.properties";
import hero_simple from "@/public/hero-simple.svg";
import { Container, Section } from "@/ui/molecules";
import { BackgroundSection, NewsCard } from "@/ui/atoms";
import { OrderFilter } from "./components/order-filter.component";
import { CategoryFilter } from "./components/category-filter.component";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function News() {
  return (
    <>
      <HeroSimple title="Noticias" backgroundImage={hero_simple} />

      <Section className="py-20">
        <Container>
          <div className="flex justify-end gap-5">
            <OrderFilter />
            <CategoryFilter />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-13">
            {news.map((news) => (
              <NewsCard key={news.id} item={news} />
            ))}
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
