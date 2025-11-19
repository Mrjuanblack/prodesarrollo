"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
import { ArrowDownToLine, CheckCircle, Clock, Link as LinkIcon, Play, X } from "lucide-react";
import { Carousel, Container, IconTitle, Section } from "@/ui/molecules";
import { BackgroundSection, Button, Chip, GlobalLoader, Text, Title } from "@/ui/atoms";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
};
import useProject from "@/hooks/project/useProject";
import { useParams } from "next/navigation";
import { getProjectStatusLabel, getProjectTypeLabel, ProjectStatus } from "@/domain/Projects";
import { getProdOrDevSuffix } from "@/utils/utils";

const Call = () => {
  const { id } = useParams();
  const { data: project } = useProject(id as string);

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.STARTED:
        return <Play size={18} />;
      case ProjectStatus.COMPLETED:
        return <CheckCircle size={18} />;
      case ProjectStatus.IN_PROGRESS:
        return <Clock size={18} />;
      case ProjectStatus.CANCELLED:
        return <X size={18} />;
    }
  }

  if (!project) {
    return <GlobalLoader />;
  }

  return (
    <>
      <HeroSimple
        title="Convocatorias"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center space-y-6">
          <IconTitle
            highlightFirstLetter={false}
            title={`${project.title} - ${project.date.getFullYear()} / ${getProjectTypeLabel(project.type)}`}
          />

          <div className="self-start space-y-5">
            <Chip
              category={`Estado: ${getProjectStatusLabel(project.status)}`}
              icono={getStatusIcon(project.status)}
              isActive={project.status === ProjectStatus.COMPLETED}
            />

            <div>
              <Title
                text={project.id}
                highlightFirstLetter={false}
                className="lg:text-[20px]"
              />

              <Text
                text={`Fecha : ${project.date.toLocaleDateString('es-CO')}`}
                className="text-primary font-normal text-[20px]"
              />
            </div>

            <Text
              className="text-justify text-[20px]"
              text={project.description}
            />

            <div className="flex flex-col gap-2">
              {project.relatedProjects.map((p) => (
                <Link
                  key={p.id}
                  href={`/calls/${p.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <IconTitle
                    Icon={LinkIcon}
                    classNameTitle="md:font-normal md:text-[20px]"
                    title="Proyecto asociado: "
                    highlightFirstLetter={false}
                  />
                  <Title text={p.title} className="md:text-[20px]" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {project.documents.length > 0 && (
        <Section fadeIn={true}>
          <Container>
            <IconTitle
              highlightFirstLetter={false}
              title="Documentos del proyecto"
              className="mb-10"
            />

            <div className="flex flex-col gap-4">
              {project.documents.map((d) => (
                <div
                  key={d.id}
                  onClick={() => window.open(`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME}/${getProdOrDevSuffix()}/${d.url}`, '_blank')}
                  className="flex items-center gap-3 text-black hover:text-primary cursor-pointer transition-colors"
                >
                  <div className="bg-[#D9E0FF] p-2 rounded-lg">
                    <ArrowDownToLine size={20} className="text-primary" />
                  </div>
                  <span className="text-[20px] font-medium">{d.name}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {project.photos.length > 0 && (
        <Section fadeIn={true}>
          <Container className="flex flex-col items-center">
            <IconTitle
              highlightFirstLetter={false}
              title="Registro fotográficos"
              className="mb-10"
            />

            <Carousel slideSizeClasses={customSlideClasses}>
              {project.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative h-[281px] w-[421px] overflow-hidden"
                >
                  <Image
                    fill
                    src={`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME}/${getProdOrDevSuffix()}/${photo.url}`}
                    alt={photo.url}
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>

            <Button
              variant="solid"
              text="Quiero apoyar este proyecto"
              className="mt-10 bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
            />
          </Container>
        </Section>
      )}

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
};

export default Call;
