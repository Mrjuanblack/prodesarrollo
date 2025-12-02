"use client";

import { useState } from "react";
import { HeroSimple } from "@/ui/organism";
import { Divider, Spinner } from "@heroui/react";
import { DonationTypeOptions } from "@/domain/donation";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import hero_donaciones_img from "@/public/hero-donaciones-img.svg";
import { FilterByState } from "../calls/components/filter-by-state";
import EconomicDonationForm from "./components/EconomicDonationForm";
import MaterialDonationForm from "./components/MaterialDonationForm";
import { Text, Title, CallCard, BackgroundSection } from "@/ui/atoms";
import { useProjectsInfinite } from "@/hooks/project/useProjectsInfinite";

export default function Donations() {
  const [donationType, setDonationType] = useState<DonationTypeOptions>(
    DonationTypeOptions.ESPECIE
  );

  const { items, hasMore, isLoading, isFetchingNextPage, onLoadMore } =
    useProjectsInfinite({
      size: 10,
      year: undefined,
      type: undefined,
      search: undefined,
      donationProject: true,
    });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: true,
    onLoadMore,
  });

  const isEconomicDonation = donationType === DonationTypeOptions.ECONOMICA;

  return (
    <>
      <HeroSimple title="Donaciones" backgroundImage={hero_donaciones_img} />

      <Section fadeIn={true}>
        <Container className="flex flex-col">
          <div className="space-y-2 lg:space-y-3">
            <IconTitle title="Haz parte del cambio" />
            <Text text="Cada aporte ayuda a construir un país más justo, conectado y sostenible" />
          </div>

          <div className="flex flex-col lg:flex-row gap-7 lg:gap-10 mt-7 lg:mt-15">
            {isEconomicDonation ? (
              <EconomicDonationForm
                key="economic"
                setDonationType={setDonationType}
              />
            ) : (
              <MaterialDonationForm
                key="material"
                donationType={donationType}
                setDonationType={setDonationType}
              />
            )}

            <div className="w-full 2xl:max-w-xl flex flex-col md:flex-row lg:flex-col gap-7">
              <div className="md:h-full lg:h-fit w-full flex flex-col space-y-3 lg:space-y-5 items-center text-center border-2 border-secondary rounded-2xl lg:rounded-none lg:rounded-r-2xl px-10 py-7">
                <div className="mb-4 lg:mb-5">
                  <Text text="Estamos comprometidos con la transparencia" />
                </div>

                <Title
                  text="¿A donde va tu dinero?"
                  highlightFirstLetter={false}
                />
                <Text text="Tus donaciones se convierten en acciones reales: financian proyectos educativos, deportivos, de infraestructura, desarrollo cultural, entre otros  en comunidades que más lo necesitan." />

                <Divider className="w-full bg-secondary" />

                <Title
                  highlightFirstLetter={false}
                  text="Seguimiento de resultados"
                />
                <Text text="Puedes seguir el progreso de nuestros proyectos en nuestra sección “Convocatorias”" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container>
          <div className="flex justify-between gap-3 md:items-center mb-7 flex-col md:flex-row lg:mb-10">
            <Title text="Proyectos activos que puedes apoyar" />
            <FilterByState />
          </div>

          <div
            ref={scrollerRef as React.RefObject<HTMLDivElement>}
            className="space-y-4 lg:space-y-5"
          >
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

      <BackgroundSection background="bg-white" />
    </>
  );
}
