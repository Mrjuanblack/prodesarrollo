"use client";

import {
  Text,
  Input,
  Title,
  Select,
  Button,
  StepTab,
  TextArea,
  FormCard,
  TransparencyCard,
  BackgroundSection,
} from "@/ui/atoms";
import { useState } from "react";
import { transparencies } from "./page.properties";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { AlertCircle, Menu, MessageSquare } from "lucide-react";

export default function Pqrs() {
  const [active, setActive] = useState("step-1");
  const [files, setFiles] = useState<FileList | null>(null);

  const tabs = [
    { id: "step-1", label: "Tipo de solicitud", icon: AlertCircle },
    { id: "step-2", label: "Registrar solicitud", icon: Menu },
  ];

  const idTypes = [
    { key: 1, label: "Cédula de ciudadanía", value: "cc" },
    { key: 2, label: "Tarjeta de identidad", value: "ti" },
    { key: 3, label: "Cédula de extranjería", value: "ce" },
    { key: 4, label: "Pasaporte", value: "pa" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <>
      <Section fadeIn={true}>
        <Container>
          <StepTab
            tabs={tabs}
            defaultActive="step-1"
            onChange={(id) => setActive(id)}
          />

          <div className="flex gap-4 justify-center mt-10">
            <IconTitle Icon={MessageSquare} />

            <Text
              text="Toda persona natural o jurídica tiene derecho a presentar solicitudes respetuosas ante esta entidad (por interés particular o general) y a obtener pronta resolución, conforme al artículo 23 de la Constitución Política y la Ley 1755 de 2015."
              className={`text-md md:text-[20px] mt-4 max-w-6xl text-justify text-gray-500`}
            />
          </div>
        </Container>
      </Section>

      <Section fadeIn={true}>
        <Container>
          <div className="flex flex-col">
            {active === "step-1" && (
              <>
                <Title
                  highlightFirstLetter={false}
                  text="Selecciona el tipo de solicitud a registrar"
                  className="text-primary md:text-[20px] font-semibold"
                />

                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15">
                  {transparencies.map((transparency) => {
                    return (
                      <TransparencyCard
                        item={transparency}
                        key={transparency.id}
                      />
                    );
                  })}
                </div>
              </>
            )}

            {active === "step-2" && (
              <FormCard
                title="Ingresa la siguiente información para registrar tu solicitud"
                form={
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      label="Descripción de la solicitud"
                    />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-[20px]">
                      <span className="text-black font-medium">
                        Cargar archivos y/o imágenes de soporte
                      </span>

                      <label
                        htmlFor="file-upload"
                        className="text-secondary font-medium cursor-pointer underline hover:text-secondary-600"
                      >
                        Seleccionar archivos
                      </label>

                      <input
                        multiple
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </>
                }
                buttonAction={
                  <>
                    <Button
                      variant="solid"
                      text="Enviar solicitud"
                      className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                    />
                  </>
                }
              />
            )}
          </div>
        </Container>
      </Section>

      <BackgroundSection background="bg-white" />
    </>
  );
}
