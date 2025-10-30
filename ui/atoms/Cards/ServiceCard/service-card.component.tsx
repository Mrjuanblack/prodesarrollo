import React from "react";
import { Text } from "../..";
import { Settings } from "lucide-react";
import { ServiceCardProps } from "./service-card.properties";

export const ServiceCardComponent: React.FC<ServiceCardProps> = ({ item }) => {
  const { title, description } = item;

  return (
    <div className="p-6 bg-primary/70 rounded-lg shadow-md rounded-tr-[70px]">
      <div className="relative flex items-start gap-2 z-10">
        <Settings size={30} className="text-white" />
        <Text
          text={title}
          className="text-[20px] text-white font-semibold leading-snug"
        />
      </div>

      <div className="mt-5 p-7 pr-10 bg-white rounded-lg rounded-tr-[70px]">
        <p className="text-black text-[18px] leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </div>
  );
};
