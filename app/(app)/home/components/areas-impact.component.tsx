import { useState } from "react";
import { Settings } from "lucide-react";
import { SectionHeader } from "@/ui/organism";
import { services } from "../page.properties";
import { Button, ServiceCard } from "@/ui/atoms";
import { Carousel, Container, Section } from "@/ui/molecules";

const SLIDES_PER_VIEW = 3;

export const AreasImpact = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = services.length;
  const totalSlides = Math.ceil(totalItems / SLIDES_PER_VIEW);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentAreas = services.slice(
    startIndex * SLIDES_PER_VIEW,
    (startIndex + 1) * SLIDES_PER_VIEW
  );

  return (
    <Section className="py-12 bg-white" fadeIn={true}>
      <Container className="flex flex-col items-center">
        <SectionHeader
          icon={Settings}
          title="Áreas de Impacto"
          description="Celebramos y suscribimos convenios y contratos interadministrativos, civiles y comerciales con entidades públicas y privadas, orientados al fortalecimiento de la gestión pública y a la promoción eficiente del desarrollo territorial."
        />

        <Carousel
          currentIndex={startIndex}
          totalSlides={totalSlides}
          onPrev={handlePrev}
          onNext={handleNext}
        >
          {currentAreas.map((services) => (
            <ServiceCard key={services.id} item={services} />
          ))}
        </Carousel>

        <Button
          color="primary"
          variant="bordered"
          text="Ver más"
          className="font-semibold w-fit mt-10"
          onClick={() => console.log("Ver más")}
        />
      </Container>
    </Section>
  );
};
