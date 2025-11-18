import { FC } from "react";
import { Radio, RadioGroup } from "@heroui/react";
import { RadioGroupProperties } from "./radio-group.properties";

export const RadioGroupComponent: FC<RadioGroupProperties> = ({
  name,
  label,
  value,
  required,
  className,
  errorMessage,
  orientation = "vertical",
  isInvalid,
  options,
  onChange,
}) => {
  return (
    <RadioGroup
      size="md"
      name={name}
      value={value}
      label={label}
      isRequired={required}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      orientation={orientation}
      classNames={{
        label: "text-[15px] md:text-[16px] lg:text-[18px] text-primary",
      }}
      className={`${className}`}
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
