import { IconTitle } from "@/ui/molecules";
import { Select, SelectItem } from "@heroui/react";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export const CategoryFilter = () => {
  const [category, setCategory] = useState("");

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
      >
        <SelectItem key="activo" textValue="activo">
          Activo
        </SelectItem>
        <SelectItem key="inactivo" textValue="inactivo">
          Inactivo
        </SelectItem>
      </Select>
    </div>
  );
};
