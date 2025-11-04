"use client";

import { Hero } from "./components/hero.component";
import { BackgroundSection, Button } from "@/ui/atoms";
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
        videoSrc={["https://www.youtube.com/embed/mn64ZdDpC6k"]}
        description={
          <>
            PRO. DESARROLLO promueve la preservación y fortalecimiento de la
            <strong> identidad cultural</strong> de los territorios,
            garantizando el respeto por sus expresiones, tradiciones y
            manifestaciones propias. <br />
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

      <AboutSection
        reverse={true}
        title="Gestión integral para el desarrollo territorial y social"
        videoSrc={["https://www.youtube.com/embed/mn64ZdDpC6k"]}
        description={
          <>
            En PRO. DESARROLLO entendemos que invertir en los territorios es
            también invertir en su gente.
            <br />
            <br />
            Nuestro trabajo trasciende la ejecución de proyectos: representa una
            <strong> alianza permanente </strong> con las comunidades, basada en
            el respeto, la inclusión y el fortalecimiento de sus capacidades.
            <br />
            <br />
            Cada acción que emprendemos está orientada a:
            <ul className="list-disc list-inside ml-5">
              <li>Fortalecer el tejido social.</li>
              <li>Promover la inclusión y la participación activa.</li>
              <li>Impulsar el desarrollo sostenible de los territorios.</li>
            </ul>
            <br />
            Creemos en un progreso que se construye desde la cooperación, la
            participación activa y el compromiso colectivo con el futuro de los
            territorios.
          </>
        }
      />

      <AreasImpact />
      <FeaturedProjects />
      <NewsCarousel />
      <InstitutionalFooterSection />
      <CallToActionSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
