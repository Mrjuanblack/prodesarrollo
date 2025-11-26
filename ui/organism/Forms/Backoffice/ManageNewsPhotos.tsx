"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import {
  createNewsPhotoFrontendSchema,
  CreateNewsPhotoFrontendSchema,
} from "@/domain/NewsPhoto";
import { useState } from "react";
import { News } from "@/domain/News";
import { useForm } from "@tanstack/react-form";
import { getProdOrDevSuffix } from "@/utils/utils";
import { Container, Section } from "@/ui/molecules";
import GenericConfirmAction from "./GenericConfirmAction";
import { useCreateNewsPhoto } from "@/hooks/newsPhoto/useCreateNewsPhoto";
import { useDeleteNewsPhoto } from "@/hooks/newsPhoto/useDeleteNewsPhoto";
import { FileUploadButtonComponent } from "@/ui/atoms/FileUploadButton/file-upload-button.component";

interface ManageNewsPhotosProps {
  news: News;
}

const ManageNewsPhotos: React.FC<ManageNewsPhotosProps> = ({ news }) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const createNewsPhotoMutation = useCreateNewsPhoto(news.id);
  const deleteNewsPhotoMutation = useDeleteNewsPhoto(news.id);

  const formCreateFrontend = useForm({
    defaultValues: {
      file: null,
    } as CreateNewsPhotoFrontendSchema,
    validators: {
      onSubmit: createNewsPhotoFrontendSchema,
      onBlur: createNewsPhotoFrontendSchema,
      onChange: createNewsPhotoFrontendSchema,
    },
    onSubmit: ({ value }) => {
      createNewsPhotoMutation.mutate(value.file as File);
      formCreateFrontend.reset();
      setIsCreateOpen(false);
    },
  });

  return (
    <div>
      <Section>
        <Container>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Fotos</h1>
            <Button color="primary" onPress={() => setIsCreateOpen(true)}>
              Agregar foto
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.photos.map((photo) => (
              <div
                key={photo.id}
                className="relative rounded-lg overflow-hidden"
              >
                <img
                  src={`https://storage.googleapis.com/${
                    process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME
                  }/${getProdOrDevSuffix()}/${photo.url}`}
                  alt={photo.url}
                />
                <Button
                  className="absolute top-2 right-2"
                  color="danger"
                  onPress={() => {
                    setPhotoToDelete(photo.id);
                    setIsDeleteConfirmOpen(true);
                  }}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <ModalContent>
          <ModalHeader>
            <h2 className="text-2xl font-bold">Agregar foto</h2>
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                formCreateFrontend.handleSubmit();
              }}
            >
              <div className="flex flex-col gap-4">
                <formCreateFrontend.Field name="file">
                  {(field) => (
                    <FileUploadButtonComponent
                      label="Archivo"
                      value={field.state.value ?? null}
                      onChange={(file) => {
                        field.handleChange(file);
                      }}
                      multiple={false}
                      onBlur={field.handleBlur}
                      isInvalid={
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                      }
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </formCreateFrontend.Field>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => formCreateFrontend.handleSubmit()}
              type="submit"
              color="primary"
              isLoading={createNewsPhotoMutation.isPending}
              isDisabled={
                createNewsPhotoMutation.isPending ||
                formCreateFrontend.state.isSubmitting
              }
            >
              Agregar foto
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <GenericConfirmAction
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setPhotoToDelete(null);
        }}
        title="Eliminar foto"
        content="¿Estás seguro de que deseas eliminar esta foto? Esta acción no se puede deshacer."
        onConfirm={() => {
          if (photoToDelete) {
            deleteNewsPhotoMutation.mutate(photoToDelete);
          }
        }}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmColor="danger"
        isLoading={deleteNewsPhotoMutation.isPending}
      />
    </div>
  );
};

export default ManageNewsPhotos;

