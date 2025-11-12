import React, { FC } from "react";
import { Textarea } from "@heroui/react";
import { TextAreaProperties } from "./text-area.properties";

export const TextAreaComponent: FC<TextAreaProperties> = ({
  name,
  label,
  value,
  required,
  endContent,
  placeholder,
  className,
  labelPlacement,
  startContent,
  errorMessage,
  isInvalid,
  onChange,
}) => {
  return (
    <Textarea
      size="lg"
      name={name}
      value={value}
      label={label}
      required={required}
      isInvalid={isInvalid}
      endContent={endContent}
      placeholder={placeholder}
      className={`text-[15px] md:text-[18px] lg:text-[20px] ${className}`}
      startContent={startContent}
      errorMessage={errorMessage}
      labelPlacement={labelPlacement ?? "inside"}
      onChange={onChange}
      classNames={{
        inputWrapper: "bg-white",
        input: "bg-white text-black",
      }}
    />
  );
};
