import React from "react";
import { Text } from "@/ui/atoms";
import { Sedes } from "@/ui/organism";
import { FileText } from "lucide-react";

export const BranchInfoCard: React.FC = () => {
  return (
    <div className="bg-[#F6F8FF] rounded-2xl p-6 md:p-8 text-center w-full lg:max-w-[400px] shadow-md">
      <div className="flex justify-center mb-4">
        <FileText className="w-10 h-10 text-primary" strokeWidth={1.8} />
      </div>

      <Text
        className="text-primary font-medium lg:text-[20px] leading-relaxed mb-10"
        text="También puedes enviar la documentación física a cualquiera de nuestras sedes."
      />

      <Sedes />
    </div>
  );
};
