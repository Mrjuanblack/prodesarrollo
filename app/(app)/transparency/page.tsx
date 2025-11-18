"use client";

import { BackgroundSection } from "@/ui/atoms";
import { infos, laws } from "./page.properties";
import hero_simple from "@/public/hero-simple.svg";
import { Container, Section } from "@/ui/molecules";
import { Accordion, AccordionItem } from "@heroui/react";
import { HeroSimple, SectionHeader } from "@/ui/organism";
import { Download, FileText, Link, Monitor } from "lucide-react";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function Transparency() {
  return (
    <>
      <HeroSimple
        title="Ley de transparencia y acceso a la información pública"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="space-y-5 lg:space-y-10">
          <SectionHeader
            icon={Link}
            description=""
            title="Enlaces de interés"
          />

          {laws.map(({ title, description, downloadUrl, id }) => (
            <div
              key={id}
              className="flex flex-col md:flex-row bg-[#F5F8FF] rounded-xl p-6 lg:p-10 shadow-sm gap-7 lg:gap-20"
            >
              <p className="text-[15px] md:text-[18px] lg:text-[20px] text-black leading-relaxed text-left">
                <span className="font-semibold">{title}</span> {description}
              </p>

              <a
                target="_blank"
                href={downloadUrl}
                rel="noopener noreferrer"
                className="w-fit h-fit self-end md:self-center flex items-center gap-2 border border-primary text-primary rounded-full px-4 py-2 text-[15px] md:text-[18px] lg:text-[20px] font-medium hover:bg-primary hover:text-white transition-all duration-300"
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
            className="p-0 m-0"
            defaultExpandedKeys={["1"]}
          >
            {infos.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label={item.title}
                className="bg-[#F5F8FF] border-none"
                title={
                  <span className="text-primary font-semibold text-[18px] md:text-[20px] lg:text-[25px]">
                    {item.number}. {item.title}
                  </span>
                }
              >
                <ul className="lg:space-y-3 p-4 lg:p-7 rounded-2xl bg-default-50">
                  {item.subItems.map((sub) => (
                    <li
                      key={sub.id}
                      className="flex items-center gap-1 lg:gap-3 text-[18px] md:text-[20px] lg:text-[25px] text-black hover:text-primary transition-colors"
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
