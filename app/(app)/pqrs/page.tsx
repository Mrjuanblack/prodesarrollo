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
import { addToast } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { IdTypeOptions } from "@/domain/shared";
import { transparencies } from "./page.properties";
import { idTypes } from "../participate/page.properties";
import { useSubmitPqrs } from "@/hooks/pqrs/useSubmitPqrs";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { AlertCircle, Menu, MessageSquare } from "lucide-react";
import { SubmitPqrsFormType, submitPqrsFormSchema } from "@/domain/pqrs";

export default function Pqrs() {
  const submitPqrsMutation = useSubmitPqrs();

  const [active, setActive] = useState("step-1");
  const [files, setFiles] = useState<FileList | null>(null);

  const tabs = [
    { id: "step-1", label: "Tipo de solicitud", icon: AlertCircle },
    { id: "step-2", label: "Registrar solicitud", icon: Menu },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const defaultValues: SubmitPqrsFormType = {
    email: "",
    phone: "",
    fullName: "",
    idNumber: "",
    description: "",
    idType: IdTypeOptions.CEDULA_CIUDADANIA,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: submitPqrsFormSchema,
      onSubmit: submitPqrsFormSchema,
      onChange: submitPqrsFormSchema,
    },
    onSubmit: ({ value }) => {
      submitPqrsMutation.mutate(value, {
        onError: () => {
          addToast({
            title: "Toast Title error",
            description: "Toast Description error",
            color: "danger",
          });
        },
        onSuccess: () => {
          form.reset();
          addToast({
            title: "Toast Title",
            description: "Toast Description",
            color: "success",
          });
        },
      });
    },
  });

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
              className={`text-[15px] md:text-[18px] lg:text-[20px] mt-4 max-w-6xl text-gray-500`}
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
                  className="text-primary text-[15px] md:text-[18px] lg:text-[20px] font-semibold"
                />

                <div className="mt-5 lg:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-9 lg:gap-15">
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
                onSubmit={form.handleSubmit}
                title="Ingresa la siguiente información para registrar tu solicitud"
                form={
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
                      <form.Field name="idType">
                        {(field) => (
                          <Select
                            id="idType"
                            name="idType"
                            options={idTypes}
                            onBlur={field.handleBlur}
                            label="Tipo de identificación"
                            selectedKeys={[field.state.value]}
                            placeholder="Selecciona una opción"
                            errorMessage={field.state.meta.errors[0]?.message}
                            onChange={(e) => {
                              const value: IdTypeOptions = e.target
                                .value as IdTypeOptions;

                              field.handleChange(value);
                            }}
                            isInvalid={
                              field.state.meta.errors.length > 0 &&
                              field.state.meta.isTouched
                            }
                          />
                        )}
                      </form.Field>

                      <form.Field name="idNumber">
                        {(field) => (
                          <Input
                            id="idNumber"
                            name="idNumber"
                            placeholder=""
                            onBlur={field.handleBlur}
                            value={field.state.value ?? ""}
                            label="Número de identificación"
                            errorMessage={field.state.meta.errors[0]?.message}
                            onChange={(e) => {
                              const value: string = e.target.value;
                              field.handleChange(value);
                            }}
                            isInvalid={
                              field.state.meta.errors.length > 0 &&
                              field.state.meta.isTouched
                            }
                          />
                        )}
                      </form.Field>
                    </div>

                    <form.Field name="fullName">
                      {(field) => (
                        <Input
                          id="fullName"
                          name="fullName"
                          placeholder=""
                          label="Nombre completo"
                          onBlur={field.handleBlur}
                          value={field.state.value ?? ""}
                          errorMessage={field.state.meta.errors[0]?.message}
                          onChange={(e) => {
                            const value: string = e.target.value;
                            field.handleChange(value);
                          }}
                          isInvalid={
                            field.state.meta.errors.length > 0 &&
                            field.state.meta.isTouched
                          }
                        />
                      )}
                    </form.Field>

                    <form.Field name="phone">
                      {(field) => (
                        <Input
                          id="phone"
                          name="phone"
                          placeholder=""
                          label="Teléfono"
                          onBlur={field.handleBlur}
                          value={field.state.value ?? ""}
                          errorMessage={field.state.meta.errors[0]?.message}
                          onChange={(e) => {
                            const value: string = e.target.value;
                            field.handleChange(value);
                          }}
                          isInvalid={
                            field.state.meta.errors.length > 0 &&
                            field.state.meta.isTouched
                          }
                        />
                      )}
                    </form.Field>

                    <form.Field name="email">
                      {(field) => (
                        <Input
                          type="email"
                          id="idNumber"
                          name="idNumber"
                          label="Correo electrónico"
                          onBlur={field.handleBlur}
                          value={field.state.value ?? ""}
                          placeholder="ejemplo@correo.com"
                          errorMessage={field.state.meta.errors[0]?.message}
                          onChange={(e) => {
                            const value: string = e.target.value;
                            field.handleChange(value);
                          }}
                          isInvalid={
                            field.state.meta.errors.length > 0 &&
                            field.state.meta.isTouched
                          }
                        />
                      )}
                    </form.Field>

                    <form.Field name="description">
                      {(field) => (
                        <TextArea
                          placeholder=""
                          id="description"
                          name="description"
                          onBlur={field.handleBlur}
                          value={field.state.value ?? ""}
                          label="Descripción de la solicitud"
                          errorMessage={field.state.meta.errors[0]?.message}
                          onChange={(e) => {
                            const value: string = e.target.value;
                            field.handleChange(value);
                          }}
                          isInvalid={
                            field.state.meta.errors.length > 0 &&
                            field.state.meta.isTouched
                          }
                        />
                      )}
                    </form.Field>

                    <div className="flex flex-col md:flex-row md:items-center justify-between lg:gap-2 text-[15px] md:text-[18px] lg:text-[20px]">
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
                      type="submit"
                      variant="solid"
                      text="Enviar solicitud"
                      isLoading={submitPqrsMutation.isPending}
                      className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                      onClick={() => {
                        form.handleSubmit();
                      }}
                      isDisabled={
                        submitPqrsMutation.isPending || form.state.isSubmitting
                      }
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
