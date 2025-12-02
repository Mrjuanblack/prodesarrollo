"use client";

import {
  Input,
  Button,
  Select,
  FormCard,
  TextArea,
  RadioGroup,
} from "@/ui/atoms";
import {
  personTypes,
  donationTypes,
  anonymousDonation,
} from "../page.properties";
import {
  PersonTypeOptions,
  DonationTypeOptions,
  materialDonationFormSchema,
  MaterialDonationFormType,
} from "@/domain/donation";
import { useState } from "react";
import { addToast } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { IdTypeOptions } from "@/domain/shared";
import { idTypes } from "../../participate/page.properties";
import { useCreateDonation } from "@/hooks/donation/useCreateDonation";

interface MaterialDonationFormProps {
  donationType: DonationTypeOptions;
  setDonationType: React.Dispatch<React.SetStateAction<DonationTypeOptions>>;
}

export default function MaterialDonationForm({
  donationType,
  setDonationType,
}: MaterialDonationFormProps) {
  const createDonationMutation = useCreateDonation();
  const [isJuridicPerson, setIsJuridicPerson] = useState(false);

  const defaultValues: MaterialDonationFormType = {
    email: "",
    phone: "",
    fullName: "",
    idNumber: "",
    description: "",
    anonymousDonation: "no",
    donatioType: donationType,
    personType: PersonTypeOptions.NATURAL,
    idType: IdTypeOptions.CEDULA_CIUDADANIA,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: materialDonationFormSchema,
      onBlur: materialDonationFormSchema,
      onChange: materialDonationFormSchema,
    },
    onSubmit: ({ value }) => {
      createDonationMutation.mutate(value, {
        onError: () => {
          addToast({
            title: "¡Error al enviar donación!",
            description:
              "No pudimos registrar tu donación en este momento. Por favor, revisa los datos e inténtalo de nuevo.",
            color: "danger",
          });
        },
        onSuccess: () => {
          setIsJuridicPerson(false);
          setDonationType(DonationTypeOptions.ESPECIE);

          form.reset();
          addToast({
            title: "¡Donación registrada con éxito!",
            description:
              "Gracias por tu generosa donación. Hemos recibido la información correctamente.",
            color: "success",
          });
        },
      });
    },
  });

  return (
    <FormCard
      onSubmit={form.handleSubmit}
      className="rounded-2xl lg:rounded-none lg:rounded-l-2xl"
      title="Ingresa la siguiente información para  realizar tu donación"
      form={
        <>
          <form.Field name="donatioType">
            {(field) => (
              <Select
                id="donatioType"
                name="donatioType"
                options={donationTypes}
                onBlur={field.handleBlur}
                label="Tipo de donación"
                selectedKeys={[field.state.value]}
                placeholder="Selecciona una opción"
                errorMessage={field.state.meta.errors[0]?.message}
                onChange={(e) => {
                  const value: DonationTypeOptions = e.target
                    .value as DonationTypeOptions;

                  field.handleChange(value);
                  setDonationType(value);
                }}
                isInvalid={
                  field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched
                }
              />
            )}
          </form.Field>

          <form.Field name="personType">
            {(field) => (
              <RadioGroup
                id="personType"
                name="personType"
                options={personTypes}
                onBlur={field.handleBlur}
                orientation="horizontal"
                value={field.state.value ?? ""}
                label="Selecciona que tipo de persona eres"
                errorMessage={field.state.meta.errors[0]?.message}
                onChange={(e) => {
                  const value: PersonTypeOptions = e.target
                    .value as PersonTypeOptions;

                  field.handleChange(value);
                  setIsJuridicPerson(value === PersonTypeOptions.JURIDICA);
                }}
                isInvalid={
                  field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched
                }
              />
            )}
          </form.Field>

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
                label={
                  isJuridicPerson ? "Nombre de la empresa" : "Nombre completo"
                }
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
                label="Descripción de lo que quieres donar"
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

          <form.Field name="anonymousDonation">
            {(field) => (
              <RadioGroup
                id="anonymousDonation"
                name="anonymousDonation"
                orientation="horizontal"
                onBlur={field.handleBlur}
                options={anonymousDonation}
                value={field.state.value ?? ""}
                label="¿Quieres que la donación sea anónima?"
                errorMessage={field.state.meta.errors[0]?.message}
                onChange={(e) => {
                  const value = e.target.value;

                  field.handleChange(value);
                }}
                isInvalid={
                  field.state.meta.errors.length > 0 &&
                  field.state.meta.isTouched
                }
              />
            )}
          </form.Field>
        </>
      }
      buttonActions={
        <>
          <Button
            type="submit"
            variant="solid"
            text="Completar donación"
            isLoading={createDonationMutation.isPending}
            className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
            isDisabled={
              createDonationMutation.isPending || form.state.isSubmitting
            }
          />
        </>
      }
    />
  );
}
