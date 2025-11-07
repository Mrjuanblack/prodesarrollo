"use client";

import Image from "next/image";
import { imgs } from "./page.properties";
import { HeroSimple } from "@/ui/organism";
import hero_simple from "@/public/hero-simple.svg";
import { BackgroundSection, Chip, Text } from "@/ui/atoms";
import { Carousel, Container, IconTitle, Section } from "@/ui/molecules";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";
import { ICarouselProps } from "@/ui/molecules/Carousel/carousel.properties";

const customSlideClasses: ICarouselProps["slideSizeClasses"] = {
  base: "basis-full",
  sm: "sm:basis-1/2",
  md: "md:basis-1/3",
  lg: "lg:basis-1/4",
};

export default function New() {
  return (
    <>
      <HeroSimple title="Noticias" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container className="flex flex-col items-center space-y-6">
          <IconTitle
            highlightFirstLetter={false}
            title="PRO. DESARROLLO entrega uniformes deportivos"
          />

          <div className="self-start space-y-5">
            <Chip category="Categoría: Social" />

            <div>
              <Text
                text="Fecha : 27/10/2025"
                className="text-primary font-normal text-[16px] md:text-[18px] lg:text-[20px]"
              />

              <Text
                text="Publicado por: Ana García"
                className="text-primary font-normal text-[16px] md:text-[18px] lg:text-[20px]"
              />
            </div>

            <Text
              className="text-justify text-[16px] md:text-[18px] lg:text-[20px]"
              text={
                <>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  efficitur quam et mi dignissim, aliquam malesuada mi gravida.
                  Integer dictum metus erat, ultricies convallis odio interdum
                  sed. Integer non tempus neque. Phasellus vitae quam sed risus
                  viverra lacinia ac in nunc. Ut eu leo ullamcorper, hendrerit
                  ipsum vel, malesuada purus. Quisque tincidunt blandit urna.
                  Proin sit amet tortor tortor. Nunc ac nunc ultrices, euismod
                  urna id, congue enim. Etiam lectus urna, ultricies eget lorem
                  a, vulputate sollicitudin urna. Integer diam risus, hendrerit
                  at lacus nec, vestibulum porta est. Sed sit amet turpis
                  bibendum, aliquet nibh quis, consectetur diam.
                  <br />
                  <br />
                  Nunc quis consequat orci, eu tempor risus. Aliquam erat
                  volutpat. Suspendisse accumsan tortor nunc, id pharetra urna
                  eleifend ac. Etiam et nibh auctor magna blandit finibus. Proin
                  sit amet rutrum dolor. Duis et arcu velit. Cras rutrum
                  vehicula nibh, in aliquam augue ultrices porttitor. Integer a
                  efficitur tortor, nec varius nibh.
                  <br />
                  <br />
                  Curabitur sagittis tempor magna eget pellentesque. Donec
                  auctor et quam non volutpat. Pellentesque et purus turpis.
                  Nullam velit ante, convallis non elit sed, finibus aliquam
                  urna. Etiam justo eros, maximus efficitur dolor nec, imperdiet
                  tincidunt arcu. Fusce euismod at metus a tempus. Sed leo est,
                  interdum at dolor sed, tincidunt congue purus.
                </>
              }
            />

            <IconTitle
              highlightFirstLetter={false}
              title="Registro fotográficos"
              className="mt-20 mb-10"
            />

            <Carousel slideSizeClasses={customSlideClasses}>
              {imgs.map((img) => (
                <div
                  key={img.id}
                  className="relative h-[281px] overflow-hidden"
                >
                  <Image
                    fill
                    src={img.img}
                    alt={img.alt}
                    className="object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Container>
      </Section>

      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
