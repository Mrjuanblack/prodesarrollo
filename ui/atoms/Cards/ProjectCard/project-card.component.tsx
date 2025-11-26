"use client";

import Image from "next/image";
import { ProjectCardProps } from "./project-card.properties";
import { ProjectType } from "@/domain/Projects";
import { useRouter } from "next/navigation";

export const ProjectCardComponent: React.FC<ProjectCardProps> = ({ item }) => {
  const router = useRouter();

  const getImage = (): string => {
    switch(item.type) {
      case ProjectType.INTERVENTORY:
        return "/img/project-type/interventory.jpg"
      case ProjectType.CIVIL_WORKS:
        return "/img/project-type/civil-works.jpg"
      case ProjectType.SUPPLY_PROCESSES:
        return "/img/project-type/supply-processes.jpg"
      case ProjectType.SERVICE_DELIVERY_PROCESSES:
        return "/img/project-type/service-delivery-processes.jpg"
      case ProjectType.CONSULTING_PROCESSES:
        return "/img/project-type/consulting-processes.jpg"
    }
  }

  return (
    <div onClick={() => router.push(`/calls/${item.id}`)} className="flex flex-col justify-between p-6 lg:p-8 bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-101 cursor-pointer h-full">
      <div>
        <h3 className="text-[15px] lg:text-[18px] font-semibold text-black leading-tight mb-2">
          {item.title}
        </h3>

        <p className="text-[13px] lg:text-[15px] text-gray-500 mb-4">{item.date.toLocaleDateString()}</p>
      </div>

      <div className="relative w-full h-[230px] rounded-lg overflow-hidden">
        <Image
          src={getImage()}
          alt={item.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
