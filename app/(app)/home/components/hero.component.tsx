import { useState } from "react";
import { ContentSlideCard } from "@/ui/atoms";
import { carouselSlides } from "../page.properties";
import { Carousel, Container, Section } from "@/ui/molecules";

const SLIDES_PER_VIEW = 1;

export const Hero = () => {
  const [startIndex, setStartIndex] = useState(0);

  const totalItems = carouselSlides.length;
  const totalSlides = Math.ceil(totalItems / SLIDES_PER_VIEW);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentContents = carouselSlides.slice(
    startIndex * SLIDES_PER_VIEW,
    (startIndex + 1) * SLIDES_PER_VIEW
  );

  return (
    <Section fadeIn={true}>
      <Container>
        <Carousel
          currentIndex={startIndex}
          totalSlides={totalSlides}
          paginationPosition="inside"
          slidesPerView={SLIDES_PER_VIEW}
          onPrev={handlePrev}
          onNext={handleNext}
        >
          {currentContents.map((contents) => (
            <ContentSlideCard
              id={contents.id}
              key={contents.id}
              img={contents.img}
              items={contents.items}
            />
          ))}
        </Carousel>
      </Container>
    </Section>
  );
};
