import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { IconTitle } from "@/ui/molecules";
import { Radio, RadioGroup } from "@heroui/react";
import { Select } from "@/ui/atoms";

export const OrderFilter = () => {
  const [selected, setSelected] = useState("reciente");

  const options = [
    { key: 1, label: "Más reciente", value: "reciente" },
    {
      key: 2,
      label: "Más antiguo",
      value: "antiguo",
    },
  ];

  return (
    <div className="md:bg-[#F2F6FF] md:p-4 lg:p-6 rounded-3xl shadow-md flex flex-col gap-2 lg:gap-4 w-full md:w-[300px]">
      <div className="hidden md:block">
        <IconTitle
          title="Ordenar"
          Icon={ArrowUpDown}
          highlightFirstLetter={false}
          classNameTitle="font-medium text-[15px] md:text-[18px] lg:text-[20px]"
        />
      </div>

      <RadioGroup
        label=""
        color="primary"
        value={selected}
        className="hidden md:flex flex-col gap-2 lg:gap-3"
        onChange={(e) => setSelected(e.target.value)}
      >
        <Radio value="reciente">Más reciente</Radio>
        <Radio value="antiguo">Más antiguo</Radio>
      </RadioGroup>

      <Select
        label="Ordenar"
        options={options}
        className="md:hidden max-w-xs"
        selectedKeys={[selected]}
        placeholder="Selecciona una opción"
        onChange={(e) => setSelected(e.target.value)}
      />
    </div>
  );
};
