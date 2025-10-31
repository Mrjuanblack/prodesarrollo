import { Newspaper } from "lucide-react";
import { news } from "../page.properties";
import { Button, NewsCard } from "@/ui/atoms";
import { SectionHeader } from "@/ui/organism";
import { Carousel, Container, Section } from "@/ui/molecules";

export const NewsCarousel = () => {
  return (
    <Section fadeIn={true}>
      <Container className="flex flex-col items-center">
        <SectionHeader title="Noticias" icon={Newspaper} />

        <Carousel>
          {news.map((news) => (
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
