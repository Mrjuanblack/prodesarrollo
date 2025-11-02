"use client";

import {
  Link,
  User,
  Shield,
  Upload,
  FileText,
  ArrowDownToLine,
} from "lucide-react";
import { useState } from "react";
import { InfoCard } from "./components/info-card";
import hero_simple from "@/public/hero-simple.svg";
import { HelpSection, HeroSimple } from "@/ui/organism";
import { profileTypes, projects } from "./page.properties";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { ProfileTypeCard } from "./components/ProfileTypeCard";
import { BranchInfoCard } from "./components/branch-info-card";
import { BackgroundSection, Button, StepTab, Text } from "@/ui/atoms";
import FormContactSection from "./components/form-contact-section.component";

export default function Participate() {
  const [active, setActive] = useState("step-1");

  const tabs = [
    { id: "step-1", label: "¿Quién eres?", icon: User },
    { id: "step-2", label: "Documentos requeridos", icon: FileText },
    { id: "step-3", label: "Enviar documentación", icon: Upload },
  ];

  const handleSelect = (id: number) => {
    console.log("Seleccionado:", id);
  };

  return (
    <>
      <HeroSimple title="Banco de oferentes" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container className="flex flex-col space-y-10">
          <div className="flex justify-center">
            <IconTitle title="Participa en PRO. DESARROLLO" />
          </div>

          <div className="w-full">
            <StepTab
              tabs={tabs}
              defaultActive="step-1"
              onChange={(id) => setActive(id)}
            />
          </div>

          <div className="flex flex-col items-center">
            {active === "step-1" && (
              <>
                <Text text="Selecciona una opción" className="text-[20px]" />

                <div className="flex gap-6 mt-10">
                  {profileTypes.map((item) => (
                    <ProfileTypeCard
                      key={item.id}
                      item={item}
                      onClick={handleSelect}
                    />
                  ))}
                </div>
              </>
            )}

            {active === "step-2" && (
              <div className="w-full space-y-10">
                <div>
                  <IconTitle
                    Icon={Link}
                    className="mb-10"
                    highlightFirstLetter={false}
                    classNameTitle="lg:font-normal"
                    title="Documentos requeridos para inscripción de persona natural"
                  />

                  <div className="flex flex-col gap-4 pl-10">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="flex items-center gap-3 text-black hover:text-primary cursor-pointer transition-colors"
                      >
                        <span className="text-[20px] font-medium">
                          {index + 1}. {project.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <IconTitle
                    Icon={Link}
                    className="mb-10"
                    highlightFirstLetter={false}
                    title="Documentos para descargar"
                    classNameTitle="lg:font-normal"
                  />

                  <div className="flex flex-col gap-4 pl-10">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="flex items-center gap-3 text-black hover:text-primary cursor-pointer transition-colors"
                      >
                        <div className="bg-[#D9E0FF] p-2 rounded-lg">
                          <ArrowDownToLine size={20} className="text-primary" />
                        </div>
                        <span className="text-[20px] font-medium">
                          {project.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {active === "step-3" && (
              <div className="w-full flex gap-10">
                <FormContactSection />
                <BranchInfoCard />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <InfoCard
        Icon={Shield}
        message="Se informa que la inscripción únicamente será considerada válida cuando la totalidad de los documentos exigidos sea presentada de manera completa, correcta, en el formato establecido y dentro de los plazos definidos por  PRO. DESARROLLO. El incumplimiento de alguno de estos requisitos —ya sea por omisión, error o entrega parcial de la documentación— podrá dar lugar a la devolución del trámite o al rechazo del proceso de inscripción, conforme a los criterios establecidos por la entidad."
      >
        <Button
          variant="solid"
          text="Enviar documentos"
          className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
        />
      </InfoCard>

      <HelpSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
