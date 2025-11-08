import { Instagram, FacebookIcon, LucideYoutube, Twitter } from "lucide-react";

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
