import { Chip } from "@heroui/react"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"

const ProjectHighlightChip = () => {
    return (
        <Chip color="primary" variant="bordered" size="sm" startContent={<ExclamationCircleIcon className="w-5 h-5" />}>
            Destacado
    </Chip>
  );
};

export default ProjectHighlightChip;