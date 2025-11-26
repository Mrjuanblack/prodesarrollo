"use client";

import Image from "next/image";
import { imgs } from "./page.properties";
import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
import { BackgroundSection, Chip, GlobalLoader, Text } from "@/ui/atoms";
import { Carousel, Container, IconTitle, Section } from "@/ui/molecules";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";
import { useParams } from "next/navigation";
import useNews from "@/hooks/news/useNews";
import { getNewsCategoryLabel } from "@/domain/News";
import { getProdOrDevSuffix } from "@/utils/utils";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-1/2",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
};

export default function New() {
  const { id } = useParams();
  const { data: news } = useNews(id as string);
  if (!news) {
    return <GlobalLoader />;
  }
  return (
    <>
      <HeroSimple title="Noticias" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center space-y-6">
          <IconTitle
            highlightFirstLetter={false}
            title={news.title}
          />

          <div className="self-start space-y-5">
            <Chip category={`Categoría: ${getNewsCategoryLabel(news.category)}`} />

            <div>
              <Text
                text={`Fecha : ${news.createdAt.toLocaleDateString()}`}
                className="text-primary font-normal text-[15px] md:text-[18px] lg:text-[20px]"
              />

              {/* <Text
                text="Publicado por: Ana García"
                className="text-primary font-normal text-[15px] md:text-[18px] lg:text-[20px]"
              /> */}
            </div>

            <div className="text-justify text-[15px] md:text-[18px] lg:text-[20px] font-normal text-black space-y-4">
              {news.content.split('\n\n').filter(paragraph => paragraph.trim()).map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <IconTitle
              highlightFirstLetter={false}
              title="Registro fotográficos"
              className="mt-10 lg:mt-20 mb-5 lg:mb-10"
            />

            <Carousel slideSizeClasses={customSlideClasses}>
              {news.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative h-[135px] md:h-[200px] lg:h-[281px] overflow-hidden"
                >
                  <Image
                    fill
                    src={`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME}/${getProdOrDevSuffix()}/${photo.url}`}
                    alt={photo.url}
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
