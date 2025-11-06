import React from "react";
import Image from "next/image";
import { Container, Section } from "@/ui/molecules";
import hero_img from "@/public/preguntas-icono.svg";

export const HelpSectionComponent: React.FC = () => {
  return (
    <Section fadeIn={true} className="bg-default-100 md:bg-default-100">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-[150px] w-[150px] md:h-[226px] md:w-[226px] rounded-full p-3 flex items-center justify-center overflow-hidden">
            <Image
              fill
              src={hero_img}
              alt="logo de pregunta"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-primary font-bold text-[20px] lg:text-[30px]">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </h2>
            <p className="text-black text-[18px] lg:text-[25px] mt-5">
              📩 Nuestro equipo está listo para orientarte paso a paso.
            </p>
          </div>
        </div>

        <button className="cursor-pointer mt-6 md:mt-0 text-[15px] lg:text-[20px] border border-primary text-primary font-medium px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
          Enviar consulta
        </button>
      </Container>
    </Section>
  );
};
