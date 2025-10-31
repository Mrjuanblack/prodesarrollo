import { Download } from "lucide-react";
import { laws } from "./page.properties";
import { HeroSimple } from "@/ui/organism";
import { BackgroundSection } from "@/ui/atoms";
import hero_simple from "@/public/hero-simple.svg";
import { Container, Section } from "@/ui/molecules";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function Calls() {
  return (
    <>
      <HeroSimple
        title="Convocatorias - Bogotá"
        backgroundImage={hero_simple}
      />

      <Section className="py-20">
        <Container>
          {laws.map(({ title, description, downloadUrl, id }) => (
            <div
              key={id}
              className="flex flex-col md:flex-row items-center justify-between bg-[#F5F8FF] rounded-xl p-10 shadow-sm gap-20"
            >
              <p className="text-[20px] text-black leading-relaxed text-center md:text-left">
                <span className="font-semibold">{title}</span> {description}
              </p>

              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-0 flex items-center gap-2 border border-primary text-primary rounded-full px-4 py-2 text-[20px] font-medium hover:bg-primary hover:text-white transition-all duration-300"
              >
                Descargar <Download size={23} />
              </a>
            </div>
          ))}
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
