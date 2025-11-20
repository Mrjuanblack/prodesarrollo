"use client";

import {
  Text,
  Input,
  Title,
  Button,
  FormCard,
  TextArea,
  BackgroundSection,
} from "@/ui/atoms";
import { FC } from "react";
import Image from "next/image";
import { Sedes } from "@/ui/organism";
import { MessageSquare } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { addToast, Divider } from "@heroui/react";
import { ContactCardProps } from "./page.properties";
import message_icon from "@/public/message-icono.svg";
import { sendRequestFormSchema, SendRequestFormType } from "@/domain/contact";
import message_icon_two from "@/public/message-icono-2.svg";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { useSendRequest } from "@/hooks/contact/useSendRequest";
import { socialItems } from "@/ui/organism/Header/header.properties";

const ContactCard: FC<ContactCardProps> = ({ children }) => {
  return (
    <div className="md:h-full lg:h-fit w-full flex flex-col space-y-3 lg:space-y-5 items-center border-2 border-secondary rounded-2xl lg:rounded-none lg:rounded-r-2xl px-10 py-7">
      {children}
    </div>
  );
};

const Contacts = () => {
  const sendRequestMutation = useSendRequest();

  const defaultValues: SendRequestFormType = {
    email: "",
    phone: "",
    fullName: "",
    description: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onBlur: sendRequestFormSchema,
      onSubmit: sendRequestFormSchema,
      onChange: sendRequestFormSchema,
    },
    onSubmit: ({ value }) => {
      sendRequestMutation.mutate(value, {
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
        <Container className="flex flex-col">
          <div className="flex flex-col justify-center items-center gap-2 lg:gap-5">
            <div className="flex items-center gap-5">
              <div className="relative w-[150px] h-[112px] lg:w-[216px] lg:h-[160px]">
                <div className="absolute w-[100px] h-[100px] lg:w-[144px] lg:h-[144px] top-0 left-0">
                  <Image
                    fill
                    src={message_icon_two}
                    alt="message icon"
                    className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-110"
                  />
                </div>

                <div className="absolute w-[100px] h-[100px] lg:w-[144px] lg:h-[144px] bottom-0 right-0">
                  <Image
                    fill
                    src={message_icon}
                    alt="message icon"
                    className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-110"
                  />
                </div>
              </div>

              <div>
                <Title text="¿Necesitas ayuda?" highlightFirstLetter={false} />

                <Title
                  highlightFirstLetter={false}
                  text="¡Estamos para escucharte!"
                />
              </div>
            </div>

            <Text
              className="text-black text-[15px] md:text-[18px] lg:text-[20px]"
              text="Horario de atención: Lunes a Viernes - 8:00 am - 4:00pm"
            />
          </div>

          <div className="flex flex-col items-center lg:flex-row gap-7 lg:gap-10 mt-7 lg:mt-15">
            <FormCard
              onSubmit={form.handleSubmit}
              className="rounded-2xl lg:rounded-none lg:rounded-l-2xl"
              title="Ingresa la siguiente información para  registrar tu solicitud"
              form={
                <>
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
                </>
              }
              buttonAction={
                <>
                  <Button
                    text="Enviar"
                    type="submit"
                    variant="solid"
                    isLoading={sendRequestMutation.isPending}
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                    onClick={() => {
                      form.handleSubmit();
                    }}
                    isDisabled={
                      sendRequestMutation.isPending || form.state.isSubmitting
                    }
                  />
                </>
              }
            />

            <div className="w-full 2xl:max-w-xl flex flex-col md:flex-row lg:flex-col gap-7">
              <ContactCard>
                <IconTitle Icon={MessageSquare} title="Canales de contacto" />

                <Text
                  text="Redes sociales"
                  className="text-secondary font-semibold text-[14px] md:text-[16px] lg:text-[20px]"
                />

                <div className="flex flex-wrap justify-center gap-3">
                  {socialItems.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex justify-center items-center rounded-full h-[50px] w-[50px] bg-primary-50 hover:bg-primary-200"
                    >
                      <Icon className="h-7 w-7 text-primary" strokeWidth="2" />
                    </a>
                  ))}
                </div>

                <Divider className="w-full bg-secondary" />

                <Text
                  text="Correo electrónico"
                  className="text-secondary font-semibold underline text-[14px] md:text-[16px] lg:text-[20px]"
                />

                <Text
                  className="text-primary text-[14px] md:text-[16px] lg:text-[20px]"
                  text="ejemplo@correo.com"
                />
              </ContactCard>

              <ContactCard>
                <Sedes />
              </ContactCard>
            </div>
          </div>
        </Container>
      </Section>

      <BackgroundSection background="bg-white" />
    </>
  );
};

export default Contacts;
