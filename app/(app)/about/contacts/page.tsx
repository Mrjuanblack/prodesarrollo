"use client";

import { FC } from "react";
import { Sedes } from "@/ui/organism";
import { Divider } from "@heroui/react";
import { MessageSquare } from "lucide-react";
import { ContactCardProps } from "./page.properties";
import { BackgroundSection, Text } from "@/ui/atoms";
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
        <Container>
          <div className="w-full"></div>
          <div className="w-full max-w-[400px] space-y-10">
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
        </Container>
      </Section>

      <BackgroundSection background="bg-white" />
    </>
  );
};

export default Contacts;
