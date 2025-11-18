"use client";

import {
  Title,
  Input,
  CallCard,
  FormCard,
  BackgroundSection,
  TextArea,
  Button,
  Text,
  Select,
  RadioGroup,
} from "@/ui/atoms";
import { HeroSimple } from "@/ui/organism";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { projects } from "../calls/[id]/page.properties";
import { FilterByState } from "../calls/components/filter-by-state";
import hero_donaciones_img from "@/public/hero-donaciones-img.svg";
import { Divider } from "@heroui/react";
import { idTypes } from "../participate/page.properties";
import {
  anonymousDonation,
  donationTypes,
  personTypes,
} from "./page.properties";

export default function Donations() {
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
            <FormCard
              className="rounded-2xl lg:rounded-none lg:rounded-l-2xl"
              title="Ingresa la siguiente información para  realizar tu donación"
              form={
                <>
                  <Select
                    options={donationTypes}
                    label="Tipo de donación"
                    placeholder="Selecciona una opción"
                  />

                  <RadioGroup
                    options={personTypes}
                    orientation="horizontal"
                    label="Selecciona que tipo de persona eres"
                  />

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 lg:gap-4">
                    <Select
                      options={idTypes}
                      label="Tipo de identificación"
                      placeholder="Selecciona una opción"
                    />

                    <Input placeholder="" label="Número de identificación" />
                  </div>

                  <Input label="Nombre completo" placeholder="" />

                  <Input label="Teléfono" placeholder="" />

                  <Input
                    label="Correo electrónico"
                    placeholder="ejemplo@correo.com"
                  />

                  <TextArea
                    placeholder=""
                    label="Descripción de lo que quieres donar"
                  />

                  <RadioGroup
                    orientation="horizontal"
                    options={anonymousDonation}
                    label="¿Quieres que la donación sea anónima?"
                  />
                </>
              }
              buttonAction={
                <>
                  <Button
                    variant="solid"
                    text="Completar donación"
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                  />
                </>
              }
            />

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
          <div className="flex justify-between items-center mb-7 lg:mb-10">
            <Title text="Proyectos activos que puedes apoyar" />
            <FilterByState />
          </div>

          <div className="space-y-4 lg:space-y-5">
            {projects.map((item) => (
              <CallCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      <BackgroundSection background="bg-white" />
    </>
  );
}
