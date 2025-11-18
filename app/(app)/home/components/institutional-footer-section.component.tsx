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
          description="Entidades que nos acompañan"
        />

        <div className="grid grid-cols-3 lg:grid-cols-7 gap-10 mb-10 place-items-center">
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
