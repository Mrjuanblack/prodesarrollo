import React from "react";
import { Text } from "@/ui/atoms";
import { Sedes } from "@/ui/organism";
import { FileText } from "lucide-react";

export const BranchInfoCard: React.FC = () => {
  return (
    <div className="bg-[#F6F8FF] rounded-2xl p-6 md:p-8 text-center w-full lg:max-w-[400px] shadow-md">
      <div className="flex justify-center mb-2 lg:mb-4">
        <FileText
          strokeWidth={1}
          className="w-8 h-8 lg:w-10 lg:h-10 text-primary"
        />
      </div>

      <Text
        className="text-primary font-medium text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed mb-7 lg:mb-10"
        text="También puedes enviar la documentación física a cualquiera de nuestras sedes."
      />

      <Sedes />
    </div>
  );
};
