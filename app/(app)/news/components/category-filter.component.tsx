import { useState } from "react";
import { IconTitle } from "@/ui/molecules";
import { SlidersHorizontal } from "lucide-react";
import { Select } from "@/ui/atoms";

export const CategoryFilter = () => {
  const [category, setCategory] = useState("");

  const options = [
    { key: 1, label: "Activo", value: "activo" },
    {
      key: 2,
      label: "Inactivo",
      value: "inactivo",
    },
  ];

  return (
    <div className="bg-[#F2F6FF] p-6 rounded-3xl shadow-md flex flex-col gap-4 w-full md:w-[300px]">
      <IconTitle
        title="Filtrar por categoría"
        Icon={SlidersHorizontal}
        highlightFirstLetter={false}
        classNameTitle="lg:text-black lg:text-[20px] lg:text-light"
      />

      <Select
        className="max-w-xs"
        selectedKeys={[category]}
        label="Filtrar por estado"
        placeholder="Selecciona una opción"
        onChange={(e) => setCategory(e.target.value)}
        options={options}
      />
    </div>
  );
};
