"use client";

import {
  ProjectType,
  UpdateProject,
  ProjectStatus,
  projectTypeList,
  projectStatusList,
  getProjectTypeLabel,
  getProjectStatusLabel,
  updateProjectFormSchema,
} from "@/domain/Projects";
import {
  Input,
  Button,
  Select,
  Textarea,
  DatePicker,
  SelectItem,
} from "@heroui/react";
import { GlobalLoader } from "@/ui/atoms";
import { useParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { I18nProvider } from "@react-aria/i18n";
import { Container, Section } from "@/ui/molecules";
import useProject from "@/hooks/project/useProject";
import { useUpdateProject } from "@/hooks/project/useUpdateProject";
import ManagePhotos from "@/ui/organism/Forms/Backoffice/ManagePhotos";
import { getLocalTimeZone, CalendarDate } from "@internationalized/date";
import ManageDocuments from "@/ui/organism/Forms/Backoffice/ManageDocuments";
import { ProjectAutocomplete } from "@/ui/organism/ProjectAutocomplete/ProjectAutocomplete";

export default function ProjectPage() {
  const { id } = useParams();
  const { data: project } = useProject(id as string);

  const updateProjectMutation = useUpdateProject({
    id: id as string,
    project: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      type: project?.type ?? ProjectType.INTERVENTORY,
      status: project?.status ?? ProjectStatus.STARTED,
      date: project?.date ?? new Date(),
      relatedProjects:
        project?.relatedProjects?.map((project) => project.id) ?? null,
    } satisfies UpdateProject,
  });

  const form = useForm({
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      status: project?.status ?? ProjectStatus.STARTED,
      type: project?.type ?? ProjectType.INTERVENTORY,
      date: project?.date ?? new Date(),
      relatedProjects:
        project?.relatedProjects?.map((project) => project.id) ?? null,
    } satisfies UpdateProject,
    validators: {
      onSubmit: updateProjectFormSchema,
      onBlur: updateProjectFormSchema,
      onChange: updateProjectFormSchema,
    },
    onSubmit: (values) => {
      updateProjectMutation.mutate({
        id: id as string,
        project: values.value,
      });
    },
  });

  if (!project) {
    return <GlobalLoader />;
  }

  return (
    <div>
      <Section>
        <Container>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <h2 className="text-sm text-gray-500 mb-4">{project.id}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
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
              </div>
              <div className="col-span-2">
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
              </div>
              <div className="col-span-2">
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
              </div>
              <div className="col-span-2">
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
                            : null
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
              </div>
              <div className="col-span-2">
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
              </div>
              <div className="col-span-2">
                <form.Field name="relatedProjects">
                  {(field) => (
                    <ProjectAutocomplete
                      label="Proyectos relacionados"
                      placeholder="Buscar proyectos..."
                      selectedProjects={field.state.value ?? []}
                      initialProjects={project.relatedProjects}
                      onSelectionChange={(projects) => {
                        field.handleChange(
                          projects.length > 0
                            ? projects.map((project) => project.id)
                            : null
                        );
                      }}
                      editedProjectId={project.id}
                      isInvalid={
                        field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched
                      }
                      errorMessage={field.state.meta.errors[0]?.message}
                    />
                  )}
                </form.Field>
              </div>
              <div className="col-span-2">
                <Button
                  color="primary"
                  type="submit"
                  isLoading={updateProjectMutation.isPending}
                  isDisabled={
                    updateProjectMutation.isPending || form.state.isSubmitting
                  }
                >
                  Guardar
                </Button>
              </div>
            </div>
          </form>
        </Container>
      </Section>
      <ManageDocuments project={project} />
      <ManagePhotos project={project} />
    </div>
  );
}
