import X from "@/public/x-twiter-icono.svg";
import { Instagram, FacebookIcon, LucideYoutube } from "lucide-react";

interface SubMenuItem {
  key: string;
  label: string;
  href: string;
}

interface MenuItem {
  key: string;
  label: string;
  href?: string;
  type: "link" | "dropdown";
  items: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    key: "home",
    label: "Inicio",
    type: "link",
    href: "/home",
    items: [],
  },
  {
    key: "about",
    label: "Nosotros",
    type: "dropdown",
    items: [
      { label: "Quiénes somos", key: "about-us", href: "/about/about-us" },
      { label: "Qué hacemos", key: "what-we-do", href: "/about/what-we-do" },
      // Deshabilitado temporalmente — restaurar cuando se rehabilite estructura organizacional
      // {
      //   label: "Estructura organizacional",
      //   key: "structure-team",
      //   href: "/about/structure-team",
      // },
      { label: "Contactos", key: "contacts", href: "/about/contacts" },
    ],
  },
  {
    key: "transparency",
    label: "Transparencia",
    type: "link",
    href: "/transparency",
    items: [],
  },
  {
    key: "calls",
    label: "Convocatorias",
    type: "dropdown",
    items: [
      { label: "Proyectos", key: "prohects", href: "/calls" },
      // Deshabilitado temporalmente — restaurar cuando se rehabilite donaciones
      // {
      //   label: "Proyectos - Donaciones",
      //   key: "projects-donations",
      //   href: "/donations",
      // },
    ],
  },
  {
    key: "participate",
    label: "Participa",
    type: "link",
    href: "/participate",
    items: [],
  },
  {
    key: "news",
    label: "Noticias",
    type: "link",
    href: "/news",
    items: [],
  },
  {
    key: "pqrs",
    label: "PQRS",
    type: "link",
    href: "/pqrs",
    items: [],
  },
];

export enum IconType {
  IMG = "img",
  ICON = "icon",
}
export interface SocialItem {
  label: string;
  href: string;
  iconType?: IconType;
  icon: React.ElementType;
}

// Vaciado temporalmente — la organización aún no tiene presencia en redes
// sociales. Restaurar las entradas cuando se publiquen las cuentas oficiales.
export const socialItems: SocialItem[] = [];
