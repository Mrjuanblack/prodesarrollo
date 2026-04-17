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
import {
  PqrsRequestType,
  SubmitPqrsFormType,
  submitPqrsFormSchema,
} from "@/domain/pqrs";
import {
  MAX_TOTAL_UPLOAD_BYTES,
  formatBytes,
  uploadFilesSchema,
} from "@/domain/upload";
import type { TransparencyItem } from "@/ui/atoms/Cards/TransparencyCard/transparency-card.properties";

const STEP_SELECT = "step-1";
const STEP_FORM = "step-2";

export default function Pqrs() {
  const submitPqrsMutation = useSubmitPqrs();

  const [active, setActive] = useState<string>(STEP_SELECT);
  const [requestType, setRequestType] = useState<PqrsRequestType | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [filesError, setFilesError] = useState<string | null>(null);

  const tabs = [
    { id: STEP_SELECT, label: "Tipo de solicitud", icon: AlertCircle },
    { id: STEP_FORM, label: "Registrar solicitud", icon: Menu },
  ];

  const validateFiles = (nextFiles: File[]): string | null => {
    const parsed = uploadFilesSchema.safeParse(nextFiles);
    if (!parsed.success) {
      return parsed.error.issues[0]?.message ?? "Archivos inválidos.";
    }
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files ? Array.from(e.target.files) : [];
    const error = validateFiles(next);
    setFilesError(error);
    setFiles(error ? [] : next);
    if (error) e.target.value = "";
  };

  const handleSelectRequestType = (item: TransparencyItem) => {
    const parsed = submitPqrsFormSchema.shape.requestType.safeParse(
      item.title
    );
    if (parsed.success) {
      setRequestType(parsed.data);
      form.setFieldValue("requestType", parsed.data);
    }
  };

  const handleTabChange = (id: string) => {
    if (id === STEP_FORM && !requestType) {
      addToast({
        title: "Selecciona un tipo de solicitud",
        description:
          "Debes elegir una tarjeta antes de continuar al formulario.",
        color: "warning",
      });
      return;
    }
    setActive(id);
  };

  const defaultValues: SubmitPqrsFormType = {
    requestType: PqrsRequestType.PETICION,
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
      submitPqrsMutation.mutate(
        { values: value, files },
        {
          onError: () => {
            addToast({
              title: "No pudimos enviar tu solicitud",
              description: "Intenta nuevamente en unos minutos.",
              color: "danger",
            });
          },
          onSuccess: () => {
            form.reset();
            setRequestType(null);
            setFiles([]);
            setFilesError(null);
            setActive(STEP_SELECT);
            addToast({
              title: "Solicitud enviada",
              description:
                "Recibimos tu PQRS. Te contactaremos al correo registrado.",
              color: "success",
            });
          },
        }
      );
    },
  });

  return (
    <>
      <Section fadeIn={true}>
        <Container>
          <StepTab
            tabs={tabs}
            active={active}
            disabledIds={requestType ? [] : [STEP_FORM]}
            onChange={handleTabChange}
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
            {active === STEP_SELECT && (
              <>
                <Title
                  highlightFirstLetter={false}
                  text="Selecciona el tipo de solicitud a registrar"
                  className="text-primary text-[15px] md:text-[18px] lg:text-[20px] font-semibold"
                />

                <div className="mt-5 lg:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-9 lg:gap-15">
                  {transparencies.map((transparency) => {
                    const isActive =
                      requestType != null && requestType === transparency.title;
                    return (
                      <TransparencyCard
                        key={transparency.id}
                        item={transparency}
                        active={isActive}
                        onClick={handleSelectRequestType}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-end mt-8 lg:mt-10">
                  <Button
                    variant="solid"
                    text="Siguiente"
                    isDisabled={!requestType}
                    onClick={() => setActive(STEP_FORM)}
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                  />
                </div>
              </>
            )}

            {active === STEP_FORM && (
              <FormCard
                onSubmit={form.handleSubmit}
                title={`Solicitud seleccionada: ${requestType ?? ""}`}
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
                          id="email"
                          name="email"
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

                    <div className="flex flex-col gap-2 text-[15px] md:text-[18px] lg:text-[20px]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
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
                          accept=".pdf,image/*"
                          onChange={handleFileChange}
                        />
                      </div>

                      <span className="text-xs text-gray-500">
                        Formatos aceptados: PDF, JPG, PNG, WEBP, GIF. Tamaño
                        total máximo: {formatBytes(MAX_TOTAL_UPLOAD_BYTES)}.
                      </span>

                      {files.length > 0 && (
                        <ul className="text-sm text-gray-700 list-disc list-inside">
                          {files.map((file) => (
                            <li key={`${file.name}-${file.lastModified}`}>
                              {file.name} ({formatBytes(file.size)})
                            </li>
                          ))}
                        </ul>
                      )}

                      {filesError && (
                        <span className="text-sm text-danger">
                          {filesError}
                        </span>
                      )}
                    </div>
                  </>
                }
                buttonActions={
                  <>
                    <Button
                      variant="bordered"
                      text="Volver"
                      onClick={() => setActive(STEP_SELECT)}
                      className="w-fit font-semibold"
                    />
                    <Button
                      variant="solid"
                      text="Enviar solicitud"
                      isLoading={submitPqrsMutation.isPending}
                      className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                      onClick={() => form.handleSubmit()}
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
