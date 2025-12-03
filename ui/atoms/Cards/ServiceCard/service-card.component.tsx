import React from "react";
import { Text } from "../..";
import { ServiceCardProps } from "./service-card.properties";

export const ServiceCardComponent: React.FC<ServiceCardProps> = ({ item }) => {
  const { title, description, Icon } = item;

  return (
    <div className="h-full p-4 lg:p-6 bg-primary/70 rounded-lg shadow-md rounded-tr-[60px] lg:rounded-tr-[70px] flex flex-col">
      <div className="relative flex items-center gap-1 lg:gap-2 z-10">
        <Icon size={30} className="text-white" />

        <Text
          text={title}
          className="text-[15px] lg:text-[20px] text-white font-semibold leading-snug"
        />
      </div>

      <div className="mt-5 p-5 lg:p-7 bg-white rounded-lg rounded-tr-[60px] lg:rounded-tr-[70px] flex-1">
        <p className="text-black text-[15px] lg:text-[20px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
