import { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/react";
import { Button, Chip, Text, Title } from "../..";
import { CheckCircle, Clock } from "lucide-react";
import { CallCardProps } from "./call-card.properties";

export const CallCardComponent: FC<CallCardProps> = ({ item }) => {
  const router = useRouter();

  const { estado, fechaApertura, titulo, descripcion, onViewProject } = item;
  const isFinalizado = estado === "Finalizado";

  const IconoEstado = isFinalizado ? CheckCircle : Clock;

  return (
    <Card
      shadow="none"
      className="border border-[#D6E0F5] rounded-2xl px-6 py-5 transition-all duration-300 hover:shadow-md"
    >
      <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <Chip
            category={`Estado: ${estado}`}
            icono={<IconoEstado size={18} />}
            isActive={isFinalizado}
          />

          <Title
            text={titulo}
            className="md:text-[20px] mb-1"
            highlightFirstLetter={false}
          />

          <Text
            text={`Fecha de apertura: ${fechaApertura}`}
            className="md:text-[20px] text-primary mb-3"
          />
          <Text
            text={descripcion}
            className="text-primary text-[20px] leading-relaxed"
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
