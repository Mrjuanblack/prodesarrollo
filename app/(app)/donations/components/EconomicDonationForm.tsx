"use client";

import {
  personTypes,
  donationTypes,
  donationOptions,
  anonymousDonation,
} from "../page.properties";
import {
  PersonTypeOptions,
  DonationTypeOptions,
  economicDonationFormSchema,
  EconomicDonationFormType,
} from "@/domain/donation";
import {
  addToast,
  ButtonGroup,
  NumberInput,
  Button as ButtonEconomic,
} from "@heroui/react";
import { useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { IdTypeOptions } from "@/domain/shared";
import { idTypes } from "../../participate/page.properties";
import { useCreateDonation } from "@/hooks/donation/useCreateDonation";
import { Title, Input, Button, Select, FormCard, RadioGroup } from "@/ui/atoms";

interface EconomicDonationFormProps {
  setDonationType: React.Dispatch<React.SetStateAction<DonationTypeOptions>>;
}

export default function EconomicDonationForm({
  setDonationType,
}: EconomicDonationFormProps) {
  const createDonationMutation = useCreateDonation();

  const [isJuridicPerson, setIsJuridicPerson] = useState(false);
  const [donationValue, setDonationValue] = useState<number | null>(null);

  const defaultValues: EconomicDonationFormType = {
    email: "",
    phone: "",
    fullName: "",
    idNumber: "",
    donateValue: 0,
    anonymousDonation: "no",
    personType: PersonTypeOptions.NATURAL,
    idType: IdTypeOptions.CEDULA_CIUDADANIA,
    donatioType: DonationTypeOptions.ECONOMICA,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: economicDonationFormSchema,
      onBlur: economicDonationFormSchema,
      onChange: economicDonationFormSchema,
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
          setDonationValue(null);
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

  const isOtherValueDonation = useMemo(() => {
    return !donationOptions.some((option) => option.value === donationValue);
  }, [donationValue]);

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

          <form.Field name="donateValue">
            {(field) => (
              <div id="donateValue" className="space-y-2">
                <div className="space-y-2">
                  <Title
                    text="¿Cuánto quieres donar?"
                    highlightFirstLetter={false}
                    className="text-primary font-normal"
                  />

                  <ButtonGroup>
                    {donationOptions.map((option) => (
                      <ButtonEconomic
                        key={option.key}
                        onPress={() => {
                          setDonationValue(option.value);
                          form.setFieldValue("donateValue", option.value);
                        }}
                        color={
                          donationValue === option.value ? "primary" : "default"
                        }
                        variant={
                          donationValue === option.value ? "solid" : "bordered"
                        }
                      >
                        {option.label}
                      </ButtonEconomic>
                    ))}
                  </ButtonGroup>
                </div>

                <NumberInput
                  size="lg"
                  minValue={0}
                  placeholder=""
                  labelPlacement={"inside"}
                  label="Quiero donar otro monto"
                  value={isOtherValueDonation ? donationValue ?? 0 : 0}
                  className="text-[15px] md:text-[18px] lg:text-[20px]"
                  onValueChange={(value: number) => {
                    setDonationValue(value);
                    form.setFieldValue("donateValue", value);
                  }}
                  classNames={{
                    inputWrapper: "bg-white",
                    input: "bg-white text-black",
                  }}
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                />

                {field.state.meta.errors?.length > 0 && (
                  <p className="text-danger text-sm">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
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
