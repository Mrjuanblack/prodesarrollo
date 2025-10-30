import { useState } from "react";
import { Newspaper } from "lucide-react";
import { Divider } from "@heroui/react";
import { projects } from "../page.properties";
import { SectionHeader } from "@/ui/organism";
import { Button, ProjectCard } from "@/ui/atoms";
import { Carousel, Container, Section } from "@/ui/molecules";

const SLIDES_PER_VIEW = 3;

export const FeaturedProjects = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = projects.length;
  const totalSlides = Math.ceil(totalItems / SLIDES_PER_VIEW);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentProjects = projects.slice(
    startIndex * SLIDES_PER_VIEW,
    (startIndex + 1) * SLIDES_PER_VIEW
  );

  return (
    <Section
      fadeIn={true}
      className="py-20 bg-linear-to-b from-[#EFF3FD] to-[#FFFFFF] w-full"
    >
      <Container className="flex flex-col items-center">
        <SectionHeader
          icon={Newspaper}
          title="Proyectos destacados"
          description="Nuestros proyectos reflejan el compromiso con el desarrollo social, económico y ambiental de las comunidades."
        />

        <Carousel
          currentIndex={startIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
        >
          {currentProjects.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </Carousel>

        <Button
          variant="solid"
          text="Ver todos los proyectos"
          className="font-semibold w-fit mt-10 bg-secondary"
          onClick={() => console.log("Navegar a noticias")}
        />

        <Divider className="w-[1023px] bg-secondary mt-15" />
      </Container>
    </Section>
  );
};
