import { ContentSlideCard } from "@/ui/atoms";
import { carouselSlides } from "../page.properties";
import { Carousel, Container, Section } from "@/ui/molecules";

const SLIDES_PER_VIEW = 1;

export const Hero = () => {
  return (
    <Section fadeIn={true} hasPadding={false}>
      <Container>
        <Carousel paginationPosition="inside" slidesPerView={SLIDES_PER_VIEW}>
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
