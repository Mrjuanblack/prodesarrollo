import noticiaExample from "@/public/noticia-example.svg";
import { ProjectTypeItem } from "./components/project-type-card";

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
