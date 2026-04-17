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
import { addToast } from "@heroui/react";
import { InfoCard } from "./components/info-card";
import hero_simple from "@/public/hero-simple.svg";
import { HelpSection, HeroSimple } from "@/ui/organism";
import { ParticipateProfileType } from "@/domain/participate";
import {
  profileTypes,
  juridicaDocuments,
  naturalDocuments,
} from "./page.properties";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { ProfileTypeCard } from "./components/ProfileTypeCard";
import { BranchInfoCard } from "./components/branch-info-card";
import { BackgroundSection, Button, StepTab, Text } from "@/ui/atoms";
import FormContactSection from "./components/form-contact-section.component";

const STEP_PROFILE = "step-1";
const STEP_DOCS = "step-2";
const STEP_FORM = "step-3";

export default function Participate() {
  const [active, setActive] = useState<string>(STEP_PROFILE);
  const [profileType, setProfileType] =
    useState<ParticipateProfileType | null>(null);

  const tabs = [
    { id: STEP_PROFILE, label: "¿Quién eres?", icon: User },
    { id: STEP_DOCS, label: "Documentos requeridos", icon: FileText },
    { id: STEP_FORM, label: "Enviar documentación", icon: Upload },
  ];

  const disabledIds = profileType ? [] : [STEP_DOCS, STEP_FORM];

  const handleSelectProfile = (id: number) => {
    const selected = profileTypes.find((p) => p.id === id);
    if (!selected) return;
    setProfileType(selected.profileType);
  };

  const handleTabChange = (id: string) => {
    if ((id === STEP_DOCS || id === STEP_FORM) && !profileType) {
      addToast({
        title: "Selecciona un tipo de persona",
        description: "Debes elegir una opción antes de continuar.",
        color: "warning",
      });
      return;
    }
    setActive(id);
  };

  const documents =
    profileType === ParticipateProfileType.JURIDICA
      ? juridicaDocuments
      : naturalDocuments;

  const documentsTitle =
    profileType === ParticipateProfileType.JURIDICA
      ? "Documentos requeridos para inscripción de persona jurídica"
      : "Documentos requeridos para inscripción de persona natural";

  return (
    <>
      <HeroSimple title="Banco de oferentes" backgroundImage={hero_simple} />

      <Section fadeIn={true}>
        <Container className="flex flex-col space-y-7 lg:space-y-10">
          <div className="flex justify-center">
            <IconTitle title="Participa en PRO. DESARROLLO" />
          </div>

          <div className="w-full">
            <StepTab
              tabs={tabs}
              active={active}
              disabledIds={disabledIds}
              onChange={handleTabChange}
            />
          </div>

          <div className="flex flex-col items-center">
            {active === STEP_PROFILE && (
              <>
                <Text
                  text="Selecciona una opción"
                  className="text-[15px] md:text-[18px] lg:text-[20px]"
                />

                <div className="flex gap-6 mt-5 lg:mt-10 w-full justify-center">
                  {profileTypes.map((item) => (
                    <ProfileTypeCard
                      key={item.id}
                      item={item}
                      active={profileType === item.profileType}
                      onClick={handleSelectProfile}
                    />
                  ))}
                </div>

                <div className="flex justify-end w-full mt-8 lg:mt-10">
                  <Button
                    variant="solid"
                    text="Siguiente"
                    isDisabled={!profileType}
                    onClick={() => setActive(STEP_DOCS)}
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                  />
                </div>
              </>
            )}

            {active === STEP_DOCS && (
              <div className="w-full space-y-5 lg:space-y-10">
                <div>
                  <IconTitle
                    Icon={FileText}
                    className="mb-5 lg:mb-10"
                    highlightFirstLetter={false}
                    classNameTitle="font-medium text-[15px] md:text-[18px] lg:text-[20px]"
                    title={documentsTitle}
                  />

                  <div className="flex flex-col gap-4 pl-6 lg:pl-10">
                    {documents.map((doc, index) => (
                      <div
                        key={doc.id}
                        className="flex items-center text-black hover:text-primary cursor-pointer transition-colors"
                      >
                        <span className="text-[15px] md:text-[18px] lg:text-[20px] font-medium">
                          {index + 1}. {doc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <IconTitle
                    Icon={Link}
                    className="mb-5 lg:mb-10"
                    highlightFirstLetter={false}
                    title="Documentos para descargar"
                    classNameTitle="font-medium text-[15px] md:text-[18px] lg:text-[20px]"
                  />

                  <div className="flex flex-col gap-4 pl-6 lg:pl-10">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center gap-2 lg:gap-3 text-black hover:text-primary cursor-pointer transition-colors"
                      >
                        <div className="bg-[#D9E0FF] p-1 lg:p-2 rounded-lg">
                          <ArrowDownToLine size={20} className="text-primary" />
                        </div>

                        <span className="text-[15px] md:text-[18px] lg:text-[20px] font-medium">
                          {doc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between w-full">
                  <Button
                    variant="bordered"
                    text="Volver"
                    onClick={() => setActive(STEP_PROFILE)}
                    className="w-fit font-semibold"
                  />
                  <Button
                    variant="solid"
                    text="Siguiente"
                    onClick={() => setActive(STEP_FORM)}
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                  />
                </div>
              </div>
            )}

            {active === STEP_FORM && profileType && (
              <div className="w-full flex gap-6 lg:gap-10 flex-col lg:flex-row">
                <FormContactSection
                  profileType={profileType}
                  onSubmitted={() => {
                    setProfileType(null);
                    setActive(STEP_PROFILE);
                  }}
                />
                <BranchInfoCard />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <InfoCard
        Icon={Shield}
        message="Se informa que la inscripción únicamente será considerada válida cuando la totalidad de los documentos exigidos sea presentada de manera completa, correcta, en el formato establecido y dentro de los plazos definidos por  PRO. DESARROLLO. El incumplimiento de alguno de estos requisitos —ya sea por omisión, error o entrega parcial de la documentación— podrá dar lugar a la devolución del trámite o al rechazo del proceso de inscripción, conforme a los criterios establecidos por la entidad."
      />

      <HelpSection />
      <BackgroundSection background="bg-default-100" />
    </>
  );
}
