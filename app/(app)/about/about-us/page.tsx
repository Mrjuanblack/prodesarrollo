"use client";

import {
  InfoCard,
  MissionCardCard,
  TransparencyCard,
  BackgroundSection,
} from "@/ui/atoms";
import Image from "next/image";
import hero_simple from "@/public/hero-simple.svg";
import { Carousel, Container, Section } from "@/ui/molecules";
import { HeroSimple, SectionHeader } from "@/ui/organism";
import { infos, transparencies } from "./page.properties";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo.svg";
import { AboutSection } from "../../home/components/about-section.component";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-1/2",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
};

export default function AboutUs() {
  return (
    <>
      <HeroSimple title="¿Quiénes somos?" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container className="flex flex-col">
          <div className="hidden md:flex justify-center w-full">
            <Image
              src={pro_desarrollo_logo}
              alt="logo de pro desarrollo"
              className="h-[80px] w-fit"
            />
          </div>

          <AboutSection
            reverse={true}
            title="Naturaleza Institucional"
            classNameContainerVideos="justify-center lg:justify-end"
            classNameDots="hidden lg:h-full lg:w-[35%] lg:grid left-0"
            classNameVideo="w-[47.9%] md:w-[48.1%] lg:w-[85%] bg-default-100 p-1 lg:p-3 shadow-lg"
            videoSrc={[
              "https://www.youtube.com/embed/mn64ZdDpC6k",
              "https://www.youtube.com/embed/jdOT18uUuWc",
            ]}
            description={
              <>
                PRO. DESARROLLO es una asociación de utilidad común sin ánimo de
                lucro, constituida como entidad público-privada, conforme al
                artículo 96 de la Ley 489 de 1998.
                <br />
                <br />
                Su creación responde a la necesidad de:
                <ul className="list-disc list-inside ml-5">
                  <li>Fortalecer la gestión del desarrollo territorial.</li>
                  <li>Promover la inversión pública y privada.</li>
                  <li>
                    Articular esfuerzos interinstitucionales con alcance
                    nacional e internacional.
                  </li>
                </ul>
                <br />
                Como parte del sector descentralizado de la Rama Ejecutiva del
                Poder Público, actúa como instrumento técnico y operativo para
                la estructuración y ejecución de proyectos estratégicos.
                <br />
                <br />
                Gracias a su naturaleza mixta, PRO. DESARROLLO facilita:
                <ul className="list-disc list-inside ml-5">
                  <li>La cooperación institucional.</li>
                  <li>El acceso a recursos nacionales e internacionales.</li>
                  <li>
                    La implementación de modelos de desarrollo innovadores para
                    el progreso integral de los territorios.
                  </li>
                </ul>
              </>
            }
          />
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container className="flex gap-5 md:gap-10 lg:gap-15 flex-col md:flex-row">
          <MissionCardCard
            title="Misión"
            isRoundedLeft={true}
            missionText="PRO. DESARROLLO tiene la misión de promover, gestionar y ejecutar programas, proyectos y alianzas estratégicas orientadas al desarrollo económico, social y territorial del país. Actuamos como un instrumento técnico y operativo al servicio del sector público y privado, impulsando la inversión responsable, la innovación institucional y la articulación entre los distintos niveles de gobierno y la sociedad civil, con el fin de fortalecer las capacidades locales y asegurar un desarrollo sostenible y equitativo en los territorios."
          />
          <MissionCardCard
            title="Visión"
            missionText="Para el año 2035, PRO. DESARROLLO será reconocida como la entidad público-privada líder en Colombia en gestión e inversión para el desarrollo territorial, destacándose por su capacidad para articular recursos nacionales e internacionales, impulsar proyectos de alto impacto social y económico, y consolidar modelos de gobernanza colaborativa que fortalezcan el bienestar, la autonomía y la sostenibilidad de las entidades territoriales del país."
          />
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container className="mt-7 lg:mt-0 gap-15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {infos.map((info) => (
            <InfoCard key={info.id} item={info} />
          ))}
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container>
          <SectionHeader
            title="Valores Institucionales"
            description="En PRO. DESARROLLO orientamos nuestra gestión bajo principios éticos y técnicos que fortalecen la confianza pública, la cooperación y el desarrollo territorial. Nuestros valores guían cada acción, decisión y alianza institucional, promoviendo una cultura basada en la transparencia, la eficiencia y el compromiso con el bienestar colectivo."
          />

          <div className="mt-7 grid-cols-1 hidden lg:grid lg:grid-cols-3 lg:gap-15">
            {transparencies.map((transparency) => {
              return (
                <TransparencyCard key={transparency.id} item={transparency} />
              );
            })}
          </div>

          <div className="mt-7 w-full lg:hidden">
            <Carousel slideSizeClasses={customSlideClasses}>
              {transparencies.map((transparency) => (
                <div key={transparency.id} className="h-full">
                  <TransparencyCard item={transparency} />
                </div>
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
