import { FC, useState } from "react";
import { Input } from "@heroui/react";
import { InputProperties } from "./input.properties";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const InputComponent: FC<InputProperties> = ({
  id,
  type,
  name,
  label,
  value,
  required,
  className,
  isInvalid,
  placeholder,
  startContent,
  errorMessage,
  labelPlacement,
  canTogglePassword = false,
  onBlur,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const finalType =
    canTogglePassword && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <Input
      id={id}
      size="lg"
      name={name}
      label={label}
      required={required}
      isInvalid={isInvalid}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
      type={finalType ?? "text"}
      errorMessage={errorMessage}
      labelPlacement={labelPlacement ?? "inside"}
      startContent={startContent}
      endContent={
        canTogglePassword && type === "password" ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="focus:outline-none"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        ) : undefined
      }
      className={`text-[15px] md:text-[18px] lg:text-[20px] ${className}`}
      classNames={{
        inputWrapper: "bg-white",
        input: "bg-white text-black",
      }}
    />
  );
};
