import {
  ContentBlock,
  ContentSlideProps,
} from "@/ui/atoms/Cards/ContentSlideCard/content-slide-card.properties";
import dnp from "@/public/dnp-logo.svg";
import { StaticImageData } from "next/image";
import header from "@/public/header-home.svg";
import contraloria from "@/public/contraloria-logo.svg";
import procuraduria from "@/public/procuraduria-logo.svg";
import noticiaExample from "@/public/noticia-example.svg";
import proyectoExample from "@/public/proyecto-example.svg";
import alcaldia from "@/public/alcaldia-san-alberto-logo.svg";
import { BookOpen, Globe, HeartHandshake, User } from "lucide-react";
import { NewsItem } from "@/ui/atoms/Cards/NewsCard/news-card.properties";
import { ProjectItem } from "@/ui/atoms/Cards/ProjectCard/project-card.properties";

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
];

export const news: NewsItem[] = [
  {
    id: 1,
    category: "Categoría",
    title: "Ejemplo título de noticia",
    date: "23/11/2025",
    image: noticiaExample,
  },
  {
    id: 2,
    category: "Categoría",
    title: "Ejemplo título de noticia",
    date: "23/11/2025",
    image: noticiaExample,
  },
  {
    id: 3,
    category: "Categoría",
    title: "Ejemplo título de noticia",
    date: "23/11/2025",
    image: noticiaExample,
  },
  {
    id: 4,
    category: "Categoría",
    title: "Otra noticia importante",
    date: "24/11/2025",
    image: noticiaExample,
  },
  {
    id: 5,
    category: "Categoría",
    title: "Un quinto ejemplo",
    date: "25/11/2025",
    image: noticiaExample,
  },
];

export const projects: ProjectItem[] = [
  {
    id: 1,
    imageUrl: proyectoExample,
    date: "Noviembre 23 de 2025",
    title: "Ejemplo proyecto de obra social en Bucaramanga",
    imageAlt: "Vista aérea de una obra social en construcción.",
  },
  {
    id: 2,
    imageUrl: proyectoExample,
    date: "Octubre 10 de 2024",
    title: "Restauración de parque histórico en Medellín",
    imageAlt: "Parque histórico con fuentes y jardines.",
  },
  {
    id: 3,
    date: "Enero 5 de 2026",
    imageUrl: proyectoExample,
    imageAlt: "Trabajos de pavimentación en una carretera rural.",
    title: "Implementación de infraestructura vial en Cundinamarca",
  },
  {
    id: 4,
    imageUrl: proyectoExample,
    date: "Septiembre 1 de 2024",
    title: "Desarrollo de Vivienda de Interés Social (VIS) en Cali",
    imageAlt: "Conjunto de viviendas terminadas con áreas verdes.",
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
