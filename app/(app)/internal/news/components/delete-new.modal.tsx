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
import useNew from "@/hooks/news/useNew";
import { useDeleteNew } from "@/hooks/news/useDeleteNew";

export interface DeleteNewModalProps {
  isOpen: boolean;
  newId: string;
  onClose: () => void;
}

const DeleteNewModal: React.FC<DeleteNewModalProps> = ({
  isOpen,
  newId,
  onClose,
}) => {
  const { data, isLoading } = useNew(newId);
  const deleteNewMutation = useDeleteNew(newId);

  if (isLoading) {
    return <GlobalLoader />;
  }

  if (!data || !isOpen) {
    return null;
  }

  const newName = data.title;
  const photosCount = data.photos.length;

  const onSubmit = () => {
    deleteNewMutation.mutate(undefined, {
      onError: () => {
        addToast({
          color: "danger",
          title: "Error al eliminar la noticia",
          description: "Por favor verifica tus datos.",
        });
      },
      onSuccess: () => {
        onClose();
        addToast({
          color: "success",
          title: "Eliminación exitosa",
          description: "La noticia ha sido eliminada correctamente.",
        });
      },
    });
  };

  const isDeleting = deleteNewMutation.isPending;

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
              ¿Estás seguro que deseas eliminar la noticia:
              <span className="font-bold text-gray-900"> {newName}</span>?
            </p>
            <p className="text-md text-gray-600">
              Esta acción es irreversible. Se eliminarán los siguientes
              recursos:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>
                <span className="font-bold">{photosCount}</span> fotos
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
            Eliminar Noticia
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNewModal;
