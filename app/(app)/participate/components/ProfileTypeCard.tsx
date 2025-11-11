import Image from "next/image";
import { Title } from "@/ui/atoms";
import { ProfileTypeItem } from "../page.properties";

interface ProfileTypeCardProps {
  active?: boolean;
  item: ProfileTypeItem;
  onClick?: (id: number) => void;
}

export const ProfileTypeCard: React.FC<ProfileTypeCardProps> = ({
  item,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick?.(item.id)}
      className={`bg-default-100 p-3 lg:p-5 flex flex-col items-center rounded-2xl shadow-sm border overflow-hidden 
      w-[50%] max-w-[394px] h-[247px] md:h-[374px] lg:h-[474px] transition-all duration-300 cursor-pointer 
      hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/30
      ${active ? "bg-default-200 border-primary" : "border-gray-200"}`}
    >
      <Title text={item.title} />

      <div className="w-full h-[190px] md:h-[290px] lg:h-[360px] relative mt-3 lg:mt-5">
        <Image fill src={item.img} alt={item.title} className="object-cover" />
      </div>
    </button>
  );
};
