"use client";

import {
  Text,
  Title,
  Input,
  Button,
  Select,
  CallCard,
  FormCard,
  TextArea,
  RadioGroup,
  BackgroundSection,
} from "@/ui/atoms";
import {
  personTypes,
  donationTypes,
  donationOptions,
  anonymousDonation,
} from "./page.properties";
import {
  CreateDonation,
  PersonTypeOptions,
  DonationTypeOptions,
  createDonationSchema,
} from "@/domain/donation";
import {
  Divider,
  Spinner,
  ButtonGroup,
  Button as ButtonEconomic,
  NumberInput,
} from "@heroui/react";
import { useMemo, useState } from "react";
import { HeroSimple } from "@/ui/organism";
import { useForm } from "@tanstack/react-form";
import { ProjectType } from "@/domain/Projects";
import { IdTypeOptions } from "@/domain/shared";
import { idTypes } from "../participate/page.properties";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { FilterByState } from "../calls/components/filter-by-state";
import hero_donaciones_img from "@/public/hero-donaciones-img.svg";
import { useCreateDonation } from "@/hooks/donation/useCreateDonation";
import { useProjectsInfinite } from "@/hooks/project/useProjectsInfinite";

export default function Donations() {
  const createDonationMutation = useCreateDonation();

  const [isJuridicPerson, setIsJuridicPerson] = useState(false);
  const [isEconomicDonation, setIsEconomicDonation] = useState(false);
  const [donationValue, setDonationValue] = useState<number | null>(null);

  const [activeType, setActiveType] = useState<ProjectType>(
    ProjectType.INTERVENTORY
  );

  const { items, hasMore, isLoading, isFetchingNextPage, onLoadMore } =
    useProjectsInfinite({
      size: 10,
      year: undefined,
      type: activeType,
      search: undefined,
    });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: true,
    onLoadMore,
  });

  const form = useForm({
    defaultValues: {
      email: "",
      phone: "",
      fullName: "",
      idNumber: "",
      anonymousDonation: "no",
      donateValue: null as number | null,
      description: null as string | null,
      idType: null as IdTypeOptions | null,
      personType: null as PersonTypeOptions | null,
      donatioType: null as DonationTypeOptions | null,
    } satisfies CreateDonation,
    validators: {
      onSubmit: createDonationSchema,
      onBlur: createDonationSchema,
      onChange: createDonationSchema,
    },
    onSubmit: (values) => {
      createDonationMutation.mutate(values.value);
      form.reset();
    },
  });

  const isOtherValueDonation = useMemo(() => {
    return !donationOptions.some((option) => option.value === donationValue);
  }, [donationValue]);

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
                        value={field.state.value ?? ""}
                        placeholder="Selecciona una opción"
                        errorMessage={field.state.meta.errors[0]?.message}
                        onChange={(e) => {
                          const value: DonationTypeOptions = e.target
                            .value as DonationTypeOptions;

                          field.handleChange(value);

                          const validDonation =
                            value === DonationTypeOptions.ECONOMICA;

                          setIsEconomicDonation(validDonation);

                          if (!validDonation) {
                            setDonationValue(null);
                            form.setFieldValue("donateValue", null);
                          } else {
                            form.setFieldValue("description", null);
                          }
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
                          setIsJuridicPerson(
                            value === PersonTypeOptions.JURIDICA
                          );
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
                          value={field.state.value ?? ""}
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
                          isJuridicPerson
                            ? "Nombre de la empresa"
                            : "Nombre completo"
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

                  {!isEconomicDonation && (
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
                  )}

                  {isEconomicDonation && (
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
                                    field.handleChange(option.value);
                                  }}
                                  color={
                                    donationValue === option.value
                                      ? "primary"
                                      : "default"
                                  }
                                  variant={
                                    donationValue === option.value
                                      ? "solid"
                                      : "bordered"
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
                            value={
                              isOtherValueDonation ? donationValue ?? 0 : 0
                            }
                            className="text-[15px] md:text-[18px] lg:text-[20px]"
                            onValueChange={(value: number) => {
                              setDonationValue(value);
                              field.handleChange(value);
                            }}
                            classNames={{
                              inputWrapper: "bg-white",
                              input: "bg-white text-black",
                            }}
                            startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">
                                  $
                                </span>
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
                  )}

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
              buttonAction={
                <>
                  <Button
                    type="submit"
                    variant="solid"
                    text="Completar donación"
                    isLoading={createDonationMutation.isPending}
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                    onClick={() => {
                      form.handleSubmit();
                    }}
                    isDisabled={
                      createDonationMutation.isPending ||
                      form.state.isSubmitting
                    }
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
          <div className="flex justify-between gap-3 md:items-center mb-7 flex-col md:flex-row lg:mb-10">
            <Title text="Proyectos activos que puedes apoyar" />
            <FilterByState />
          </div>

          <div
            ref={scrollerRef as React.RefObject<HTMLDivElement>}
            className="space-y-4 lg:space-y-5"
          >
            {items.map((item, index) => (
              <CallCard key={`${items[index]?.id || index}`} item={item} />
            ))}

            {isFetchingNextPage && (
              <div className="flex justify-center py-5">
                <Spinner />
              </div>
            )}

            {isLoading && items.length === 0 && (
              <div className="flex justify-center py-5">
                <Spinner />
              </div>
            )}
          </div>
        </Container>
      </Section>

      <BackgroundSection background="bg-white" />
    </>
  );
}
