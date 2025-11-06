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
      className="border border-[#D6E0F5] rounded-2xl px-6 py-5 transition-all duration-300 hover:shadow-md"
    >
      <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <Chip
            category={`Estado: ${getProjectStatusLabel(status)}`}
            icono={<IconoEstado size={18} />}
            isActive={isFinalizado}
          />

          <Title
            text={title}
            className="md:text-[20px] mb-1"
            highlightFirstLetter={false}
          />

          <Text
            text={`Fecha de apertura: ${formatDate(date)}`}
            className="text-[16px] md:text-[18px] lg:text-[20px] text-primary mb-3"
          />

          <Text
            text={description}
            className="text-primary text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed"
          />
        </div>

        <div className="flex justify-end md:ml-6">
          <Button
            text="Ver proyecto"
            variant="bordered"
            onClick={() => router.push("/calls/1")}
            className="font-semibold w-fit"
          />
        </div>
      </CardBody>
    </Card>
  );
};
