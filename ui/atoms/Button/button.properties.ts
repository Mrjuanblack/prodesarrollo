// Core
import { ColorsBtn, TypesBtn, VariantsBtn } from "@/types";
import { PressEvent } from "@heroui/react";

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
