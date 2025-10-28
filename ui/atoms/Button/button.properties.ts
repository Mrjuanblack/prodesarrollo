// Core
import { PressEvent } from "@heroui/react";
import { ColorsBtn, TypesBtn, VariantsBtn } from "@/types";

export interface ButtonProperties {
  text: string;
  type?: TypesBtn;
  className?: string;
  color?: ColorsBtn;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: VariantsBtn;
  endContent?: React.ReactNode;
  onClick?: (event?: PressEvent) => void;
}
