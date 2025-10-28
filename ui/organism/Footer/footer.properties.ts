import { SocialItem, socialItems } from "./../Header/header.properties";

export const socialLinks: SocialItem[] = socialItems.filter(
  (social) => social.label !== "Buscar"
);
