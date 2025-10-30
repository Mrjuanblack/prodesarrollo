import Image from "next/image";
import { Container } from "@/ui/molecules";
import { Phone, MapPin } from "lucide-react";
import gov_logo from "@/public/gov-co-logo.svg";
import { socialLinks } from "./footer.properties";
import pro_desarrollo_logo from "@/public/pro-desarrollo-logo-white.svg";

export const FooterComponent = () => {
  return (
    <footer className="bg-primary text-white py-20 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[380px] h-[380px] bg-default-100 overflow-hidden z-0"
        style={{
          transform: "rotate(-90deg)",
        }}
      >
        <div className="absolute top-[-380px] left-[-380px] w-[760px] h-[760px] bg-primary rounded-full" />
      </div>

      <Container>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-70">
          <div className="flex flex-col gap-3">
            <Image
              alt="ProDesarrollo"
              src={pro_desarrollo_logo}
              className="h-auto w-[220px]"
            />

            <Image
              src={gov_logo}
              alt="GOV.CO"
              className="h-auto w-[120px] mt-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] font-semibold text-secondary-200">
              Contacto
            </h3>

            <div className="flex items-start gap-2 mt-1">
              <MapPin size={18} className="mt-1 text-secondary-200" />

              <div>
                <p className="font-semibold text-[18px]">Sedes</p>
                <ul className="list-disc list-inside text-[18px] leading-relaxed">
                  <li>Bogotá</li>
                  <li>Bucaramanga</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Phone size={18} className="text-secondary-200" />
              <p className="text-[18px]">Teléfono: (+57) 324 543 2683</p>
            </div>

            <div className="flex gap-4 mt-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="h-[50px] w-[50px] flex justify-center items-center bg-white text-primary rounded-full p-2 hover:bg-gray-200 transition"
                >
                  <Icon size={25} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
