import React, { ChangeEvent } from "react";
import { labelPlacementInput, TypesInput } from "@/types";

export interface InputProperties {
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
  onChange?: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}
