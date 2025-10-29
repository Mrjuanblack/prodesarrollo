import { Search, Instagram, FacebookIcon, LucideYoutube } from "lucide-react";

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
      { label: "Quiénes somos", href: "/about-us" },
      { label: "Misión y visión", href: "/about-us" },
      { label: "Equipo", href: "/about-us" },
    ],
  },
  {
    label: "Transparencia",
    type: "link",
    href: "/",
    items: [],
  },
  {
    label: "Convocatorias",
    type: "dropdown",
    items: [
      { label: "Abiertas", href: "/" },
      { label: "Cerradas", href: "/" },
    ],
  },
  {
    label: "Noticias",
    type: "link",
    href: "/",
    items: [],
  },
  {
    label: "PQRS",
    type: "link",
    href: "/",
    items: [],
  },
];

export interface SocialItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export const socialItems: SocialItem[] = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: FacebookIcon, label: "Facebook", href: "#" },
  { icon: LucideYoutube, label: "YouTube", href: "#" },
];
