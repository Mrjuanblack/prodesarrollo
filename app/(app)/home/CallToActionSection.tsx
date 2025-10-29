import Image from "next/image";
import { Button, Text, Title } from "@/ui/atoms";
import { Container } from "@/ui/molecules";
import manos_unidas from "@/public/haz_parte_cambio.png";

export const CallToActionSection = () => {
  return (
    <section className="bg-default-100 py-16 flex justify-center">
      <Container className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="relative w-50 h-50 md:w-70 md:h-70 flex items-center justify-center">
          <div className="absolute w-30 h-30 shadow-md md:w-56 md:h-56 rounded-full bg-secondary-200" />

          <Image
            src={manos_unidas}
            alt="Haz parte del cambio - Manos unidas"
            className="absolute z-10 w-full h-full object-contain"
          />
        </div>

        <div className="text-center md:text-left">
          <Title text="Haz parte del cambio" className="mb-4" />

          <Text
            text="Explora nuestros proyectos sociales con impacto real y conoce cómo
            puedes ayudar a financiarlos para su ejecución."
            className="text-base md:text-lg mb-6 max-w-lg mx-auto md:mx-0"
          />

          <Button
            variant="solid"
            text="Ver proyectos y donar"
            className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
          />
        </div>
      </Container>
    </section>
  );
};
