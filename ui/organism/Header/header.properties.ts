import X from "@/public/x-twiter-icono.svg";
import { Instagram, FacebookIcon, LucideYoutube } from "lucide-react";
import { StaticImageData } from "next/image";

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
      {
        label: "Estructura organizacional",
        key: "structure-team",
        href: "/about/structure-team",
      },
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
    type: "link",
    href: "/calls",
    items: [],
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

export const socialItems: SocialItem[] = [
  {
    icon: X,
    label: "Twitter",
    iconType: IconType.IMG,
    href: "https://twitter.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com",
  },
  {
    icon: LucideYoutube,
    label: "YouTube",
    href: "https://www.youtube.com",
  },
];
