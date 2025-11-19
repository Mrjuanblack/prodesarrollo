import { ConfirmUploadProjectDocument, CreateProjectDocumentFrontendSchema, createProjectDocumentFrontendSchema, CreateProjectDocumentRequest, MakeProjectDocumentPublicRequest } from "@/domain/ProjectDocument";
import { Project } from "@/domain/Projects";
import { useConfirmUpload } from "@/hooks/document/useConfirmUpload";
import { useGetUploadUrl } from "@/hooks/document/useGetUploadUrl";
import { FileUploadButtonComponent } from "@/ui/atoms/FileUploadButton/file-upload-button.component";
import { Container, Section } from "@/ui/molecules";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { getProdOrDevSuffix } from "@/utils/utils";
import { useDeleteDocument } from "@/hooks/document/useDeleteDocument";
import GenericConfirmAction from "./GenericConfirmAction";

interface ManageDocumentsProps {
    project: Project;
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ project }) => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        console.log(progress);
    }, [progress]);

    const getUploadUrlMutation = useGetUploadUrl(project.id);
    const confirmUploadMutation = useConfirmUpload(project.id);
    const deleteDocumentMutation = useDeleteDocument(project.id);

    const formCreateFrontend = useForm({
        defaultValues: {
            name: '',
            file: null,
        } as CreateProjectDocumentFrontendSchema,
        validators: {
            onSubmit: createProjectDocumentFrontendSchema,
            onBlur: createProjectDocumentFrontendSchema,
            onChange: createProjectDocumentFrontendSchema,
        },
        onSubmit: async (values) => {
            // Request the upload session
            const request: CreateProjectDocumentRequest = {
                name: values.value.name,
                fileExtension: values.value.file?.name.split('.').pop() ?? '',
                mimeType: values.value.file?.type ?? '',
            }
            const uploadUrlResponse = await getUploadUrlMutation.mutateAsync(request);

            console.log(uploadUrlResponse.url);

            // Upload directly to Google Drive
            const xhr = new XMLHttpRequest();
            console.log('xhr created');

            xhr.open('PUT', uploadUrlResponse.url, true);
            console.log('xhr opened');
            xhr.setRequestHeader('Content-Type', values.value.file?.type ?? '');
            console.log('xhr setRequestHeader');
            xhr.upload.onprogress = (evt) => {
                if (evt.lengthComputable) {
                    setProgress(Math.round((evt.loaded / evt.total) * 100));
                }
            };
            console.log('xhr onprogress');

            xhr.onload = async () => {
                // Make the file public
                if (xhr.status === 200 || xhr.status === 201) {
                    const makePublicRequest: ConfirmUploadProjectDocument = {
                        name: values.value.name,
                        filePath: uploadUrlResponse.filePath,
                    }
                    const confirmUploadResponse = await confirmUploadMutation.mutateAsync(makePublicRequest);
                    console.log(confirmUploadResponse);

                    formCreateFrontend.reset();
                    setIsCreateOpen(false);
                }
            }

            xhr.send(values.value.file);
        },
    });

    return (<div>
        <Section>
            <Container>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Documentos</h1>
                    <Button color="primary" onPress={() => setIsCreateOpen(true)}>Agregar documento</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableColumn key="name">Nombre</TableColumn>
                        <TableColumn key="createdAt">Fecha de creación</TableColumn>
                        <TableColumn key="actions">Acciones</TableColumn>
                    </TableHeader>
                    <TableBody items={project.documents}>
                        {(item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button isLoading={deleteDocumentMutation.isPending} isDisabled={deleteDocumentMutation.isPending} size="sm" color="primary" isIconOnly onPress={() => window.open(`https://storage.googleapis.com/${process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET_NAME}/${getProdOrDevSuffix()}/${item.url}`, '_blank')}>
                                        <EyeIcon className="w-5 h-5" />
                                    </Button>
                                    <Button className="ml-2" isLoading={deleteDocumentMutation.isPending} isDisabled={deleteDocumentMutation.isPending} size="sm" color="danger" isIconOnly onPress={() => {
                                        setDocumentToDelete(item.id);
                                        setIsDeleteConfirmOpen(true);
                                    }}>
                                        <TrashIcon className="w-5 h-5" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Container>
        </Section>

        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-2xl font-bold">Agregar documento</h2>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        formCreateFrontend.handleSubmit();
                    }}>
                        <div className="flex flex-col gap-4">
                            <formCreateFrontend.Field name="name">
                                {(field) => (
                                    <Input
                                        label="Nombre del documento"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Ingresa el nombre del documento"
                                        value={field.state.value ?? ""}
                                        onChange={(e) => {
                                            field.handleChange(e.target.value);
                                        }}
                                        onBlur={field.handleBlur}
                                        isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                        errorMessage={field.state.meta.errors[0]?.message}
                                    />
                                )}
                            </formCreateFrontend.Field>
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
                                        isInvalid={field.state.meta.errors.length > 0 && field.state.meta.isTouched}
                                        errorMessage={field.state.meta.errors[0]?.message}
                                    />
                                )}
                            </formCreateFrontend.Field>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onPress={() => formCreateFrontend.handleSubmit()} type="submit" color="primary" isLoading={getUploadUrlMutation.isPending || confirmUploadMutation.isPending} isDisabled={getUploadUrlMutation.isPending || confirmUploadMutation.isPending || formCreateFrontend.state.isSubmitting}>Agregar documento</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <GenericConfirmAction
            isOpen={isDeleteConfirmOpen}
            onClose={() => {
                setIsDeleteConfirmOpen(false);
                setDocumentToDelete(null);
            }}
            title="Eliminar documento"
            content="¿Estás seguro de que deseas eliminar este documento? Esta acción no se puede deshacer."
            onConfirm={() => {
                if (documentToDelete) {
                    deleteDocumentMutation.mutate(documentToDelete);
                }
            }}
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            confirmColor="danger"
            isLoading={deleteDocumentMutation.isPending}
        />

    </div>);
}

export default ManageDocuments;