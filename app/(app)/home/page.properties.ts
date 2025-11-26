import {
  ContentBlock,
  ContentSlideProps,
} from "@/ui/atoms/Cards/ContentSlideCard/content-slide-card.properties";
import dnp from "@/public/dnp-logo.svg";
import { StaticImageData } from "next/image";
import header from "@/public/header-home.svg";
import presidencia from "@/public/presidencia-logo.svg";
import contraloria from "@/public/contraloria-logo.svg";
import procuraduria from "@/public/procuraduria-logo.svg";
import proyectoExample from "@/public/proyecto-example.svg";
import alcaldia from "@/public/alcaldia-san-alberto-logo.svg";
import gobierno_digital from "@/public/gobierno-digital-logo.svg";
import cecop from "@/public/secop-logo.svg";
import { BookOpen, Globe, HeartHandshake, User } from "lucide-react";

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

const slideOneItems: ContentBlock[] = [
  {
    id: 11,
    icon: BookOpen,
    title: "Cultura e identidad territorial",
    description:
      "Promovemos el fortalecimiento de la identidad cultural y el patrimonio local como pilares del desarrollo territorial. Fomentamos procesos de formación, circulación y gestión cultural que rescaten las tradiciones, la memoria colectiva y las expresiones artísticas de las comunidades.",
  },
  {
    id: 12,
    icon: Globe,
    title: "Educación sin fronteras",
    description:
      "Acompañamos iniciativas educativas innovadoras que amplían el acceso al conocimiento, fomentan la investigación y fortalecen la formación técnica, tecnológica y profesional, trascendiendo las limitaciones geográficas y sociales para generar oportunidades de desarrollo.",
  },
];

const slideTwoItems: ContentBlock[] = [
  {
    id: 21,
    icon: User,
    title: "Desarrollo comunitario sostenible",
    description:
      "Implementamos programas de desarrollo que empoderan a las comunidades, fortaleciendo sus capacidades productivas y promoviendo prácticas que aseguren la conservación del medio ambiente para las futuras generaciones.",
  },
  {
    id: 22,
    icon: HeartHandshake,
    title: "Inclusión y equidad social",
    description:
      "Trabajamos para reducir las brechas de desigualdad, asegurando que todos los miembros de la sociedad tengan acceso a oportunidades justas, independientemente de su origen o condición social.",
  },
];

export const carouselSlides: ContentSlideProps[] = [
  {
    id: 1,
    img: header,
    items: slideOneItems,
  },
  {
    id: 2,
    img: header,
    items: slideTwoItems,
  },
];
