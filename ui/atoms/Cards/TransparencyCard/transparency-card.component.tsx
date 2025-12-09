import { Text, Title } from "../..";
import { TransparencyCardProps } from "./transparency-card.properties";

export const TransparencyCardComponent: React.FC<TransparencyCardProps> = ({
  item,
}) => {
  const { title, description, Icon } = item;
  return (
    <div className="h-full flex flex-col items-center text-center bg-default-100 rounded-2xl p-4 md:p-6 lg:p-8 rounded-tl-[40px] lg:rounded-tl-[60px] shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex w-full justify-between gap-4 mb-3">
        <div className="text-primary">
          {Icon && (
            <Icon className="h-10 w-10 lg:h-16 lg:w-16" strokeWidth={1} />
          )}
        </div>

        <Title
          text={title}
          className="leading-tight text-right self-end font-semibold text-[15px] md:text-[20px] lg:text-[25px]"
        />
      </div>

      <Text
        text={description}
        className="text-black text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed text-right"
      />
    </div>
  );
};
