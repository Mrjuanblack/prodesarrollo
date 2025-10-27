import { ColorsLink, Size } from "@/types";

export interface LinkProperties {
  text?: string;
  size?: Size;
  href?: string;
  className?: string;
  color?: ColorsLink;
  isExternal?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}
