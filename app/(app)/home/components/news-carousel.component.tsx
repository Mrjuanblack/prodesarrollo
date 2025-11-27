"use client";

import { Newspaper } from "lucide-react";
import { Button, NewsCard } from "@/ui/atoms";
import { SectionHeader } from "@/ui/organism";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";
import { useNewsList } from "@/hooks/news/useNewsList";
import { useRouter } from "next/navigation";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
};

export const NewsCarousel = () => {
  const router = useRouter();
  
  const { data: news } = useNewsList({
    page: 0,
    size: 10,
  });

  return (
    <Section hasPadding={false} fadeIn={true}>
      <Container className="mt-5 lg:mt-0 w-full flex flex-col items-center">
        <SectionHeader title="Noticias" icon={Newspaper} />

        <div className="w-full">
          <Carousel slideSizeClasses={customSlideClasses}>
            {news?.data?.map((news) => (
              <NewsCard key={news.id} item={news} />
            ))}
          </Carousel>
        </div>

        <Button
          variant="bordered"
          text="Ver más noticias"
          className="font-semibold w-fit mt-5 lg:mt-10"
          onClick={() => router.push("/news")}
        />
      </Container>
    </Section>
  );
};
