import { useState } from "react";
import { Newspaper } from "lucide-react";
import { news } from "../page.properties";
import { Button, NewsCard } from "@/ui/atoms";
import { SectionHeader } from "@/ui/organism";
import { Carousel, Container, Section } from "@/ui/molecules";

const SLIDES_PER_VIEW = 3;

export const NewsCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = news.length;
  const totalSlides = Math.ceil(totalItems / SLIDES_PER_VIEW);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentNews = news.slice(
    startIndex * SLIDES_PER_VIEW,
    (startIndex + 1) * SLIDES_PER_VIEW
  );

  return (
    <Section className="pb-20 bg-white" fadeIn={true}>
      <Container className="flex flex-col items-center">
        <SectionHeader title="Noticias" icon={Newspaper} />

        <Carousel
          currentIndex={startIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
        >
          {currentNews.map((news) => (
            <NewsCard key={news.id} item={news} />
          ))}
        </Carousel>

        <Button
          variant="bordered"
          text="Ver más noticias"
          className="font-semibold w-fit mt-10"
          onClick={() => console.log("Navegar a noticias")}
        />
      </Container>
    </Section>
  );
};
