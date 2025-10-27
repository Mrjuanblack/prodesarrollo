// Core
import Image from "next/image";
import { Divider } from "@heroui/react";

// Components
import { Link, Text } from "@/ui/atoms";

// Properties
import { footerSections, socialLinks } from "./footer.properties";

export const FooterComponent = () => {
  return (
    <section className="py-24 flex justify-center px-7">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col justify-between items-start gap-8 md:flex-row">
          <div className="flex flex-col gap-5 flex-3 min-w-full md:min-w-[250px]">
            <Image
              width={40}
              height={40}
              alt="nexa code Logo"
              src={"/public/favicon.png"}
            />

            <Text
              className="text-md max-w-sm"
              text="Creamos soluciones web y software a la medida para impulsar la transformación digital de tu negocio. Innovación, calidad y resultados."
            />

            <div className="flex flex-row gap-3">
              {socialLinks.map((link) => {
                const LucideIcon = link.icon;

                return (
                  <Link key={link.label} href={link.href} isExternal={true}>
                    <LucideIcon
                      aria-label={`Enlace a ${link.label}`}
                      className="w-10 h-10 p-2 bg-primary-300 text-white shadow rounded-full"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {footerSections.map((section) => (
            <div
              key={section.title}
              className="flex flex-col flex-1 min-w-[120px] md:min-w-auto"
            >
              <Text
                text={section.title}
                className="text-lg font-bold mb-4 text-gray-700"
              />

              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <Link
                    size="md"
                    key={item.label}
                    href={item.href}
                    text={item.label}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col justify-between items-start gap-2 md:flex-row md:items-center">
          <Text text="Términos y Condiciones" className="text-md" />
          <Text
            text={`Todos los Derechos Reservados © ${new Date().getFullYear()} Nexa Code.`}
            className="text-md"
          />
        </div>
      </div>
    </section>
  );
};
