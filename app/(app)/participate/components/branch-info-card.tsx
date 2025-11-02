import React from "react";
import { Text } from "@/ui/atoms";
import { IconTitle } from "@/ui/molecules";
import { FileText, MapPin } from "lucide-react";

export const BranchInfoCard: React.FC = () => {
  return (
    <div className="bg-[#F6F8FF] rounded-2xl p-6 md:p-8 text-center w-full max-w-[400px] shadow-md">
      <div className="flex justify-center mb-4">
        <FileText className="w-10 h-10 text-primary" strokeWidth={1.8} />
      </div>

      <Text
        className="text-primary font-medium lg:text-[20px] leading-relaxed mb-10"
        text="También puedes enviar la documentación física a cualquiera de nuestras sedes."
      />

      <div className="flex items-center justify-center gap-2 mb-4">
        <IconTitle
          title="Sedes"
          Icon={MapPin}
          classNameTitle="lg:text-[20px]"
        />
      </div>

      <div className="space-y-4 text-[20px]">
        <div>
          <Text text="Bucaramanga" className="text-secondary font-semibold" />

          <Text
            className="text-primary"
            text="Ejemplo dirección sede Bucaramanga Santander"
          />
        </div>

        <div>
          <Text text="Bogotá" className="text-secondary font-semibold" />
          <Text
            className="text-primary"
            text="Ejemplo dirección sede Bogotá Cundinamarca"
          />
        </div>
      </div>
    </div>
  );
};
