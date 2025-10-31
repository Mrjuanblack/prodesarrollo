import { Newspaper } from "lucide-react";
import { Divider } from "@heroui/react";
import { projects } from "../page.properties";
import { SectionHeader } from "@/ui/organism";
import { Button, ProjectCard } from "@/ui/atoms";
import { Carousel, Container, Section } from "@/ui/molecules";

export const FeaturedProjects = () => {
  return (
    <Section
      fadeIn={true}
      className="bg-linear-to-b from-[#EFF3FD] to-[#FFFFFF]"
    >
      <Container className="flex flex-col items-center">
        <SectionHeader
          icon={Newspaper}
          title="Proyectos destacados"
          description="Nuestros proyectos reflejan el compromiso con el desarrollo social, económico y ambiental de las comunidades."
        />

        <Carousel>
          {projects.map((item) => (
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
