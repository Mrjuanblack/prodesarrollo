import { FC } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Divider } from "@heroui/react";
import { Button } from "../..";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  PenTool,
  Play,
  Timer,
  X,
} from "lucide-react";
import {
  getProjectStatusLabel,
  getProjectTypeLabel,
  ProjectStatus,
} from "@/domain/Projects";
import { CallCardProps } from "./call-card.properties";
import { formatCOP } from "@/lib/format-currency";
import { formatProjectDuration } from "@/lib/format-duration";

const formatShortDate = (date: Date): string =>
  date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const statusColorClasses = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.STARTED:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case ProjectStatus.IN_PROGRESS:
      return "bg-amber-50 text-amber-700 border-amber-200";
    case ProjectStatus.COMPLETED:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case ProjectStatus.CANCELLED:
      return "bg-rose-50 text-rose-700 border-rose-200";
  }
};

const StatusIcon = ({ status }: { status: ProjectStatus }) => {
  const size = 14;
  switch (status) {
    case ProjectStatus.STARTED:
      return <Play size={size} />;
    case ProjectStatus.COMPLETED:
      return <CheckCircle size={size} />;
    case ProjectStatus.IN_PROGRESS:
      return <Clock size={size} />;
    case ProjectStatus.CANCELLED:
      return <X size={size} />;
  }
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3 text-[14px] lg:text-[15px]">
    <Icon size={18} className="text-primary shrink-0 mt-[2px]" />
    <div className="flex-1 flex flex-wrap justify-between gap-x-4">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-primary text-right">{value}</span>
    </div>
  </div>
);

export const CallCardComponent: FC<CallCardProps> = ({ item }) => {
  const router = useRouter();

  return (
    <Card
      shadow="none"
      className="border border-[#D6E0F5] rounded-2xl px-5 lg:px-7 py-5 lg:py-6 transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/calls/${item.id}`)}
    >
      <CardBody className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-semibold ${statusColorClasses(
                item.status
              )}`}
            >
              <StatusIcon status={item.status} />
              {getProjectStatusLabel(item.status)}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EFF3FD] text-primary text-[11px] font-semibold uppercase tracking-wide">
              {getProjectTypeLabel(item.type)}
            </span>
          </div>

          <div>
            <h3 className="text-[18px] lg:text-[22px] font-bold text-primary leading-tight">
              {item.title}
            </h3>
            <p className="text-[13px] lg:text-[14px] text-gray-500 mt-1">
              N.° {item.code}
            </p>
          </div>

          <p className="text-[14px] lg:text-[16px] text-gray-700 leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="lg:w-[320px] flex flex-col gap-3 lg:border-l lg:border-[#E6ECF7] lg:pl-6">
          <InfoRow
            icon={DollarSign}
            label="Valor"
            value={formatCOP(item.cost)}
          />
          <Divider className="bg-[#E6ECF7]" />
          <InfoRow
            icon={Timer}
            label="Plazo"
            value={formatProjectDuration(item.date, item.finalDate)}
          />
          <Divider className="bg-[#E6ECF7]" />
          <InfoRow
            icon={Calendar}
            label="Vigencia"
            value={`${formatShortDate(item.date)} — ${formatShortDate(item.finalDate)}`}
          />
          <Divider className="bg-[#E6ECF7]" />
          <InfoRow
            icon={Briefcase}
            label="Cliente"
            value={item.clientEntity}
          />
          <Divider className="bg-[#E6ECF7]" />
          <InfoRow
            icon={PenTool}
            label="Firmado"
            value={formatShortDate(item.signatureDate)}
          />

          <div onClick={(e) => e.stopPropagation()}>
            <Button
              variant="bordered"
              text="Ver proyecto"
              onClick={() => router.push(`/calls/${item.id}`)}
              className="font-semibold w-full mt-2"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
