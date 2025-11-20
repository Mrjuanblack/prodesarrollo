import { FC } from "react";
import { Input } from "@heroui/react";
import { InputProperties } from "./input.properties";

export const InputComponent: FC<InputProperties> = ({
  id,
  type,
  name,
  label,
  value,
  required,
  className,
  isInvalid,
  endContent,
  placeholder,
  startContent,
  errorMessage,
  labelPlacement,
  onBlur,
  onChange,
}) => {
  return (
    <Input
      id={id}
      size="lg"
      name={name}
      value={value}
      label={label}
      required={required}
      isInvalid={isInvalid}
      type={type ?? "text"}
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
