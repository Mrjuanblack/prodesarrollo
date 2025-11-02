import Image from "next/image";
import { ProfileTypeItem } from "../page.properties";
import { Title } from "@/ui/atoms";

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
      className={`bg-default-100 p-5 flex flex-col items-center rounded-2xl shadow-sm border overflow-hidden 
      w-[200px] md:w-[394px] h-[474px] transition-all duration-300 cursor-pointer 
      hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/30
      ${active ? "bg-default-200 border-primary" : "border-gray-200"}`}
    >
      <Title text={item.title} />

      <div className="w-full h-[360px] relative mt-5">
        <Image fill src={item.img} alt={item.title} className="object-cover" />
      </div>
    </button>
  );
};
