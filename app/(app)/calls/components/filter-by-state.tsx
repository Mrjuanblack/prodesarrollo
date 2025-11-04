import { Select } from "@/ui/atoms";
import { useState } from "react";

export const FilterByState = () => {
  const [estado, setEstado] = useState("");

  const estados = [
    { key: 1, label: "En proceso", value: "En proceso" },
    { key: 1, label: "Finalizado", value: "Finalizado" },
  ];

  return (
    <div className="w-full md:w-[320px]">
      <Select
        shadow={true}
        options={estados}
        label="Filtrar por estado"
        placeholder="Selecciona una opción"
        selectedKeys={estado ? [estado] : []}
        onChange={(e) => setEstado(e.target.value)}
      />
    </div>
  );
};
