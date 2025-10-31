"use client";

import { HeroSimple, SectionHeader } from "@/ui/organism";
import { BackgroundSection } from "@/ui/atoms";
import { infos, laws } from "./page.properties";
import { Download, FileText, Monitor } from "lucide-react";
import hero_simple from "@/public/hero-simple.svg";
import { Container, Section } from "@/ui/molecules";
import { Accordion, AccordionItem } from "@heroui/react";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function Transparency() {
  return (
    <>
      <HeroSimple
        title="Ley de transparencia y acceso a la información pública"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="space-y-10">
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

      <Section fadeIn={true}>
        <Container>
          <SectionHeader icon={Monitor} title="Directrices accesibilidad web" />

          <Accordion
            variant="splitted"
            className="p-0 m-0 gap-5"
            defaultExpandedKeys={["1"]}
          >
            {infos.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label={item.title}
                className="bg-[#F5F8FF] border-none"
                title={
                  <span className="text-primary font-semibold text-[25px]">
                    {item.number}. {item.title}
                  </span>
                }
              >
                <ul className="space-y-3 p-7 rounded-2xl bg-default-50">
                  {item.subItems.map((sub) => (
                    <li
                      key={sub.id}
                      className="flex items-center gap-3 text-[25px] text-black hover:text-primary transition-colors"
                    >
                      <FileText size={20} className="text-primary" />
                      <span>
                        {sub.id} {sub.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
