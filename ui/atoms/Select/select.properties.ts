import { ChangeEvent } from "react";

export interface Option {
  key: number;
  label: string;
  value: string;
}

export interface SelectProperties {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  shadow?: boolean;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  options?: Array<Option>;
  selectedKeys?: Array<string>;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}
