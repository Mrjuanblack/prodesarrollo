import { FC } from "react";
import Image from "next/image";
import { HeroTitleProps } from "./hero.properties";
import { Container, Section } from "@/ui/molecules";

export const HeroSimpleComponent: FC<HeroTitleProps> = ({
  title,
  backgroundImage,
}) => {
  return (
    <Section fadeIn={true}>
      <div className="w-full flex items-center justify-start relative h-[220px] md:h-[250px] overflow-hidden">
        <Image
          fill
          priority
          alt={title}
          sizes="100vw"
          src={backgroundImage}
          className="object-cover object-center scale-110"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 bg-primary/80 px-6 py-10 w-[60%] rounded-tr-4xl">
          <Container>
            <h1 className="text-secondary text-center text-xl md:text-2xl font-semibold italic">
              {title}
            </h1>
          </Container>
        </div>
      </div>
    </Section>
  );
};
