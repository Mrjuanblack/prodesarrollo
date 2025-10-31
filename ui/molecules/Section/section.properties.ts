import { ReactNode } from "react";

export interface SectionProps {
  fadeIn?: boolean;
  className?: string;
  children: ReactNode;
  hasPadding?: boolean;
}
