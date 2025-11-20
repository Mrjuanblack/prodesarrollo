import { FC } from "react";
import { Radio, RadioGroup } from "@heroui/react";
import { RadioGroupProperties } from "./radio-group.properties";

export const RadioGroupComponent: FC<RadioGroupProperties> = ({
  id,
  name,
  label,
  value,
  required,
  className,
  errorMessage,
  orientation = "vertical",
  isInvalid,
  options,
  onBlur,
  onChange,
}) => {
  return (
    <RadioGroup
      id={id}
      size="md"
      name={name}
      value={value}
      label={label}
      isRequired={required}
      isInvalid={isInvalid}
      orientation={orientation}
      errorMessage={errorMessage}
      className={`${className}`}
      classNames={{
        label: "text-[15px] md:text-[16px] lg:text-[18px] text-primary",
      }}
      onBlur={onBlur}
      onChange={onChange}
    >
      {options.map((option) => (
        <Radio key={option.key} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </RadioGroup>
  );
};
