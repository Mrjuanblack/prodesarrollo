import {
  CreateProject,
  ProjectStatus,
  ProjectType,
  projectTypeList,
  projectStatusList,
  getProjectTypeLabel,
  getProjectStatusLabel,
  createProjectFormSchema,
} from "@/domain/Projects";
import {
  Input,
  Modal,
  Select,
  Button,
  Textarea,
  ModalBody,
  SelectItem,
  DatePicker,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@heroui/react";
import { useForm } from "@tanstack/react-form";
import { I18nProvider } from "@react-aria/i18n";
import { useCreateProject } from "@/hooks/project/useCreateProject";
import { getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { ProjectAutocomplete } from "@/ui/organism/ProjectAutocomplete/ProjectAutocomplete";

export interface CreateProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectForm: React.FC<CreateProjectProps> = ({
  isOpen,
  onClose,
}) => {
  const createProjectMutation = useCreateProject();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: ProjectType.INTERVENTORY,
      date: new Date(),
      status: ProjectStatus.STARTED,
      relatedProjects: null,
    } as CreateProject,
    validators: {
      onSubmit: createProjectFormSchema,
      onBlur: createProjectFormSchema,
      onChange: createProjectFormSchema,
    },
    onSubmit: (values) => {
      createProjectMutation.mutate(values.value);
      form.reset();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <h2 className="text-2xl font-bold">Crear proyecto</h2>
        </ModalHeader>

        <ModalBody>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
              <form.Field name="title">
                {(field) => (
                  <Input
                    label="Título"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Ingresa el título del proyecto"
                    value={field.state.value ?? ""}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                    errorMessage={field.state.meta.errors[0]?.message}
                  />
                )}
              </form.Field>
              <form.Field name="description">
                {(field) => (
                  <Textarea
                    label="Descripción"
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Ingresa la descripción del proyecto"
                    value={field.state.value ?? ""}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                    errorMessage={field.state.meta.errors[0]?.message}
                    minRows={2}
                  />
                )}
              </form.Field>
              <form.Field name="type">
                {(field) => (
                  <Select
                    label="Tipo"
                    id="type"
                    name="type"
                    value={field.state.value ?? ""}
                    onChange={(e) => {
                      field.handleChange(e.target.value as ProjectType);
                    }}
                    onBlur={field.handleBlur}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                    errorMessage={field.state.meta.errors[0]?.message}
                    defaultSelectedKeys={[field.state.value ?? ""]}
                    disallowEmptySelection
                  >
                    {projectTypeList.map((type) => (
                      <SelectItem key={type}>
                        {getProjectTypeLabel(type)}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </form.Field>
              <form.Field name="date">
                {(field) => (
                  <I18nProvider locale="es-CO">
                    <DatePicker
                      label="Fecha"
                      id="date"
                      name="date"
                      value={
                        field.state.value
                          ? new CalendarDate(
                              field.state.value.getFullYear(),
                              field.state.value.getMonth() + 1,
                              field.state.value.getDate()
                            )
                          : undefined
                      }
                      onChange={(e) => {
                        field.handleChange(
                          e?.toDate(getLocalTimeZone()) ?? new Date()
                        );
                      }}
                      onBlur={field.handleBlur}
                      isInvalid={
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                      }
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  </I18nProvider>
                )}
              </form.Field>
              <form.Field name="status">
                {(field) => (
                  <Select
                    label="Estado"
                    id="status"
                    name="status"
                    value={field.state.value ?? ""}
                    onChange={(e) => {
                      field.handleChange(e.target.value as ProjectStatus);
                    }}
                    onBlur={field.handleBlur}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                    errorMessage={field.state.meta.errors[0]?.message}
                    defaultSelectedKeys={[field.state.value ?? ""]}
                    disallowEmptySelection
                  >
                    {projectStatusList.map((status) => (
                      <SelectItem key={status}>
                        {getProjectStatusLabel(status)}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </form.Field>
              <form.Field name="relatedProjects">
                {(field) => (
                  <ProjectAutocomplete
                    label="Proyectos relacionados"
                    placeholder="Buscar proyectos..."
                    selectedProjects={field.state.value ?? []}
                    onSelectionChange={(projects) => {
                      field.handleChange(
                        projects.length > 0
                          ? projects.map((project) => project.id)
                          : null
                      );
                    }}
                    isInvalid={
                      field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched
                    }
                    errorMessage={field.state.meta.errors[0]?.message}
                  />
                )}
              </form.Field>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            type="submit"
            isLoading={createProjectMutation.isPending}
            onPress={() => {
              form.handleSubmit();
            }}
            isDisabled={
              createProjectMutation.isPending || form.state.isSubmitting
            }
          >
            Crear proyecto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProjectForm;
