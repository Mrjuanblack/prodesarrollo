import React, { ChangeEvent } from "react";
import { labelPlacementInput } from "@/types";

export interface TextAreaProperties {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
  endContent?: React.ReactNode;
  startContent?: React.ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
  labelPlacement?: labelPlacementInput;
  onBlur?: () => void;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}
