"use client";

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

interface GenericConfirmActionProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    isLoading?: boolean;
}

const GenericConfirmAction: React.FC<GenericConfirmActionProps> = ({
    isOpen,
    onClose,
    title,
    content,
    onConfirm,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    confirmColor = "primary",
    isLoading = false,
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-2xl font-bold">{title}</h2>
                </ModalHeader>
                <ModalBody>
                    <p>{content}</p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="default"
                        variant="light"
                        onPress={onClose}
                        isDisabled={isLoading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        color={confirmColor}
                        onPress={handleConfirm}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        {confirmLabel}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GenericConfirmAction;

