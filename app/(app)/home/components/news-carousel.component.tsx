import { Newspaper } from "lucide-react";
import { news } from "../page.properties";
import { Button, NewsCard } from "@/ui/atoms";
import { SectionHeader } from "@/ui/organism";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
};

export const NewsCarousel = () => {
  return (
    <Section fadeIn={true}>
      <Container className="w-full flex flex-col items-center">
        <SectionHeader title="Noticias" icon={Newspaper} />

        <div className="w-full">
          <Carousel slideSizeClasses={customSlideClasses}>
            {news.map((news) => (
              <NewsCard key={news.id} item={news} />
            ))}
          </Carousel>
        </div>

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
