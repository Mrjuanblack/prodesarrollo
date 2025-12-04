import { FC } from "react";
import { IconTitle } from "@/ui/molecules";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { MissionCardProps } from "./mission-card.properties";

export const MissionCardComponent: FC<MissionCardProps> = ({
  title,
  missionText,
  Icon,
  isRoundedLeft = false,
}) => {
  return (
    <Card
      className={`w-full p-4 bg-primary shadow-xl rounded-2xl ${
        isRoundedLeft ? "rounded-tl-[50px]" : "rounded-br-[50px]"
      }`}
      radius="lg"
    >
      <CardHeader className="flex items-center">
        <IconTitle
          Icon={Icon}
          title={title}
          iconColor="text-secondary-200"
          iconBgColor="bg-secondary-400"
          classNameTitle="text-white text-[15px] md:text-[20px] lg:text-[30px]"
        />
      </CardHeader>

      <CardBody className="pt-2">
        <div className="text-white text-[13px] md:text-[15px] lg:text-[20px] leading-relaxed">
          {missionText}
        </div>
      </CardBody>
    </Card>
  );
};
