import React from "react";
import { Search } from "lucide-react";
import { Input } from "@heroui/react";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onSearch?: () => void;
  onChange: (value: string) => void;
}

export const SearchBarComponent: React.FC<SearchBarProps> = ({
  value,
  placeholder = "Buscar por proyecto",
  onChange,
  onSearch,
}) => {
  return (
    <div className="flex w-full max-w-[500px] rounded-full border border-default-100 shadow-sm overflow-hidden h-[58px]">
      <Input
        size="lg"
        value={value}
        radius="none"
        variant="flat"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-full rounded-l-full text-[18px] bg-transparent border-none focus:outline-none"
        classNames={{
          input: "text-gray-700 placeholder:text-gray-400 h-full",
          inputWrapper: "h-full bg-transparent shadow-none border-none px-5",
        }}
      />

      <button
        onClick={onSearch}
        className="cursor-pointer h-full px-6 bg-secondary-300 rounded-r-full flex items-center justify-center hover:bg-secondary-400 transition-colors duration-200"
      >
        <Search className="text-white w-5 h-5" />
      </button>
    </div>
  );
};
