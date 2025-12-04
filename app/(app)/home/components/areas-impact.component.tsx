import {
  Wallet,
  Settings,
  PiggyBank,
  CheckCircle,
  Construction,
} from "lucide-react";
import { SectionHeader } from "@/ui/organism";
import { Button, ServiceCard } from "@/ui/atoms";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";
import { ServiceItem } from "@/ui/atoms/Cards/ServiceCard/service-card.properties";

const services: ServiceItem[] = [
  {
    id: 1,
    Icon: Construction,
    title: "Gestión integral de infraestructura estratégica",
    description: (
      <>
        Ejecutar <strong>obras civiles de alto impacto social</strong>,
        incluyendo infraestructura de vivienda, salud, educación, vías
        principales y terciarias, y servicios públicos (acueductos,
        alcantarillados, redes eléctricas) entre otras. Esto abarca la
        construcción, el equipamiento, las adecuaciones y el mantenimiento
        necesario
        <strong> para el desarrollo integral de las comunidades.</strong>
      </>
    ),
  },
  {
    id: 2,
    Icon: CheckCircle,
    title: "Interventoría, supervisión y asistencia técnica",
    description: (
      <>
        Proveer servicios especializados de interventoría, supervisión,
        auditoría y estructuración de proyectos. Incluye la ejecución de
        inspecciones y la prestación de asistencia técnica integral para
        <strong> garantizar la calidad y eficiencia </strong> en los asuntos
        relacionados con el objeto social.
      </>
    ),
  },
  {
    id: 3,
    Icon: PiggyBank,
    title: "Movilización y fomento de recursos financieros",
    description: (
      <>
        Promover las actividades necesarias para la consecución y ejecución de
        recursos económicos, aportes e ingresos lícitos. Esta gestión
        estratégica se enfoca en captar fondos nacionales e internacionales para
        <strong> aumentar la competitividad</strong> y financiar los planes de
        desarrollo.
      </>
    ),
  },
  {
    id: 4,
    Icon: Wallet,
    title: "Movilización y fomento de recursos financieros",
    description: (
      <>
        Promover las actividades necesarias para la consecución y ejecución de
        recursos económicos, aportes e ingresos lícitos. Esta gestión
        estratégica se enfoca en captar fondos nacionales e internacionales para
        <strong> aumentar la competitividad</strong> y financiar los planes de
        desarrollo.
      </>
    ),
  },
];

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "sm:basis-1/2",
  md: "md:basis-1/2",
  lg: "lg:basis-1/3",
};

export const AreasImpact = () => {
  return (
    <Section fadeIn={true}>
      <Container className="w-full flex flex-col items-center">
        <SectionHeader
          icon={Settings}
          title="Áreas de Impacto"
          description="Celebramos y suscribimos convenios y contratos interadministrativos, civiles y comerciales con entidades públicas y privadas, orientados al fortalecimiento de la gestión pública y a la promoción eficiente del desarrollo territorial."
        />

        <div className="w-full">
          <Carousel slideSizeClasses={customSlideClasses}>
            {services.map((services) => (
              <ServiceCard key={services.id} item={services} />
            ))}
          </Carousel>
        </div>

        <Button
          text="Ver más"
          variant="bordered"
          className="font-semibold w-fit mt-7 lg:mt-10"
          onClick={() => console.log("Ver más")}
        />
      </Container>
    </Section>
  );
};
