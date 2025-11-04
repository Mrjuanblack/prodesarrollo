import { FC } from "react";
import { Select, SelectItem } from "@heroui/react";
import { Option, SelectProperties } from "./select.properties";

export const SelectComponent: FC<SelectProperties> = ({
  name,
  label,
  value,
  options = [],
  required,
  placeholder,
  selectedKeys,
  shadow = false,
  className,
  errorMessage,
  isInvalid,
  onChange,
}) => {
  return (
    <Select
      size="lg"
      name={name}
      value={value}
      label={label}
      required={required}
      isInvalid={isInvalid}
      placeholder={placeholder}
      className={`${className}`}
      errorMessage={errorMessage}
      selectedKeys={selectedKeys}
      onChange={onChange}
      classNames={{
        trigger: `bg-white ${shadow ? "shadow-md" : "shadow-none"}`,
        value: "text-black",
        listbox: "bg-white text-black",
        popoverContent: "bg-white",
      }}
    >
      {options.map((option: Option) => {
        return (
          <SelectItem key={option.key} textValue={option.value}>
            {option.label}
          </SelectItem>
        );
      })}
    </Select>
  );
};
