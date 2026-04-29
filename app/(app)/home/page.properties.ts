import dnp from "@/public/dnp-logo.svg";
import { StaticImageData } from "next/image";
import presidencia from "@/public/presidencia-logo.svg";
import contraloria from "@/public/contraloria-logo.svg";
import procuraduria from "@/public/procuraduria-logo.svg";
import alcaldia from "@/public/alcaldia-san-alberto-logo.svg";
import gobierno_digital from "@/public/gobierno-digital-logo.svg";
import cecop from "@/public/secop-logo.svg";

export interface EntityObserved {
  alt: string;
  img: StaticImageData;
}

export const entitiesObserved: EntityObserved[] = [
  {
    img: contraloria,
    alt: "Logo de Contraloría",
  },
  {
    img: procuraduria,
    alt: "Logo de Procuraduría",
  },
  {
    img: dnp,
    alt: "Logo de DNP",
  },
  {
    img: alcaldia,
    alt: "Logo de Alcaldía",
  },
  {
    img: presidencia,
    alt: "Logo de Presidencia",
  },
  {
    img: cecop,
    alt: "Logo de SECOP II",
  },
  {
    img: gobierno_digital,
    alt: "Logo de Gobierno digital",
  },
];
