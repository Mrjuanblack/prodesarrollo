import { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";
import { Button, Chip, Text, Title } from "../..";
import { CheckCircle, Clock, Play, X } from "lucide-react";
import { CallCardProps } from "./call-card.properties";
import { getProjectStatusLabel, ProjectStatus } from "@/domain/Projects";

export const CallCardComponent: FC<CallCardProps> = ({ item }) => {
  const router = useRouter();

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.STARTED:
        return <Play size={18} />;
      case ProjectStatus.COMPLETED:
        return <CheckCircle size={18} />;
      case ProjectStatus.IN_PROGRESS:
        return <Clock size={18} />;
      case ProjectStatus.CANCELLED:
        return <X size={18} />;
    }
  }

  console.log(item);

  return (
    <Card
      shadow="none"
      className="border border-[#D6E0F5] rounded-2xl px-6 py-5 transition-all duration-300 hover:shadow-md"
    >
      <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <Chip
            category={`Estado: ${getProjectStatusLabel(item.status)}`}
            icono={getStatusIcon(item.status)}
            isActive={item.status === ProjectStatus.COMPLETED}
          />

          <Title
            text={item.title}
            className="md:text-[20px] mb-1"
            highlightFirstLetter={false}
          />

          <Text
            text={`Fecha de apertura: ${item.date.toLocaleDateString('es-CO')}`}
            className="md:text-[20px] text-primary mb-3"
          />
          <Text
            text={item.description}
            className="text-primary text-[20px] leading-relaxed"
          />
        </div>

        <div className="flex justify-end md:ml-6">
          <Button
            text="Ver proyecto"
            variant="bordered"
            onClick={() => router.push(`/calls/${item.id}`)}
            className="font-semibold w-fit"
          />
        </div>
      </CardBody>
    </Card>
  );
};
