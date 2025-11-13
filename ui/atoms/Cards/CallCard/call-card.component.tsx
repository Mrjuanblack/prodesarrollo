import { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";
import { Button, Chip, Text, Title } from "../..";
import { CheckCircle, Clock } from "lucide-react";
import { getProjectStatusLabel, ProjectStatus } from "@/domain/Projects";
import { formatDate } from "@/utils/date.utilities";
import { CallCardProps } from "./call-card.properties";

export const CallCardComponent: FC<CallCardProps> = ({ item }) => {
  const router = useRouter();

  const { status, date, title, description } = item;

  const isFinalizado = status === ProjectStatus.COMPLETED;

  const IconoEstado = isFinalizado ? CheckCircle : Clock;

  return (
    <Card
      shadow="none"
      className="border border-[#D6E0F5] rounded-2xl px-4 lg:px-6 py-3 lg:py-5 transition-all duration-300 hover:shadow-md"
    >
      <CardBody className="flex flex-col md:flex-row md:items-center justify-between lg:gap-4">
        <div className="flex-1">
          <Chip
            category={`Estado: ${getProjectStatusLabel(status)}`}
            icono={<IconoEstado size={18} />}
            isActive={isFinalizado}
          />

          <Title
            text={title}
            highlightFirstLetter={false}
            className="text-[15px] md:text-[18px] lg:text-[20px]"
          />

          <Text
            text={`Fecha de apertura: ${formatDate(date)}`}
            className="text-[15px] md:text-[18px] lg:text-[20px] text-primary mb-2 lg:mb-3"
          />

          <Text
            text={description}
            className="text-primary text-[14px] md:text-[17px] lg:text-[19px] leading-relaxed"
          />
        </div>

        <div className="flex justify-end md:ml-6">
          <Button
            variant="bordered"
            text="Ver proyecto"
            className="font-semibold w-fit"
            onClick={() => router.push("/calls/1")}
          />
        </div>
      </CardBody>
    </Card>
  );
};
