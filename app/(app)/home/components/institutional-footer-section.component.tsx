import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SectionHeader } from "@/ui/organism";
import { Container, Section } from "@/ui/molecules";
import { entitiesObserved } from "../page.properties";

export const InstitutionalFooterSection = () => {
  return (
    <Section fadeIn={true}>
      <Container className="mt-10 mt:mt-0 flex flex-col items-center">
        <SectionHeader
          icon={ExternalLink}
          title="Enlaces de interés"
          description="Entidades que nos supervisan"
        />

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 mb-5 lg:mb-10">
          {entitiesObserved.map((entity) => (
            <div key={entity.alt} className="flex justify-center items-center">
              <Image
                alt={entity.alt}
                src={entity.img}
                className="max-h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div>
          <iframe
            width="auto"
            height="350px"
            title="Hora Legal Colombia"
            src="https://horalegal.inm.gov.co/widget.html"
            style={{
              border: "none",
              overflow: "hidden",
            }}
          />
        </div>
      </Container>
    </Section>
  );
};
