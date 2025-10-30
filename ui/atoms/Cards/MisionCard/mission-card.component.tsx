import { FC } from "react";
import { Facebook } from "lucide-react";
import { IconTitle } from "@/ui/molecules";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { MissionCardProps } from "./mission-card.properties";

export const MissionCardComponent: FC<MissionCardProps> = ({
  title,
  missionText,
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
        <IconTitle title={title} Icon={Facebook} classNameTitle="text-white" />
      </CardHeader>

      <CardBody className="pt-2">
        <div className="text-white text-[20px] leading-relaxed">
          {missionText}
        </div>
      </CardBody>
    </Card>
  );
};
