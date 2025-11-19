import { getProjectTypeLabel, ProjectType } from "@/domain/Projects";
import { Chip } from "@heroui/react";
import { FC } from "react";

interface ProjectTypeChipProps {
    type: ProjectType;
}

const ProjectTypeChip: FC<ProjectTypeChipProps> = ({ type }) => {
    const getStatusColor = (type: ProjectType): "primary" | "default" | "secondary" | "success" | "warning" | "danger" => {
        switch (type) {
            case ProjectType.INTERVENTORY:
                return "primary";
            case ProjectType.CIVIL_WORKS:
                return "warning";
            case ProjectType.SUPPLY_PROCESSES:
                return "success";
            case ProjectType.SERVICE_DELIVERY_PROCESSES:
                return "danger";
            case ProjectType.CONSULTING_PROCESSES:
                return "default";
        }
    }
    const statusColor = getStatusColor(type);
    return (
        <Chip color={statusColor} variant="flat" size="sm">
            {getProjectTypeLabel(type)}
        </Chip>
    );
}

export default ProjectTypeChip;