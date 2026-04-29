"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ProjectType,
  getProjectStatusLabel,
  ProjectStatus,
} from "@/domain/Projects";
import { ProjectCardProps } from "./project-card.properties";
import { formatCOP } from "@/lib/format-currency";
import { formatProjectDuration } from "@/lib/format-duration";

const TYPE_IMAGES: Record<ProjectType, string> = {
  [ProjectType.INTERVENTORY]: "/img/project-type/interventory.jpg",
  [ProjectType.CIVIL_WORKS]: "/img/project-type/civil-works.jpg",
  [ProjectType.SUPPLY_PROCESSES]: "/img/project-type/supply-processes.jpg",
  [ProjectType.SERVICE_DELIVERY_PROCESSES]:
    "/img/project-type/service-delivery-processes.jpg",
  [ProjectType.CONSULTING_PROCESSES]:
    "/img/project-type/consulting-processes.jpg",
};

const TYPE_LABEL: Record<ProjectType, string> = {
  [ProjectType.INTERVENTORY]: "INTERVENTORÍA",
  [ProjectType.CIVIL_WORKS]: "OBRA CIVIL",
  [ProjectType.SUPPLY_PROCESSES]: "SUMINISTROS",
  [ProjectType.SERVICE_DELIVERY_PROCESSES]: "PRESTACIÓN DE SERVICIOS",
  [ProjectType.CONSULTING_PROCESSES]: "CONSULTORÍA",
};

const statusBadge = (
  status: ProjectStatus
): { label: string; className: string } => {
  const label = getProjectStatusLabel(status).toUpperCase();
  switch (status) {
    case ProjectStatus.STARTED:
      return { label, className: "bg-blue-100 text-blue-700" };
    case ProjectStatus.IN_PROGRESS:
      return { label: "VIGENTE", className: "bg-emerald-100 text-emerald-700" };
    case ProjectStatus.COMPLETED:
      return { label, className: "bg-gray-200 text-gray-700" };
    case ProjectStatus.CANCELLED:
      return { label, className: "bg-rose-100 text-rose-700" };
  }
};

const formatShortDate = (date: Date): string =>
  date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const ProjectCardComponent: React.FC<ProjectCardProps> = ({ item }) => {
  const router = useRouter();
  const badge = statusBadge(item.status);

  return (
    <div
      onClick={() => router.push(`/calls/${item.id}`)}
      className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-[1.02] cursor-pointer h-full"
    >
      <div className="relative w-full h-[160px]">
        <Image
          src={TYPE_IMAGES[item.type]}
          alt={item.title}
          fill
          className="object-cover"
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <p className="text-[10px] lg:text-[11px] font-bold tracking-wider text-secondary">
          {TYPE_LABEL[item.type]}
        </p>

        <div>
          <h3 className="text-[16px] lg:text-[18px] font-bold text-primary leading-tight">
            {item.title}
          </h3>
          <p className="text-[12px] text-gray-500 mt-0.5">N.° {item.code}</p>
        </div>

        <p className="text-[13px] text-gray-700 line-clamp-2">
          {item.description}
        </p>

        <div className="mt-auto pt-3 border-t border-[#E6ECF7] flex flex-col gap-1.5 text-[13px]">
          <div className="flex justify-between">
            <span className="text-gray-500">Valor</span>
            <span className="font-bold text-primary">
              {formatCOP(item.cost)}
            </span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-gray-500">Plazo</span>
            <span className="font-semibold text-primary text-right text-[12px]">
              {formatProjectDuration(item.date, item.finalDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Vigencia</span>
            <span className="font-semibold text-primary text-right text-[12px]">
              {formatShortDate(item.date)} — {formatShortDate(item.finalDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cliente</span>
            <span
              className="font-semibold text-primary text-right truncate max-w-[60%]"
              title={item.clientEntity}
            >
              {item.clientEntity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
