import { ContentSlideCard } from "@/ui/atoms";
import { carouselSlides } from "../page.properties";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "basis-full",
  md: "basis-full",
  lg: "basis-full",
};

export const Hero = () => {
  return (
    <Section fadeIn={true} hasPadding={false}>
      <Container>
        <Carousel
          gapClass="px-[0px]"
          options={{ loop: true }}
          marginTop="mt-4 md:mt-6 lg:-mt-7"
          slideSizeClasses={customSlideClasses}
        >
          {carouselSlides.map((contents) => (
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
