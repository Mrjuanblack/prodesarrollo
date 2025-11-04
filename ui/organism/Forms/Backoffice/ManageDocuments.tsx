import { CreateProjectDocumentFrontendSchema, createProjectDocumentFrontendSchema, CreateProjectDocumentRequest, MakeProjectDocumentPublicRequest } from "@/domain/ProjectDocument";
import { Project } from "@/domain/Projects";
import { useGetUploadSession } from "@/hooks/document/useGetUploadSession";
import { useMakePublic } from "@/hooks/document/useMakePublic";
import { FileUploadButtonComponent } from "@/ui/atoms/FileUploadButton/file-upload-button.component";
import { Container, Section } from "@/ui/molecules";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";

interface ManageDocumentsProps {
    project: Project;
}

const ManageDocuments: React.FC<ManageDocumentsProps> = ({ project }) => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [progress, setProgress] = useState(0);

    const getUploadSessionMutation = useGetUploadSession(project.id);
    const makePublicMutation = useMakePublic(project.id);

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
            const uploadSessionResponse = await getUploadSessionMutation.mutateAsync(request);

            // Upload directly to Google Drive
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', uploadSessionResponse.url, true);
            xhr.setRequestHeader('Content-Type', values.value.file?.type ?? '');
            xhr.upload.onprogress = (evt) => {
                if (evt.lengthComputable) {
                    setProgress(Math.round((evt.loaded / evt.total) * 100));
                }
            };

            xhr.onload = async () => {
                // Make the file public
                if (xhr.status === 200 || xhr.status === 201) {
                    const { id: fileId } = JSON.parse(xhr.response);

                    const makePublicRequest: MakeProjectDocumentPublicRequest = {
                        name: values.value.name,
                        fileId: fileId,
                    }
                    const makePublicResponse = await makePublicMutation.mutateAsync(makePublicRequest);
                    console.log(makePublicResponse);
                }
            }
        },
    });

    return (<div>
        <Section>
            <Container>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Proyectos</h1>
                    <Button color="primary" onPress={() => setIsCreateOpen(true)}>Agregar proyecto</Button>
                </div>
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
            </ModalContent>
        </Modal>

    </div>);
}