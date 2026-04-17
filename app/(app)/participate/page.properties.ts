import { StaticImageData } from "next/image";
import { IdTypeOptions } from "@/domain/shared";
import { ParticipateProfileType } from "@/domain/participate";
import personaJuridica from "@/public/persona-juridica.jpg";
import personaNatural from "@/public/persona-natural.jpg";

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

export interface ProjectItem {
  id: number;
  name: string;
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    name: "Ley 1712 de 2014",
  },
  {
    id: 2,
    name: "Decreto No. 1081",
  },
  {
    id: 3,
    name: "Resolución No. 001519",
  },
];

export const naturalDocuments: ProjectItem[] = [
  { id: 1, name: "Fotocopia del documento de identidad" },
  { id: 2, name: "Hoja de vida con soportes" },
  { id: 3, name: "Certificación bancaria vigente" },
  { id: 4, name: "RUT actualizado" },
];

export const juridicaDocuments: ProjectItem[] = [
  { id: 1, name: "Certificado de existencia y representación legal" },
  { id: 2, name: "RUT de la empresa" },
  { id: 3, name: "Fotocopia del documento del representante legal" },
  { id: 4, name: "Certificación bancaria vigente" },
  { id: 5, name: "Estados financieros del último periodo" },
];

export interface ProfileTypeItem {
  id: number;
  title: string;
  img: StaticImageData;
  profileType: ParticipateProfileType;
}

export const profileTypes: ProfileTypeItem[] = [
  {
    id: 1,
    title: "Persona natural",
    img: personaNatural,
    profileType: ParticipateProfileType.NATURAL,
  },
  {
    id: 2,
    title: "Persona jurídica",
    img: personaJuridica,
    profileType: ParticipateProfileType.JURIDICA,
  },
];

export const idTypes = [
  {
    key: 1,
    label: "Cédula de ciudadanía",
    value: IdTypeOptions.CEDULA_CIUDADANIA,
  },
  {
    key: 2,
    label: "Tarjeta de identidad",
    value: IdTypeOptions.TARJETA_IDENTIDAD,
  },
  {
    key: 3,
    label: "Cédula de extranjería",
    value: IdTypeOptions.CEDULA_EXTRANJERIA,
  },
  { key: 4, label: "Pasaporte", value: IdTypeOptions.PASAPORTE },
];
