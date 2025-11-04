import { getProjectStatusLabel, ProjectStatus } from "@/domain/Projects";
import { Chip } from "@heroui/react";
import { FC } from "react";

interface ProjectStatusChipProps {
    status: ProjectStatus;
}

export const ProjectStatusChip: FC<ProjectStatusChipProps> = ({ status }) => {
    const getStatusColor = (status: ProjectStatus): "primary" | "default" | "secondary" | "success" | "warning" | "danger" => {
        switch (status) {
            case ProjectStatus.STARTED:
                return "primary";
            case ProjectStatus.IN_PROGRESS:
                return "warning";
            case ProjectStatus.COMPLETED:
                return "success";
            case ProjectStatus.CANCELLED:
                return "danger";
        }
    }
    const statusColor = getStatusColor(status);
    return (
        <Chip color={statusColor} variant="flat" size="sm">
            {getProjectStatusLabel(status)}
        </Chip>
    );
}