"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Divider, Spinner } from "@heroui/react";
import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
import { FilterByState } from "./components/filter-by-state";
import { Carousel, Container, Section } from "@/ui/molecules";
import { ProjectTypeCard } from "./components/project-type-card";
import { BackgroundSection, CallCard, SearchBar } from "@/ui/atoms";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";
import { useYearsWithProjects } from "@/hooks/project/useYearsWithProjects";
import { ProjectType, projectTypeList } from "@/domain/Projects";
import { useProjectsInfinite } from "@/hooks/project/useProjectsInfinite";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-1/2",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
  xl: "xl:basis-1/5",
};

export default function Calls() {
  const [query, setQuery] = useState("");

  const { data: years } = useYearsWithProjects();
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [activeType, setActiveType] = useState<ProjectType>(ProjectType.INTERVENTORY);

  const { items, hasMore, isLoading, isFetchingNextPage, onLoadMore } = useProjectsInfinite({
    size: 10,
    year: activeYear ?? undefined,
    type: activeType,
    search: query || undefined,
  });

  // Use HeroUI's infinite scroll hook
  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: true,
    onLoadMore,
  });

  const handleSearch = () => {
    console.log("Buscando:", query);
  };

  return (
    <>
      <HeroSimple
        title="Convocatorias"
        backgroundImage={hero_simple}
      />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center">
          <div className="flex justify-center w-full lg:w-fit lg:min-w-[707px]">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSearch={handleSearch}
            />
          </div>

          <div className="my-10 flex flex-wrap justify-center gap-5">
            {years?.map((year) => {
              return (
                <button
                  key={year}
                  onClick={() => setActiveYear(year)}
                  className={`
                    flex items-center gap-2 px-7 py-4 rounded-2xl transition-all duration-300
                    font-semibold text-[25px] cursor-pointer shadow-lg
                    ${activeYear === year
                      ? "bg-[#A9BEFF] text-primary shadow-xl"
                      : "bg-[#F3F6FF] text-primary hover:bg-[#E6EEFF]"
                    }
                  `}
                >
                  <FileText
                    size={35}
                    className={`
                      transition-colors duration-300
                      ${activeYear === year ? "text-primary" : "text-[#A9BEFF]"}
                    `}
                  />
                  Proyectos {year}
                </button>
              );
            })}
          </div>

          <Divider className="w-full lg:w-[1023px] bg-secondary mb-7 lg:mb-15" />

          <div className="w-full">
            <Carousel
              gapClass="px-3"
              showDots={false}
              slideSizeClasses={customSlideClasses}
            >
              {projectTypeList.map((option) => {
                return (
                  <div className="p-1" key={option}>
                    <ProjectTypeCard
                      type={option}
                      active={activeType === option}
                      onClick={(value) => {
                        setActiveType(value);
                      }}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>

          <Divider className="lg:w-[1023px] bg-secondary mt-7 lg:mt-15" />
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container>
          <div className="flex justify-end mb-7 lg:mb-10">
            <FilterByState />
          </div>

          <div ref={scrollerRef as React.RefObject<HTMLDivElement>} className="space-y-5">
            {items.map((item, index) => (
              <CallCard key={`${items[index]?.id || index}`} item={item} />
            ))}
            {isFetchingNextPage && (
              <div className="flex justify-center py-5">
                <Spinner />
              </div>
            )}
            {isLoading && items.length === 0 && (
              <div className="flex justify-center py-5">
                <Spinner />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
