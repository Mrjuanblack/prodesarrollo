"use client";

import Image from "next/image";
import { HeroSimple } from "@/ui/organism";
import { actas, imgs } from "./page.properties";
import hero_simple from "@/public/hero-simple.svg";
import { ArrowDownToLine, Link } from "lucide-react";
import { Carousel, Container, IconTitle, Section } from "@/ui/molecules";
import { BackgroundSection, Button, Chip, Text, Title } from "@/ui/atoms";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

const Call = () => {
  return (
    <>
      <HeroSimple
        title="Convocatorias - Bogotá"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center space-y-6">
          <IconTitle
            highlightFirstLetter={false}
            title="Proyectos 2023 / Obra"
          />

          <div className="self-start space-y-5">
            <Chip />

            <div>
              <Title
                text="OBR-001"
                highlightFirstLetter={false}
                className="lg:text-[20px]"
              />

              <Text
                text="Fecha : 27/10/2025"
                className="text-primary font-normal text-[20px]"
              />

              <Text
                text="Publicado por: Ana García"
                className="text-primary font-normal text-[20px]"
              />
            </div>

            <Text
              className="text-justify text-[20px]"
              text={
                <>
                  Interventoría técnica, administrativa y financiera para el
                  proyecto denominado construcción de estructura y cubierta para
                  cancha múltiple de la vereda paramito del municipio de
                  Barichara Santander.
                </>
              }
            />

            <div className="flex items-center gap-2">
              <IconTitle
                Icon={Link}
                classNameTitle="md:font-normal md:text-[20px]"
                title="Interventoría asociada: "
                highlightFirstLetter={false}
              />
              <Title text="OBR-001" className="md:text-[20px]" />
            </div>
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
              <div
                key={acta.id}
                className="flex items-center gap-3 text-black hover:text-primary cursor-pointer transition-colors"
              >
                <div className="bg-[#D9E0FF] p-2 rounded-lg">
                  <ArrowDownToLine size={20} className="text-primary" />
                </div>
                <span className="text-[20px] font-medium">{acta.nombre}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center">
          <IconTitle
            highlightFirstLetter={false}
            title="Registro fotográficos"
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
