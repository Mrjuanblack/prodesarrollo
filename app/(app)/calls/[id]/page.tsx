"use client";

import Image from "next/image";
import { useState } from "react";
import { HeroSimple } from "@/ui/organism";
import { useParams } from "next/navigation";
import { projects } from "./page.properties";
import { Project } from "@/domain/Projects";
import hero_simple from "@/public/hero-simple.svg";
import { ArrowDownToLine, Link } from "lucide-react";
import noticiaExample from "@/public/noticia-example.svg";
import { Carousel, Container, IconTitle, Section } from "@/ui/molecules";
import { BackgroundSection, Button, Chip, Text, Title } from "@/ui/atoms";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";
import { formatDate } from "@/utils/date.utilities";

const Call = () => {
  const params = useParams();
  const projectId = params.id as string;

  const initialProject = projectId
    ? projects.find((p) => p.id === projectId) || null
    : null;

  const [project, setProject] = useState<Project | null>(initialProject);

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <Title
          text={
            projectId
              ? "Proyecto no encontrado"
              : "ID de proyecto no proporcionado"
          }
        />
      </Container>
    );
  }

  const { date, title, documents, photosUrls, description, relatedProjects } =
    project;

  const publishedBy = "Ana García";
  const projectDate = formatDate(date);
  const actas = documents;
  const imgs = photosUrls.map((url, index) => ({
    id: index.toString(),
    img: url || noticiaExample,
    alt: `Foto ${index + 1} del proyecto ${title}`,
  }));

  return (
    <>
      <HeroSimple
        title={`Convocatorias - ${title}`}
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center space-y-6">
          <IconTitle
            highlightFirstLetter={false}
            title={`Proyecto ${title} / Obra`}
          />

          <div className="self-start space-y-5">
            <Chip />

            <div>
              <Title
                text={title}
                highlightFirstLetter={false}
                className="lg:text-[20px]"
              />

              <Text
                text={`Fecha: ${projectDate}`}
                className="text-primary font-normal text-[20px]"
              />

              <Text
                text={`Publicado por: ${publishedBy}`}
                className="text-primary font-normal text-[20px]"
              />
            </div>

            <Text
              className="text-justify text-[20px]"
              text={<>{description}</>}
            />

            {relatedProjects && relatedProjects.length > 0 && (
              <div className="flex items-center gap-2">
                <IconTitle
                  Icon={Link}
                  classNameTitle="md:font-normal md:text-[20px]"
                  title="Interventoría asociada: "
                  highlightFirstLetter={false}
                />
                <Title
                  text={relatedProjects[0].title}
                  className="md:text-[20px]"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <Section hasPadding={false} fadeIn={true}>
        <Container>
          <IconTitle
            highlightFirstLetter={false}
            title="Documentos del proyecto"
            className="mb-10"
          />

          <div className="flex flex-col gap-4">
            {actas.map((acta) => (
              <a
                key={acta.id}
                href={acta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black hover:text-primary cursor-pointer transition-colors"
              >
                <div className="bg-[#D9E0FF] p-2 rounded-lg">
                  <ArrowDownToLine size={20} className="text-primary" />
                </div>
                <span className="text-[20px] font-medium">{acta.name}</span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center">
          <IconTitle
            highlightFirstLetter={false}
            title="Registro fotográfico"
            className="mb-10"
          />

          <Carousel>
            {imgs.map((img) => (
              <div
                key={img.id}
                className="relative h-[281px] w-[421px] overflow-hidden"
              >
                <Image
                  fill
                  src={img.img}
                  alt={img.alt}
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

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
};

export default Call;
