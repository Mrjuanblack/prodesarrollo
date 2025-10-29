import contraloria from "@/public/contraloria.png";
import procuraduria from "@/public/procuraduria-logo.svg";
import { StaticImageData } from "next/image";

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
];
