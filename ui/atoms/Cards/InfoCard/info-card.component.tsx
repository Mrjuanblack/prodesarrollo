import React from "react";
import { Cog } from "lucide-react";
import { Text, Title } from "../..";
import { InfoCardProps } from "./info-card.properties";

export const InfoCardComponent: React.FC<InfoCardProps> = ({ item }) => {
  const { title, description } = item;

  return (
    <div className="mt-13 lg:mt-17 flex flex-col items-center text-center bg-white border border-secondary rounded-2xl p-6 pt-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-primary mb-5 rounded-full bg-white border border-secondary h-[100px] w-[100px] lg:h-[124px] lg:w-[124px] flex items-center justify-center shadow-lg -mt-12 lg:-mt-17">
        <Cog size={60} />
      </div>

      <Title text={title} className="mb-4 lg:mb-8 text-[15px] lg:text-[20px]" />

      <Text
        text={description}
        className="text-black text-[15px] lg:text-[18px] leading-relaxed"
      />
    </div>
  );
};
