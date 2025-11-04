import noticiaExample from "@/public/noticia-example.svg";
import { ProjectTypeItem } from "./components/project-type-card";
import { CallItem } from "@/ui/atoms/Cards/CallCard/call-card.properties";

export const calls: CallItem[] = [
  {
    id: 1,
    estado: "En proceso",
    fechaApertura: "27/10/2025",
    titulo: "Construcción de cubierta para cancha múltiple",
    descripcion:
      "Interventoría técnica, administrativa y financiera para el proyecto de construcción de estructura y cubierta para cancha múltiple en la vereda Paramito del municipio de Barichara, Santander.",
  },
  {
    id: 2,
    estado: "Finalizado",
    fechaApertura: "15/09/2025",
    titulo: "Mejoramiento de vías rurales",
    descripcion:
      "Supervisión y control de la obra de mejoramiento de vías terciarias en el municipio de Villanueva, Santander.",
  },
  {
    id: 3,
    estado: "En proceso",
    fechaApertura: "05/10/2025",
    titulo: "Construcción de alcantarillado sanitario",
    descripcion:
      "Interventoría para la construcción del sistema de alcantarillado sanitario y planta de tratamiento en el corregimiento de Guane, municipio de Barichara.",
  },
  {
    id: 4,
    estado: "Finalizado",
    fechaApertura: "02/08/2025",
    titulo: "Rehabilitación del parque principal",
    descripcion:
      "Proyecto de restauración del parque principal del municipio de Curití, con enfoque turístico y cultural.",
  },
];

interface btnItem {
  id: number;
  year: number;
}

export const btns: btnItem[] = [
  {
    id: 1,
    year: 2025,
  },
  {
    id: 2,
    year: 2026,
  },
  {
    id: 3,
    year: 2027,
  },
];

export const options: ProjectTypeItem[] = [
  {
    id: 1,
    img: noticiaExample,
    title: "Infraestructura",
  },
  {
    id: 2,
    img: noticiaExample,
    title: "Proyectos Sociales",
  },
  {
    id: 3,
    img: noticiaExample,
    title: "Educación",
  },
  {
    id: 4,
    img: noticiaExample,
    title: "Educación",
  },
  {
    id: 5,
    img: noticiaExample,
    title: "Educación",
  },
  {
    id: 6,
    img: noticiaExample,
    title: "Educación",
  },
];
