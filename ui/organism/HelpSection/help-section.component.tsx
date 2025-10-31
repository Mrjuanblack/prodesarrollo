import React from "react";
import { MessageCircleQuestion } from "lucide-react";
import { Container, Section } from "@/ui/molecules";

export const HelpSectionComponent: React.FC = () => {
  return (
    <Section className="bg-default-100 md:py-20">
      <Container className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[#E8EFFC] rounded-full p-3 flex items-center justify-center">
            <MessageCircleQuestion
              size={55}
              className="text-primary opacity-90"
            />
          </div>

          <div>
            <h2 className="text-primary font-bold text-base md:text-[30px]">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </h2>
            <p className="text-black text-sm md:text-[25px] mt-5">
              📩 Nuestro equipo está listo para orientarte paso a paso.
            </p>
          </div>
        </div>

        <button className="cursor-pointer mt-6 md:mt-0 text-[20px] border border-primary text-primary font-medium px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
          Enviar consulta
        </button>
      </Container>
    </Section>
  );
};
