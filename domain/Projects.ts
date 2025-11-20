import { z } from "zod/v4";
import { ProjectDocument } from "./ProjectDocument";
import { ProjectPhoto } from "./ProjectPhoto";

export enum ProjectStatus {
  STARTED = "started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export const projectStatusList = Object.values(ProjectStatus);

export const getProjectStatusLabel = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.STARTED:
      return "Iniciado";
    case ProjectStatus.IN_PROGRESS:
      return "En progreso";
    case ProjectStatus.COMPLETED:
      return "Completado";
    case ProjectStatus.CANCELLED:
      return "Cancelado";
  }
};

export enum ProjectType {
  INTERVENTORY = "interventory",
  CIVIL_WORKS = "civil_works",
  SUPPLY_PROCESSES = "supply_processes",
  SERVICE_DELIVERY_PROCESSES = "service_delivery_processes",
  CONSULTING_PROCESSES = "consulting_processes",
}

export const projectTypeList = Object.values(ProjectType);

export const getProjectTypeLabel = (type: ProjectType): string => {
  switch (type) {
    case ProjectType.INTERVENTORY:
      return "Interventorías";
    case ProjectType.CIVIL_WORKS:
      return "Obras";
    case ProjectType.SUPPLY_PROCESSES:
      return "Procesos de suministros";
    case ProjectType.SERVICE_DELIVERY_PROCESSES:
      return "Procesos de presentación de servicios";
    case ProjectType.CONSULTING_PROCESSES:
      return "Procesos de consultoría";
  }
};

// Frontend schema - validates form input (Date objects)
export const createProjectFormSchema = z.object({
  title: z
    .string({ message: "El título debe ser textual" })
    .min(1, "El título es requerido"),
  description: z
    .string({ message: "La descripción debe ser textual" })
    .min(1, "La descripción es requerida"),
  type: z.enum(ProjectType, { message: "El tipo debe ser un tipo válido" }),
  status: z.enum(ProjectStatus, {
    message: "El estado debe ser un estado válido",
  }),
  date: z.date({ message: "La fecha debe ser una fecha válida" }),
  relatedProjects: z
    .array(z.string({ message: "El proyecto relacionado debe ser textual" }))
    .nullable(),
});

// Backend schema - validates API input (coerces strings to dates)
export const createProjectSchema = z.object({
  title: z
    .string({ message: "El título debe ser textual" })
    .min(1, "El título es requerido"),
  description: z
    .string({ message: "La descripción debe ser textual" })
    .min(1, "La descripción es requerida"),
  type: z.enum(ProjectType, { message: "El tipo debe ser un tipo válido" }),
  status: z.enum(ProjectStatus, {
    message: "El estado debe ser un estado válido",
  }),
  date: z.coerce.date({ message: "La fecha debe ser una fecha válida" }),
  relatedProjects: z
    .array(z.string({ message: "El proyecto relacionado debe ser textual" }))
    .nullable(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;
export type CreateProjectForm = z.infer<typeof createProjectFormSchema>;

export const updateProjectFormSchema = z.object({
  title: z
    .string({ message: "El título debe ser textual" })
    .min(1, "El título es requerido"),
  description: z
    .string({ message: "La descripción debe ser textual" })
    .min(1, "La descripción es requerida"),
  type: z.enum(ProjectType, { message: "El tipo debe ser un tipo válido" }),
  status: z.enum(ProjectStatus, {
    message: "El estado debe ser un estado válido",
  }),
  date: z.date({ message: "La fecha debe ser una fecha válida" }),
  relatedProjects: z
    .array(z.string({ message: "El proyecto relacionado debe ser textual" }))
    .nullable(),
});

export const updateProjectSchema = z.object({
  title: z
    .string("El título debe ser textual")
    .min(1, "El título es requerido"),
  description: z
    .string("La descripción debe ser textual")
    .min(1, "La descripción es requerida"),
  type: z.enum(ProjectType, { message: "El tipo debe ser un tipo válido" }),
  status: z.enum(ProjectStatus, "El estado debe ser un estado válido"),
  date: z.coerce.date("La fecha debe ser una fecha válida"),
  relatedProjects: z
    .array(z.string("El proyecto relacionado debe ser textual"))
    .nullable(),
});

export type UpdateProject = z.infer<typeof updateProjectSchema>;

export interface SimpleProject {
  id: string;
  title: string;
}

export interface Project extends Omit<CreateProject, "relatedProjects"> {
  id: string;
  photos: ProjectPhoto[];
  documents: ProjectDocument[];
  createdAt: Date;
  updatedAt: Date;
  relatedProjects: SimpleProject[];
}
