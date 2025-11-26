"use client";

import { Newspaper } from "lucide-react";
import { Divider } from "@heroui/react";
import { SectionHeader } from "@/ui/organism";
import { Button, ProjectCard } from "@/ui/atoms";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";
import { useProjects } from "@/hooks/project/useProjects";
import { useRouter } from "next/navigation";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/3",
  xl: "xl:basis-1/4",
};

export const FeaturedProjects = () => {
  const router = useRouter();
  
  const { data: projects } = useProjects({
    page: 0,
    size: 10,
    highlight: true,
  });

  return (
    <Section
      fadeIn={true}
      className="bg-linear-to-b from-[#EFF3FD] to-[#FFFFFF]"
    >
      <Container className="w-full flex flex-col items-center">
        <SectionHeader
          icon={Newspaper}
          title="Proyectos destacados"
          description="Nuestros proyectos reflejan el compromiso con el desarrollo social, económico y ambiental de las comunidades."
        />

        <div className="w-full">
          <Carousel slideSizeClasses={customSlideClasses}>
            {projects?.data?.map((item) => (
              <div key={item.id} className="h-full pb-5">
                <ProjectCard item={item} />
              </div>
            ))}
          </Carousel>
        </div>

        <Button
          variant="solid"
          text="Ver todos los proyectos"
          className="font-semibold w-fit mt-7 lg:mt-10 bg-secondary shadow-lg"
          onClick={() => router.push("/calls")}
        />

        <Divider className="lg:w-[1023px] bg-secondary mt-7 lg:mt-15" />
      </Container>
    </Section>
  );
};
