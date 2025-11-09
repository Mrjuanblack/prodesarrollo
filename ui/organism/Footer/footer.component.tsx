import Image from "next/image";
import { Container } from "@/ui/molecules";
import { Phone, MapPin } from "lucide-react";
import gov_logo from "@/public/gov-co-logo.svg";
import { socialLinks } from "./footer.properties";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo-white.svg";
import Link from "next/link";

const SocialLinks = () => {
  return (
    <div className="flex gap-4">
      {socialLinks.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="h-[32px] w-[32px] lg:h-[50px] lg:w-[50px] flex justify-center items-center bg-white text-primary rounded-full p-2 hover:bg-gray-200 transition"
        >
          <Icon size={25} />
        </a>
      ))}
    </div>
  );
};

export const FooterComponent = () => {
  return (
    <footer className="bg-primary md:h-[400px] relative overflow-hidden rounded-tr-[200px] lg:rounded-tr-full flex items-center -mt-[400px]">
      <Container className="relative z-10 flex flex-row md:items-center gap-10 md:gap-20 xl:gap-30 py-15 md:py-10 lg:py-0">
        <div className="flex flex-col gap-3 md:hidden lg:flex">
          <Image
            alt="ProDesarrollo"
            src={pro_desarrollo_logo}
            className="h-[37px] lg:h-[69px] w-fit"
          />

          <Image
            src={gov_logo}
            alt="GOV.CO"
            className="h-[19px] lg:h-[36px] w-fit"
          />

          <div className="mt-1 md:hidden">
            <SocialLinks />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 md:gap-20 xl:gap-30">
          <div className="flex flex-col gap-2 text-white">
            <h3 className="text-[13px] md:text-[15px] lg:text-[18px] font-semibold text-secondary-200">
              Contacto
            </h3>

            <div className="flex items-start gap-2">
              <MapPin size={18} className="text-secondary-200" />

              <div>
                <p className="font-semibold text-[13px] md:text-[15px] lg:text-[18px]">
                  Sedes
                </p>
                <ul className="list-disc list-inside text-[13px] md:text-[15px] lg:text-[18px] leading-relaxed">
                  <li>Bogotá</li>
                  <li>Bucaramanga</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} className="text-secondary-200" />

              <p className="text-[13px] md:text-[15px] lg:text-[18px]">
                Teléfono: (+57) 324 543 2683
              </p>
            </div>

            <div className="mt-4 hidden md:block">
              <SocialLinks />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-white">
            <h3 className="text-[13px] md:text-[15px] lg:text-[18px] font-semibold text-secondary-200">
              Navegación
            </h3>

            <div className="flex flex-col items-start gap-2 font-semibold text-[13px] md:text-[15px] lg:text-[18px]">
              <a href="/about/about-us">Nosotros</a>
              <a href="/transparency">Transparencia</a>
              <Link href="/calls">Convocatorias</Link>
              <a href="/participate">Participa</a>
              <Link href="/news">Noticias</Link>
              <a href="/pqrs">PQRS</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
