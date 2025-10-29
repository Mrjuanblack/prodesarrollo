import Image from "next/image";
import { Text } from "@/ui/atoms";
import logo from "@/public/inmc-logo.svg";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/ui/organism";
import { Container, Section } from "@/ui/molecules";
import { entitiesObserved } from "../page.properties";

export const InstitutionalFooterSection = () => {
  return (
    <Section fadeIn={true}>
      <Container className="flex flex-col items-center">
        <SectionHeader
          icon={ExternalLink}
          title="Enlaces de interés"
          description="Entidades que nos supervisan"
        />

        <div className="flex flex-row justify-center gap-30 h-[94px] mb-20">
          {entitiesObserved.map((entity) => (
            <Image
              key={entity.alt}
              alt={entity.alt}
              src={entity.img}
              className="w-auto h-auto"
            />
          ))}
        </div>

        <div className="flex items-center max-w-[774px] px-6 py-3 mb-10 md:px-8 bg-primary">
          <div className="flex items-center">
            <Image
              src={logo}
              className="h-12 w-auto object-contain"
              alt="Insituto Nacional de Metrología de Colombia"
            />
          </div>

          <Text
            text="00:00:00"
            className="text-4xl md:text-5xl font-extrabold lg:font-extrabold tracking-wide mx-4 md:mx-6 lg:mx-12 text-white"
          />

          <div className="text-left text-white text-sm md:text-lg font-light">
            <div>HORA LEGAL</div>
            <div>REPÚBLICA DE COLOMBIA</div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
