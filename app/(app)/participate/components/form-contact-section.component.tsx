import {
  ParticipateProfileType,
  submitParticipateFormSchema,
  SubmitParticipateFormType,
} from "@/domain/participate";
import { useState } from "react";
import { addToast } from "@heroui/react";
import { idTypes } from "../page.properties";
import { useForm } from "@tanstack/react-form";
import { IdTypeOptions } from "@/domain/shared";
import { Button, FormCard, Input, Select } from "@/ui/atoms";
import { useSubmitParticipate } from "@/hooks/participate/useSubmitParticipate";
import {
  MAX_TOTAL_UPLOAD_BYTES,
  formatBytes,
  uploadFilesSchema,
} from "@/domain/upload";

interface FormContactSectionProps {
  profileType: ParticipateProfileType;
  onSubmitted?: () => void;
}

export const FormContactSection: React.FC<FormContactSectionProps> = ({
  profileType,
  onSubmitted,
}) => {
  const submitParticipateMutation = useSubmitParticipate();

  const [files, setFiles] = useState<File[]>([]);
  const [filesError, setFilesError] = useState<string | null>(null);

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

  const defaultValues: SubmitParticipateFormType = {
    profileType,
    email: "",
    phone: "",
    fullName: "",
    idNumber: "",
    idType: IdTypeOptions.CEDULA_CIUDADANIA,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: submitParticipateFormSchema,
      onBlur: submitParticipateFormSchema,
      onChange: submitParticipateFormSchema,
    },
    onSubmit: ({ value }) => {
      submitParticipateMutation.mutate(
        { values: { ...value, profileType }, files },
        {
          onError: () => {
            addToast({
              title: "No pudimos enviar tu formulario",
              description: "Intenta nuevamente en unos minutos.",
              color: "danger",
            });
          },
          onSuccess: () => {
            form.reset();
            setFiles([]);
            setFilesError(null);
            addToast({
              title: "Documentación enviada",
              description:
                "Recibimos tu inscripción. Te contactaremos al correo registrado.",
              color: "success",
            });
            onSubmitted?.();
          },
        }
      );
    },
  });

  return (
    <FormCard
      onSubmit={form.handleSubmit}
      title={`Ingresa la siguiente información (${profileType})`}
      form={
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 lg:gap-4">
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
                onBlur={field.handleBlur}
                label="Nombre completo"
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
              Formatos aceptados: PDF, JPG, PNG, WEBP, GIF. Tamaño total máximo:{" "}
              {formatBytes(MAX_TOTAL_UPLOAD_BYTES)}.
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
              <span className="text-sm text-danger">{filesError}</span>
            )}
          </div>
        </>
      }
      buttonActions={
        <>
          <Button
            text="Enviar"
            variant="solid"
            isLoading={submitParticipateMutation.isPending}
            className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
            onClick={() => form.handleSubmit()}
            isDisabled={
              submitParticipateMutation.isPending || form.state.isSubmitting
            }
          />
        </>
      }
    />
  );
};

export default FormContactSection;
