import React from "react";
import { FileText, MapPin } from "lucide-react";

export const BranchInfoCard: React.FC = () => {
  return (
    <div className="bg-[#F6F8FF] rounded-2xl p-6 md:p-8 text-center w-full max-w-[350px] shadow-sm">
      <div className="flex justify-center mb-4">
        <FileText className="w-10 h-10 text-primary" strokeWidth={1.8} />
      </div>

      <p className="text-primary font-medium text-[15px] leading-relaxed mb-6">
        También puedes enviar la documentación física a cualquiera de nuestras
        sedes.
      </p>

      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="bg-[#C7D3FF] p-2 rounded-full flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" strokeWidth={2} />
        </div>
        <h3 className="text-primary font-semibold text-[16px]">Sedes</h3>
      </div>

      <div className="space-y-4 text-[14px]">
        <div>
          <p className="text-[#91A3FF] font-semibold">Bucaramanga</p>
          <p className="text-primary">
            Ejemplo dirección sede Bucaramanga Santander
          </p>
        </div>

        <div>
          <p className="text-[#91A3FF] font-semibold">Bogotá</p>
          <p className="text-primary">
            Ejemplo dirección sede Bogotá Cundinamarca
          </p>
        </div>
      </div>
    </div>
  );
};
