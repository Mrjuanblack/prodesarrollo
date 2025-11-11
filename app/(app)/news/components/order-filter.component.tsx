import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { IconTitle } from "@/ui/molecules";
import { Radio, RadioGroup } from "@heroui/react";

export const OrderFilter = () => {
  const [selected, setSelected] = useState("reciente");

  return (
    <div className="bg-[#F2F6FF] p-4 lg:p-6 rounded-3xl shadow-md flex flex-col gap-2 lg:gap-4 w-full md:w-[300px]">
      <IconTitle
        title="Ordenar"
        Icon={ArrowUpDown}
        highlightFirstLetter={false}
        classNameTitle="font-medium text-[15px] md:text-[18px] lg:text-[20px]"
      />

      <RadioGroup
        label=""
        color="primary"
        value={selected}
        className="flex flex-col gap-2 lg:gap-3"
        onChange={(e) => setSelected(e.target.value)}
      >
        <Radio value="reciente">Más reciente</Radio>
        <Radio value="antiguo">Más antiguo</Radio>
      </RadioGroup>
    </div>
  );
};
