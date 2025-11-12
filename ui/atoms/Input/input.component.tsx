import { FC } from "react";
import { Input } from "@heroui/react";
import { InputProperties } from "./input.properties";

export const InputComponent: FC<InputProperties> = ({
  type,
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
    <Input
      size="lg"
      name={name}
      value={value}
      label={label}
      required={required}
      isInvalid={isInvalid}
      type={type ?? "text"}
      endContent={endContent}
      placeholder={placeholder}
      className={`text-[15px] md:text-[18px] lg:text-[20px] ${className}`}
      classNames={{
        inputWrapper: "bg-white",
        input: "bg-white text-black",
      }}
      startContent={startContent}
      errorMessage={errorMessage}
      labelPlacement={labelPlacement ?? "inside"}
      onChange={onChange}
    />
  );
};
