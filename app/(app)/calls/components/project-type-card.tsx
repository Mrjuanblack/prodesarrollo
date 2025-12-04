import React from "react";
import Image, { StaticImageData } from "next/image";
import { getProjectTypeLabel, ProjectType } from "@/domain/Projects";

import obras from "@/public/obras.jpg";
import interventorias from "@/public/interventorias.jpg";
import procesosConsultoria from "@/public/procesos-de-consultoria.jpg";
import procesosSuministros from "@/public/procesos-de-suministros.jpg";
import prestacionServicios from "@/public/prestacion-de-servicios.jpg";

interface ProjectTypeCardProps {
  type: ProjectType;
  active?: boolean;
  onClick?: (value: ProjectType) => void;
}

const getProjectTypeImagePath = (type: ProjectType): StaticImageData => {
  switch (type) {
    case ProjectType.INTERVENTORY:
      return interventorias;
    case ProjectType.CIVIL_WORKS:
      return obras;
    case ProjectType.SUPPLY_PROCESSES:
      return procesosSuministros;
    case ProjectType.SERVICE_DELIVERY_PROCESSES:
      return prestacionServicios;
    case ProjectType.CONSULTING_PROCESSES:
      return procesosConsultoria;
  }
};

export const ProjectTypeCard: React.FC<ProjectTypeCardProps> = ({
  type,
  active = false,
  onClick,
}) => {
  const img = getProjectTypeImagePath(type);
  const title = getProjectTypeLabel(type);

  return (
    <button
      type="button"
      onClick={() => onClick?.(type)}
      className={`w-full flex flex-col items-center rounded-2xl border overflow-hidden
        h-[212px] md:h-[258px] lg:h-[278px] transition-all duration-300 cursor-pointer 
        focus:outline-none focus:ring-2 focus:ring-primary/40 hover:scale-[1.02]
        ${
          active
            ? "bg-secondary/10 border-secondary shadow-md"
            : "bg-white border-gray-200 hover:border-primary/40"
        }
      `}
    >
      <div className="relative w-full h-[144px] md:h-[190px] lg:h-[210px]">
        <Image
          fill
          src={img}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 scale-105 hover:scale-101"
        />
      </div>

      <div
        className={`flex items-center justify-center flex-1 w-full text-primary p-2 ${
          active ? "bg-secondary font-bold" : "bg-default-100 font-semibold"
        }`}
      >
        <p
          className={`
            text-center text-[13px] md:text-[16px] lg:text-[18px] transition-colors duration-200`}
        >
          {title}
        </p>
      </div>
    </button>
  );
};
