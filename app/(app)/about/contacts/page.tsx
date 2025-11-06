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
import { Divider } from "@heroui/react";
import { MessageSquare } from "lucide-react";
import { ContactCardProps } from "./page.properties";
import message_icon from "@/public/message-icono.svg";
import message_icon_two from "@/public/message-icono-2.svg";
import { Container, IconTitle, Section } from "@/ui/molecules";
import { socialItems } from "@/ui/organism/Header/header.properties";

const ContactCard: FC<ContactCardProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col space-y-7 items-center border-2 border-secondary rounded-r-2xl rounded-bl-2xl p-10">
      {children}
    </div>
  );
};

const Contacts = () => {
  return (
    <>
      <Section fadeIn={true}>
        <Container className="flex flex-col">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="flex items-center gap-5">
              <div className="relative w-[190px] lg:w-[216px] h-40">
                <div className="absolute w-32 h-32 lg:w-36 lg:h-36 top-0 left-0">
                  <Image
                    fill
                    src={message_icon_two}
                    alt="message icon"
                    className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-110"
                  />
                </div>

                <div className="absolute w-32 h-32 lg:w-36 lg:h-36 bottom-0 right-0">
                  <Image
                    fill
                    src={message_icon}
                    alt="message icon"
                    className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-110"
                  />
                </div>
              </div>

              <div>
                <Title
                  text="¿Necesitas ayuda?"
                  className="text-[20px] md:text-[22px] lg:text-[25px]"
                  highlightFirstLetter={false}
                />

                <Title
                  className="text-[20px] md:text-[22px] lg:text-[25px]"
                  highlightFirstLetter={false}
                  text="¡Estamos para escucharte!"
                />
              </div>
            </div>

            <Text
              className="text-black text-[18px] md:text-[20px] lg:text-[22px]"
              text="Horario de atención: Lunes a Viernes - 8:00 am - 4:00pm"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-10 mt-15">
            <FormCard
              title="Ingresa la siguiente información para  registrar tu solicitud"
              form={
                <>
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
                </>
              }
              buttonAction={
                <>
                  <Button
                    text="Enviar"
                    variant="solid"
                    className="bg-secondary w-fit hover:bg-secondary-400 font-bold transition-colors duration-200 shadow-md"
                  />
                </>
              }
            />

            <div className="w-full xl:max-w-[400px] space-y-10">
              <ContactCard>
                <IconTitle
                  Icon={MessageSquare}
                  title="Canales de contacto"
                  classNameTitle="lg:text-[20px]"
                />

                <Text
                  text="Redes sociales"
                  className="text-secondary font-semibold"
                />

                <div className="flex gap-7">
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
                  className="text-secondary font-semibold underline"
                />

                <Text className="text-primary" text="ejemplo@correo.com" />
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
