"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

interface DeleteSlideModalProps {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteSlideModal: React.FC<DeleteSlideModalProps> = ({
  isOpen,
  isPending,
  onClose,
  onConfirm,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalContent>
      <ModalHeader>
        <h2 className="text-2xl font-bold">Eliminar slide</h2>
      </ModalHeader>
      <ModalBody>
        <p>
          ¿Estás seguro de que deseas eliminar este slide del carrusel? Esta
          acción borra también la imagen asociada y no se puede deshacer.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button variant="light" onPress={onClose}>
          Cancelar
        </Button>
        <Button
          color="danger"
          isLoading={isPending}
          isDisabled={isPending}
          onPress={onConfirm}
        >
          Eliminar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default DeleteSlideModal;
