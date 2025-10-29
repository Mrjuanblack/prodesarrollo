"use client";

import { Button } from "@/ui/atoms";
import { Hero } from "./components/hero.component";
import { AreasImpact } from "./components/areas-impact.component";
import { NewsCarousel } from "./components/news-carousel.component";
import { AboutSection } from "./components/about-section.component";
import { FeaturedProjects } from "./components/featured-projects.component";
import { CallToActionSection } from "@/ui/organism/CallToActionSection/CallToActionSection";
import { InstitutionalFooterSection } from "./components/institutional-footer-section.component";

export default function Home() {
  return (
    <>
      <Hero />

      <AboutSection
        title="Sobre Nosotros"
        reverse={false}
        videoSrc="/videos/prodesarrollo.mp4"
        description={
          <>
            PRO. DESARROLLO promueve la preservación y fortalecimiento de la{" "}
            <strong>identidad cultural</strong> de los territorios, garantizando
            el respeto por sus expresiones, tradiciones y manifestaciones
            propias. <br />
            <br />
            De igual manera, fomenta el <strong>deporte</strong>, la recreación
            y la actividad física como instrumentos de integración social,
            desarrollo humano y <strong>cohesión comunitaria</strong>,
            contribuyendo al bienestar y progreso integral de las regiones.
          </>
        }
      >
        <Button
          text="Ver más"
          variant="bordered"
          className="font-semibold w-fit"
        />
      </AboutSection>

      <AreasImpact />
      <FeaturedProjects />
      <NewsCarousel />
      <InstitutionalFooterSection />
      <CallToActionSection />
    </>
  );
}
