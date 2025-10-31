"use client";

import Image from "next/image";
import { Settings } from "lucide-react";
import { infos } from "./page.properties";
import hero_simple from "@/public/hero-simple.svg";
import crane_img from "@/public/crane-icono.svg";
import { HeroSimple, SectionHeader } from "@/ui/organism";
import { Carousel, Container, Section } from "@/ui/molecules";
import { BackgroundSection, InfoCard, Title } from "@/ui/atoms";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function WhatWeDo() {
  return (
    <>
      <HeroSimple title="¿Qué hacemos?" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container className="relative h-[500px] flex flex-col md:flex-row items-center justify-center gap-15">
          <div className="absolute top-0 left-0 z-0 shrink-0 w-[500px] h-[500px] flex justify-center rounded-full bg-[#F5F8FF]"></div>

          <div className="shrink-0 z-1 ml-15 w-[266px] h-[266px]">
            <Image
              src={crane_img}
              alt="Ilustración construcción"
              className="w-100% object-contain"
            />
          </div>

          <div className="z-1 leading-relaxed text-justify">
            <Title text="Objeto Social" className="text-[25px] mb-5" />

            <p className="text-black text-[20px]">
              PRO. DESARROLLO. Su objeto principal es ejecutar, desarrollar,
              fomentar, implementar, gestionar, planificar o financiar todo tipo
              de programas y proyectos de manera lícita, el fomento y desarrollo
              de infraestructura y la ejecución de proyectos de todo tipo de
              obras civiles, de infraestructura de transporte, infraestructura
              social, infraestructura APSB, interventorías, consultorías de todo
              tipo que apliquen al desarrollo integral y la gestión social de
              las{" "}
              <span className="font-semibold">
                comunidades y poblaciones vulnerables rurales y urbanas
              </span>
              , siendo proyectos de toda clase y sin excepción.
            </p>
          </div>
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container>
          <SectionHeader
            icon={Settings}
            title="Algunas de nuestras actividades"
            description="Celebramos y suscribimos convenios y contratos interadministrativos, civiles y comerciales con entidades públicas y privadas, orientados al fortalecimiento de la gestión pública y a la promoción eficiente del desarrollo territorial."
          />

          <div className="mt-30"></div>

          <Carousel>
            {infos.map((service) => (
              <InfoCard key={service.id} item={service} />
            ))}
          </Carousel>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
