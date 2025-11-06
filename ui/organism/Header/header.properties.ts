import { Instagram, FacebookIcon, LucideYoutube, Twitter } from "lucide-react";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  type: "link" | "dropdown";
  items: SubMenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    type: "link",
    href: "/home",
    items: [],
  },
  {
    label: "Nosotros",
    type: "dropdown",
    items: [
      { label: "Quiénes somos", href: "/about/about-us" },
      { label: "Qué hacemos", href: "/about/what-we-do" },
      { label: "Estructura organizacional", href: "/about/structure-team" },
      { label: "Contactos", href: "/about/contacts" },
    ],
  },
  {
    label: "Transparencia",
    type: "link",
    href: "/transparency",
    items: [],
  },
  {
    label: "Convocatorias",
    type: "link",
    href: "/calls",
    items: [],
  },
  {
    label: "Participa",
    type: "link",
    href: "/participate",
    items: [],
  },
  {
    label: "Noticias",
    type: "link",
    href: "/news",
    items: [],
  },
  {
    label: "PQRS",
    type: "link",
    href: "/pqrs",
    items: [],
  },
];

export interface SocialItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const socialItems: SocialItem[] = [
  {
    icon: Twitter,
    label: "Twitter",
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
