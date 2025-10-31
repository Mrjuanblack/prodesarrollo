import noticiaExample from "@/public/noticia-example.svg";
import { NewsItem } from "@/ui/atoms/Cards/NewsCard/news-card.properties";

export interface LawItem {
  id: number;
  title: string;
  description: string;
  downloadUrl: string;
}

export const laws: LawItem[] = [
  {
    id: 1,
    title: "Ley 1712 de 2014",
    description:
      "- Por medio de la cual se crea la Ley de Transparencia y del Derecho de Acceso a la Información Pública Nacional y se dictan otras disposiciones.",
    downloadUrl: "/docs/ley-1712-2014.pdf",
  },
  {
    id: 2,
    title: "Decreto No. 1081",
    description:
      "del 26 de mayo de 2015 del Departamento Administrativo de la Presidencia de la República - Por medio del cual se expide el Decreto reglamentario único del sector Presidencia de la República.",
    downloadUrl: "/docs/ley-80-1993.pdf",
  },
  {
    id: 3,
    title: "Resolución No. 001519",
    description:
      "del 24 de Agosto de 2020 del Ministerio de Tecnologías de la información y las comunicaciones – “Por la cual se definen los estándares y directrices para publicar la información señalada en la Ley 1712 del 2014 y se definen los requisitos materia de acceso a la información pública, accesibilidad web, seguridad digital, y datos abiertos”",
    downloadUrl: "/docs/ley-1474-2011.pdf",
  },
];

export const news: NewsItem[] = [
  {
    id: 1,
    date: "23/11/2025",
    category: "Categoría",
    title: "Ejemplo título de noticia",
    href: "/news/1",
    image: noticiaExample,
  },
  {
    id: 2,
    category: "Categoría",
    title: "Ejemplo título de noticia",
    date: "23/11/2025",
    href: "/news/1",
    image: noticiaExample,
  },
  {
    id: 3,
    category: "Categoría",
    title: "Ejemplo título de noticia",
    date: "23/11/2025",
    href: "/news/1",
    image: noticiaExample,
  },
  {
    id: 4,
    category: "Categoría",
    title: "Otra noticia importante",
    date: "24/11/2025",
    href: "/news/1",
    image: noticiaExample,
  },
  {
    id: 5,
    category: "Categoría",
    title: "Un quinto ejemplo",
    date: "25/11/2025",
    href: "/news/1",
    image: noticiaExample,
  },
];
