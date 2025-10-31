"use client";

import Image from "next/image";
import { useState } from "react";
import { Settings } from "lucide-react";
import { infos } from "./page.properties";
import hero_simple from "@/public/hero-simple.svg";
import crane_img from "@/public/crane-icono.svg";
import { BackgroundSection, InfoCard, Title } from "@/ui/atoms";
import { HeroSimple, SectionHeader } from "@/ui/organism";
import { Carousel, Container, Section } from "@/ui/molecules";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

const SLIDES_PER_VIEW = 3;

export default function WhatWeDo() {
  const [startIndex, setStartIndex] = useState(0);
  const totalItems = infos.length;
  const totalSlides = Math.ceil(totalItems / SLIDES_PER_VIEW);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentInfos = infos.slice(
    startIndex * SLIDES_PER_VIEW,
    (startIndex + 1) * SLIDES_PER_VIEW
  );

  return (
    <>
      <HeroSimple title="¿Qué hacemos?" backgroundImage={hero_simple} />

      <Section>
        <Container className="relative mt-20 h-[500px] flex flex-col md:flex-row items-center justify-center gap-15 bg-white">
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

      <Section>
        <Container className="my-20">
          <SectionHeader
            icon={Settings}
            title="Algunas de nuestras actividades"
            description="Celebramos y suscribimos convenios y contratos interadministrativos, civiles y comerciales con entidades públicas y privadas, orientados al fortalecimiento de la gestión pública y a la promoción eficiente del desarrollo territorial."
          />

          <div className="mt-30"></div>

          <Carousel
            currentIndex={startIndex}
            totalSlides={totalSlides}
            onPrev={handlePrev}
            onNext={handleNext}
          >
            {currentInfos.map((service) => (
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
