"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Divider } from "@heroui/react";
import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
import { btns, options } from "./page.properties";
import { projects } from "./[id]/page.properties";
import { FilterByState } from "./components/filter-by-state";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ProjectTypeCard } from "./components/project-type-card";
import { BackgroundSection, CallCard, SearchBar } from "@/ui/atoms";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";

export default function Calls() {
  const [query, setQuery] = useState("");
  const [activeBtn, setActiveBtn] = useState(2025);
  const [active, setActive] = useState("Infraestructura");

  const handleSearch = () => {
    console.log("Buscando:", query);
  };

  return (
    <>
      <HeroSimple
        title="Convocatorias - Bogotá"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center">
          <div className="flex justify-center mt-10 w-full lg:w-fit lg:min-w-[707px]">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
            />
          </div>

          <div className="my-10 w-full flex flex-wrap justify-center gap-5">
            {btns.map(({ id, year }) => {
              const active = activeBtn === year;

              return (
                <button
                  key={id}
                  onClick={() => setActiveBtn(year)}
                  className={`
                    w-full md:w-fit flex items-center gap-2 px-7 py-4 rounded-2xl transition-all duration-300
                    font-semibold text-[19px] md:text-[23px] lg:text-[25px] cursor-pointer shadow-lg
                    ${
                      active
                        ? "bg-[#A9BEFF] text-primary shadow-xl"
                        : "bg-[#F3F6FF] text-primary hover:bg-[#E6EEFF]"
                    }
                  `}
                >
                  <FileText
                    size={35}
                    className={`
                      transition-colors duration-300
                      ${active ? "text-primary" : "text-[#A9BEFF]"}
                    `}
                  />
                  Proyectos {year}
                </button>
              );
            })}
          </div>

          <Divider className="w-full lg:w-[1023px] bg-secondary mb-15" />

          <Carousel hasDots={false} slidesPerView={5}>
            {options.map((option) => {
              return (
                <ProjectTypeCard
                  key={option.id}
                  item={option}
                  active={active === option.title}
                  onClick={(value) => {
                    setActive(value);
                  }}
                />
              );
            })}
          </Carousel>

          <Divider className="lg:w-[1023px] bg-secondary mt-15" />
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container>
          <div className="flex justify-end mb-10">
            <FilterByState />
          </div>

          <div className="space-y-5">
            {projects.map((item) => (
              <CallCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
