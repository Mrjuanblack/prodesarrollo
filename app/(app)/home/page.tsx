"use client";

import Image from "next/image";
import { Facebook } from "lucide-react";
import { Container } from "@/ui/molecules";
import { SectionHeader } from "@/ui/organism";
import { CallToActionSection } from "./CallToActionSection";
import logo from "@/public/departamento_nacional_planeacion.png";
import { entitiesObserved } from "./page.properties";

export default function Home() {
  return (
    <div className="flex items-center flex-col">
      <Container>
        <SectionHeader icon={Facebook} title="Hola" description="Bebe" />
      </Container>

      <div className="flex flex-row gap-30 h-[94px]">
        {entitiesObserved.map((entity) => (
          <Image
            key={entity.alt}
            alt={entity.alt}
            src={entity.img}
            className="w-auto h-auto"
          />
        ))}
      </div>

      <div className="flex items-center max-w-[774px] justify-between px-6 py-3 md:px-8 bg-primary text-white">
        <div className="flex items-center">
          <Image
            src={logo}
            className="h-12 w-auto mr-4 object-contain"
            alt="Insituto Nacional de Metrología de Colombia"
          />
        </div>

        <div className="text-4xl md:text-5xl font-extrabold tracking-wide mx-4 md:mx-6">
          00:00:00
        </div>

        <div className="text-right ml-4 md:ml-6">
          <div className="text-sm md:text-base font-light text-gray-200">
            HORA LEGAL
          </div>
          <div className="text-base md:text-lg font-bold">
            REPÚBLICA DE COLOMBIA
          </div>
        </div>
      </div>

      <CallToActionSection />
    </div>
  );
}
