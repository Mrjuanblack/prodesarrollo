import React, { FC } from "react";
import { Textarea } from "@heroui/react";
import { TextAreaProperties } from "./text-area.properties";

export const TextAreaComponent: FC<TextAreaProperties> = ({
  id,
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
  onBlur,
  onChange,
}) => {
  return (
    <Textarea
      id={id}
      size="lg"
      name={name}
      value={value}
      label={label}
      required={required}
      isInvalid={isInvalid}
      endContent={endContent}
      placeholder={placeholder}
      startContent={startContent}
      errorMessage={errorMessage}
      labelPlacement={labelPlacement ?? "inside"}
      className={`text-[15px] md:text-[18px] lg:text-[20px] ${className}`}
      classNames={{
        inputWrapper: "bg-white",
        input: "bg-white text-black",
      }}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};
