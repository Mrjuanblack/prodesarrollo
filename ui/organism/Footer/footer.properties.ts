// Core
import { ComponentType, SVGProps } from "react";
import { navItems } from "../Header/header.properties";
import { Instagram, Twitter, Linkedin } from "lucide-react";

interface SocialLink {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const socialLinks: SocialLink[] = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/tuperfil",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/tuperfil",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/tuperfil",
    label: "LinkedIn",
  },
];

export const footerSections = [
  {
    title: "Nexa Code",
    items: navItems,
  },
  {
    title: "Nuestros Servicios",
    items: [
      { label: "Desarrollo de Software a Medida", href: "/services" },
      { label: "Creación de Páginas Web", href: "/services" },
    ],
  },
  {
    title: "Contáctanos",
    items: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Support", href: "/support" },
    ],
  },
];
