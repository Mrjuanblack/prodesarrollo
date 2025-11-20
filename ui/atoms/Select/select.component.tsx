import { FC } from "react";
import { Select, SelectItem } from "@heroui/react";
import { Option, SelectProperties } from "./select.properties";

export const SelectComponent: FC<SelectProperties> = ({
  id,
  name,
  label,
  required,
  className,
  isInvalid,
  placeholder,
  options = [],
  errorMessage,
  selectedKeys,
  shadow = false,
  onBlur,
  onChange,
}) => {
  return (
    <Select
      id={id}
      size="lg"
      name={name}
      label={label}
      onBlur={onBlur}
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
          <SelectItem key={option.value} textValue={option.label}>
            {option.label}
          </SelectItem>
        );
      })}
    </Select>
  );
};
