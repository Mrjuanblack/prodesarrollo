"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Spinner } from "@heroui/react";
import { Container, Section } from "@/ui/molecules";
import { Carousel } from "@/ui/molecules";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";
import { useHomeCarousel } from "@/hooks/homeCarousel/useHomeCarousel";
import { HomeCarouselSlide } from "@/domain/HomeCarouselSlide";
import { buildStorageUrl } from "@/lib/storage-url";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "basis-full",
  md: "basis-full",
  lg: "basis-full",
};

interface ContentBlockCardProps {
  title: string;
  description: string;
  className?: string;
}

const ContentBlockCard: React.FC<ContentBlockCardProps> = ({
  title,
  description,
  className,
}) => (
  <div
    className={`flex flex-col h-full bg-primary md:bg-primary/60 rounded-b-2xl md:rounded-2xl p-4 md:p-6 lg:p-8 ${className ?? ""}`}
  >
    <h3 className="text-white text-[14px] md:text-[18px] lg:text-[22px] font-bold mb-2">
      {title}
    </h3>
    <p className="text-white text-[12px] md:text-[16px] lg:text-[20px] leading-relaxed">
      {description}
    </p>
  </div>
);

const SlideContent: React.FC<{ slide: HomeCarouselSlide }> = ({ slide }) => {
  const cards: { key: "left" | "right"; title: string; description: string }[] =
    [];
  if (slide.leftCard) {
    cards.push({ key: "left", ...slide.leftCard });
  }
  if (slide.rightCard) {
    cards.push({ key: "right", ...slide.rightCard });
  }

  return (
    <div className="relative w-full h-[317px] lg:h-[580px] overflow-hidden">
      <div className="absolute inset-0 z-0 h-[230px] md:h-full">
        <Image
          src={buildStorageUrl(slide.imageUrl)}
          fill
          quality={80}
          sizes="100vw"
          alt="Slide del carrusel"
          className="object-cover will-change-transform"
        />
      </div>

      <div className="absolute inset-0 z-2 flex flex-col justify-end">
        <div
          className={`w-full h-auto grid grid-cols-1 md:p-10 lg:px-15 md:gap-7 ${
            cards.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1"
          }`}
        >
          {cards.map((card) => (
            <ContentBlockCard
              key={card.key}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const { data: slides, isLoading } = useHomeCarousel();

  // Embla's loop mode duplicates slides under the hood. With basis-full and
  // only 2 slides it places the clones on top of the originals and the
  // visible track ends up empty. Stick to a finite carousel until we have
  // at least 3 slides. Memoized so embla doesn't re-init every render.
  const carouselOptions = useMemo(
    () => ({ loop: (slides?.length ?? 0) >= 3 }),
    [slides?.length]
  );

  if (isLoading) {
    return (
      <Section hasPadding={false}>
        <Container>
          <div className="flex justify-center items-center h-[317px] lg:h-[580px]">
            <Spinner />
          </div>
        </Container>
      </Section>
    );
  }

  if (!slides || slides.length === 0) {
    return null;
  }

  // No fadeIn here — the framer-motion useInView in Section sometimes leaves
  // the carousel stuck at opacity 0 on first paint when it sits at the very
  // top of the page. The carousel already animates between slides on its own.
  return (
    <Section hasPadding={false}>
      <Container>
        <Carousel
          gapClass="px-[0px]"
          options={carouselOptions}
          marginTop="mt-4 md:mt-6 lg:-mt-7"
          slideSizeClasses={customSlideClasses}
        >
          {slides.map((slide) => (
            <SlideContent key={slide.id} slide={slide} />
          ))}
        </Carousel>
      </Container>
    </Section>
  );
};
