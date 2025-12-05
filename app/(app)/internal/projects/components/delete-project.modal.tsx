import {
  Modal,
  Button,
  addToast,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from "@heroui/react";
import React from "react";
import { GlobalLoader } from "@/ui/atoms";
import useProject from "@/hooks/project/useProject";
import { useDeleteProject } from "@/hooks/project/useDeleteProject";

export interface DeleteProjectModalProps {
  isOpen: boolean;
  projectId: string;
  onClose: () => void;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  projectId,
  onClose,
}) => {
  const { data: project, isLoading } = useProject(projectId);
  const deleteProjectMutation = useDeleteProject(projectId);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (!project) {
    return null;
  }

  const projectName = project.title;
  const photosCount = project.photos.length;
  const documentsCount = project.documents.length;

  const onSubmit = () => {
    deleteProjectMutation.mutate(undefined, {
      onError: () => {
        addToast({
          color: "danger",
          title: "Error al eliminar el proyecto",
          description: "Por favor verifica tus datos.",
        });
      },
      onSuccess: () => {
        addToast({
          color: "success",
          title: "Eliminación exitosa",
          description: "El proyecto ha sido eliminado correctamente.",
        });
      },
    });
  };

  const isDeleting = deleteProjectMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold text-gray-800">
            Confirmar Eliminación
          </h2>
        </ModalHeader>

        <ModalBody>
          <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold text-gray-800">
              ¿Estás seguro que deseas eliminar el proyecto:
              <span className="font-bold text-gray-900"> {projectName}</span>?
            </p>
            <p className="text-md text-gray-600">
              Esta acción es irreversible. Se eliminarán los siguientes
              recursos:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>
                <span className="font-bold">{photosCount}</span> fotos
              </li>
              <li>
                <span className="font-bold">{documentsCount}</span> documentos
              </li>
            </ul>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="secondary"
            variant="light"
            onPress={onClose}
            isDisabled={isDeleting}
          >
            Cancelar
          </Button>

          <Button color="danger" onPress={onSubmit} isLoading={isDeleting}>
            Eliminar Proyecto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteProjectModal;
