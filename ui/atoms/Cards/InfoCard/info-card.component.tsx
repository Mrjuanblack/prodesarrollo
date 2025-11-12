import React from "react";
import { Cog } from "lucide-react";
import { Text, Title } from "../..";
import { InfoCardProps } from "./info-card.properties";

export const InfoCardComponent: React.FC<InfoCardProps> = ({ item }) => {
  const { title, description } = item;

  return (
    <div className="h-full flex flex-col items-center text-center bg-white border border-secondary rounded-2xl p-4 lg:p-6 pt-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-primary rounded-full bg-white border border-secondary h-[75px] w-[75px] lg:h-[124px] lg:w-[124px] flex items-center justify-center shadow-lg -mt-9 lg:-mt-22">
        <Cog strokeWidth="1" className="w-[70%] h-[70%]" />
      </div>

      <Title
        text={title}
        className="mt-3 mb-4 lg:mb-8 text-[15px] md:text-[20px] lg:text-[25px]"
      />

      <Text
        text={description}
        className="text-black text-[13px] md:text-[15px] lg:text-[18px] leading-relaxed"
      />
    </div>
  );
};
