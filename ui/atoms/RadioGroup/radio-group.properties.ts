import { ChangeEvent } from "react";

export interface Option {
  key: number;
  label: string;
  value: string;
}

export interface RadioGroupProperties {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  className?: string;
  errorMessage?: string;
  orientation?: "horizontal" | "vertical";
  isInvalid?: boolean;
  options: Option[];
  onBlur?: () => void;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}
