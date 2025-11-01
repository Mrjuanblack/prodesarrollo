import { useState } from "react";
import { Select, SelectItem } from "@heroui/react";

export const FilterByState = () => {
  const [estado, setEstado] = useState("");

  const estados = [
    { key: "proceso", label: "En proceso" },
    { key: "finalizado", label: "Finalizado" },
  ];

  return (
    <div className="w-full md:w-[320px]">
      <Select
        radius="lg"
        label="Filtrar por estado"
        placeholder="Selecciona una opción"
        selectedKeys={estado ? [estado] : []}
        onChange={(e) => setEstado(e.target.value)}
        classNames={{
          label: "text-blue-900 text-[14px] font-medium",
          trigger:
            "h-[64px] px-5 text-[16px] text-gray-700 border border-gray-200 bg-[#F2F6FF] hover:bg-[#E9F0FF] focus:border-primary focus:ring-2 focus:ring-primary/30",
          value: "text-gray-600",
          popoverContent: "bg-[#F2F6FF] shadow-lg border border-gray-200",
          listbox: "bg-[#F2F6FF]",
        }}
      >
        {estados.map((item) => (
          <SelectItem key={item.key}>{item.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};
