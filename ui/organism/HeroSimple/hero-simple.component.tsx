import { FC } from "react";
import Image from "next/image";
import { HeroTitleProps } from "./hero.properties";
import { Container, Section } from "@/ui/molecules";

export const HeroSimpleComponent: FC<HeroTitleProps> = ({
  title,
  backgroundImage,
}) => {
  return (
    <Section
      fadeIn={true}
      className="relative h-[220px] md:h-[250px] overflow-hidden"
    >
      <Image
        fill
        priority
        alt={title}
        sizes="100vw"
        src={backgroundImage}
        className="object-cover object-center scale-110"
      />

      <Container className="pl-0 flex items-center justify-start">
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 bg-primary/80 px-6 py-10 w-[721px] rounded-tr-4xl">
          <h1 className="text-secondary text-xl md:text-2xl font-semibold italic">
            {title}
          </h1>
        </div>
      </Container>
    </Section>
  );
};
