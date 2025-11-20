import {
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

export const FormContactSection = () => {
  const submitParticipateMutation = useSubmitParticipate();

  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const defaultValues: SubmitParticipateFormType = {
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
      submitParticipateMutation.mutate(value, {
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
    <FormCard
      onSubmit={form.handleSubmit}
      title="Ingresa la siguiente información"
      form={
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 lg:gap-4">
            <form.Field name="idType">
              {(field) => {
                return (
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
                );
              }}
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

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-[15px] md:text-[18px] lg:text-[20px]">
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
            text="Enviar"
            type="submit"
            variant="solid"
            isLoading={submitParticipateMutation.isPending}
            className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
            onClick={() => {
              form.handleSubmit();
            }}
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
