import React, { ChangeEvent } from "react";
import { labelPlacementInput, TypesInput } from "@/types";

export interface InputProperties {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  type?: TypesInput;
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
