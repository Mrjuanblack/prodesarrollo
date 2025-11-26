import { Chip } from "@heroui/react"
import { GiftIcon } from "@heroicons/react/24/outline"

const ProjectDonationChip = () => {
    return (
        <Chip color="success" variant="bordered" size="sm" startContent={<GiftIcon className="w-5 h-5" />}>
            Donación
        </Chip>
    )
}

export default ProjectDonationChip;