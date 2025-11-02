import { Text, Title } from "../..";
import { Search } from "lucide-react";
import { TransparencyCardProps } from "./transparency-card.properties";

export const TransparencyCardComponent: React.FC<TransparencyCardProps> = ({
  item,
}) => {
  const { title, description } = item;
  return (
    <div className="flex flex-col items-center text-center bg-default-100 rounded-2xl p-6 rounded-tl-[60px] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex w-full justify-between">
        <div className="text-primary mb-3">
          <Search size={40} strokeWidth={1} />
        </div>

        <Title
          text={title}
          className="self-end font-semibold text-[25px] mb-3"
        />
      </div>

      <Text
        text={description}
        className="text-black text-[18px] leading-relaxed text-right"
      />
    </div>
  );
};
