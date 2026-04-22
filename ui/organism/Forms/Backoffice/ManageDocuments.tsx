import { ConfirmUploadProjectDocument, CreateProjectDocumentFrontendSchema, createProjectDocumentFrontendSchema, CreateProjectDocumentRequest } from "@/domain/ProjectDocument";
import { Project } from "@/domain/Projects";
import { useConfirmUpload } from "@/hooks/document/useConfirmUpload";
import { useGetUploadUrl } from "@/hooks/document/useGetUploadUrl";
import { FileUploadButtonComponent } from "@/ui/atoms/FileUploadButton/file-upload-button.component";
import { Container, Section } from "@/ui/molecules";
import { addToast, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { buildStorageUrl } from "@/lib/storage-url";
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
    const [isUploading, setIsUploading] = useState(false);

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
            const file = values.value.file;
            if (!file) return;

            setIsUploading(true);
            setProgress(0);

            try {
                const request: CreateProjectDocumentRequest = {
                    name: values.value.name,
                    fileExtension: file.name.split('.').pop() ?? '',
                    mimeType: file.type,
                };
                const uploadUrlResponse = await getUploadUrlMutation.mutateAsync(request);

                await new Promise<void>((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open('PUT', uploadUrlResponse.url, true);
                    xhr.setRequestHeader('Content-Type', file.type);
                    xhr.upload.onprogress = (evt) => {
                        if (evt.lengthComputable) {
                            setProgress(Math.round((evt.loaded / evt.total) * 100));
                        }
                    };
                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve();
                        } else {
                            reject(new Error(`Upload falló con status ${xhr.status}. ${xhr.responseText?.slice(0, 200) ?? ''}`));
                        }
                    };
                    xhr.onerror = () => reject(new Error('Error de red al subir el archivo. Revisa CORS del bucket o la conexión.'));
                    xhr.ontimeout = () => reject(new Error('La subida del archivo tardó demasiado.'));
                    xhr.onabort = () => reject(new Error('Subida cancelada.'));
                    xhr.send(file);
                });

                const confirmRequest: ConfirmUploadProjectDocument = {
                    name: values.value.name,
                    filePath: uploadUrlResponse.filePath,
                };
                await confirmUploadMutation.mutateAsync(confirmRequest);

                addToast({
                    color: 'success',
                    title: 'Documento subido',
                    description: `"${values.value.name}" se agregó al proyecto.`,
                });

                formCreateFrontend.reset();
                setIsCreateOpen(false);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Error desconocido al subir el documento.';
                console.error('[ManageDocuments] upload failed:', error);
                addToast({
                    color: 'danger',
                    title: 'No pudimos subir el documento',
                    description: message,
                });
            } finally {
                setIsUploading(false);
                setProgress(0);
            }
        },
    });

    return (<div>
        <Section>
            <Container>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Documentos</h1>
                    <Button color="primary" onPress={() => setIsCreateOpen(true)}>Agregar documento</Button>
                </div>
                <Table aria-label="Documentos del proyecto">
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
                                    <Button aria-label="Ver documento" isLoading={deleteDocumentMutation.isPending} isDisabled={deleteDocumentMutation.isPending} size="sm" color="primary" isIconOnly onPress={() => window.open(buildStorageUrl(item.url), '_blank')}>
                                        <EyeIcon className="w-5 h-5" />
                                    </Button>
                                    <Button aria-label="Eliminar documento" className="ml-2" isLoading={deleteDocumentMutation.isPending} isDisabled={deleteDocumentMutation.isPending} size="sm" color="danger" isIconOnly onPress={() => {
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
                    {isUploading && progress > 0 && progress < 100 && (
                        <span className="text-sm text-default-500 mr-2">Subiendo… {progress}%</span>
                    )}
                    <Button onPress={() => formCreateFrontend.handleSubmit()} type="submit" color="primary" isLoading={isUploading || getUploadUrlMutation.isPending || confirmUploadMutation.isPending} isDisabled={isUploading || getUploadUrlMutation.isPending || confirmUploadMutation.isPending || formCreateFrontend.state.isSubmitting}>Agregar documento</Button>
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