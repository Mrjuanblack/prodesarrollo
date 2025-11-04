import { Project } from "@/domain/Projects";

interface ManageDocumentsProps {
    project: Project;
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ project }) => {
    return (
        <div>
            <h1>Manage Documents</h1>
        </div>
    );
}