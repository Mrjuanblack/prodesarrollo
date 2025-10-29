import React from "react";
import { Settings } from "lucide-react";
import { ServiceCardProps } from "./service-card.properties";

export const ServiceCardComponent: React.FC<ServiceCardProps> = ({ item }) => {
  const { title, description } = item;

  return (
    <div className="w-[340px] bg-white rounded-3xl shadow-md border border-[#184E94] overflow-hidden">
      <div className="relative bg-[#184E94] text-white px-6 pt-5 pb-4 rounded-t-3xl">
        <div className="relative flex items-start gap-2 z-10">
          <Settings className="w-6 h-6 mt-0.5" />
          <h3 className="text-[17px] font-semibold leading-snug">{title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className="text-gray-800 text-sm leading-relaxed text-justify">
          {description.split(" ").map((word, index) => {
            const cleanWord = word
              .toLowerCase()
              .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
            const isBold = ["garantizar", "calidad", "eficiencia"].includes(
              cleanWord
            );

            return (
              <React.Fragment key={index}>
                <span className={isBold ? "font-bold" : ""}>{word}</span>
                {index < description.split(" ").length - 1 && " "}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </div>
  );
};
