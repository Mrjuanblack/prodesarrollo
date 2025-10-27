import { ReactNode } from "react";

export interface SectionProps {
  fadeIn?: boolean;
  children: ReactNode;
  className?: string;
}
