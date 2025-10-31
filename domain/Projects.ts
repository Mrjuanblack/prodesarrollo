import { z } from 'zod/v4'
;
export enum ProjectStatus {
    STARTED = 'started',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export const projectStatusList = Object.values(ProjectStatus);
export const getProjectStatusLabel = (status: ProjectStatus): string => {
    switch (status) {
        case ProjectStatus.STARTED:
            return 'Iniciado';
        case ProjectStatus.IN_PROGRESS:
            return 'En progreso';
        case ProjectStatus.COMPLETED:
            return 'Completado';
        case ProjectStatus.CANCELLED:
            return 'Cancelado';
    }
}

export const createProjectSchema = z.object({
    title: z.string("El título debe ser textual").min(1, 'El título es requerido'),
    description: z.string("La descripción debe ser textual").min(1, 'La descripción es requerida'),
    status: z.enum(ProjectStatus, "El estado debe ser un estado válido"),
    date: z.string("La fecha debe ser textual").pipe(z.coerce.date("La fecha debe ser una fecha válida")),
    relatedProjects: z.array(z.string("El proyecto relacionado debe ser textual").min(1, 'El proyecto relacionado es requerido')).min(1, 'Al menos un proyecto relacionado es requerido').nullable(),
});

export type CreateProject = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = z.object({
    title: z.string("El título debe ser textual").min(1, 'El título es requerido'),
    description: z.string("La descripción debe ser textual").min(1, 'La descripción es requerida'),
    status: z.enum(ProjectStatus, "El estado debe ser un estado válido"),
    date: z.string("La fecha debe ser textual").pipe(z.coerce.date("La fecha debe ser una fecha válida")),
    relatedProjects: z.array(z.string("El proyecto relacionado debe ser textual").min(1, 'El proyecto relacionado es requerido')).min(1, 'Al menos un proyecto relacionado es requerido').nullable(),
});

export type UpdateProject = z.infer<typeof updateProjectSchema>;

export interface Project extends CreateProject {
    id: string;
    photosUrls: string[];
    createdAt: Date;
    updatedAt: Date;
}