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

        <div className="grid grid-cols-3 lg:grid-cols-7 gap-10 mb-20 place-items-center">
          {entitiesObserved.map((entity) => (
            <Image
              key={entity.alt}
              alt={entity.alt}
              src={entity.img}
              className="w-auto h-auto"
            />
          ))}
        </div>

        <div>
          <iframe
            src="https://horalegal.inm.gov.co/widget.html"
            title="Hora Legal Colombia"
            width="700px"
            height="500px"
            style={{
              border: "none",
              overflow: "hidden",
            }}
          />
        </div>

        {/* <div className="flex items-center flex-col lg:flex-row max-w-[774px] px-6 py-3 mb-10 md:px-8 bg-primary">
          <div className="flex items-center">
            <Image
              src={logo}
              className="h-12 w-auto object-contain"
              alt="Insituto Nacional de Metrología de Colombia"
            />
          </div>

          <Text
            text="00:00:00"
            className="lg:font-extrabold tracking-wide my-7 md:my-10 lg:mx-12 text-white text-[45px]"
          />

          <div className="text-center lg:text-left text-white text-[20px] font-light">
            <div>HORA LEGAL</div>
            <div>REPÚBLICA DE COLOMBIA</div>
          </div>
        </div> */}
      </Container>
    </Section>
  );
};
