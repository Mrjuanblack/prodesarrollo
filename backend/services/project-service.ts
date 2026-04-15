import {
  Project,
  ProjectType,
  UpdateProject,
  CreateProject,
} from "@/domain/Projects";
import { ProjectRepository } from "../db/repositories/project-repository";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { GoogleStorageManager } from "../google-storage/google-storage-manager";

export class ProjectService {
  public static async createProject(project: CreateProject): Promise<Project> {
    return ProjectRepository.createProject(project);
  }

  public static async getProjectById(id: string): Promise<Project> {
    return ProjectRepository.getProjectById(id);
  }

  public static async getPaginatedProjects(
    pRequest: PaginationRequest,
    search?: string,
    year?: number,
    type?: ProjectType
  ): Promise<PaginationResponse<Project>> {
    return ProjectRepository.getPaginatedProjects(pRequest, search, year, type);
  }

  public static async getYearsWithProjects(): Promise<number[]> {
    return ProjectRepository.getYearsWithProjects();
  }

  public static async getHighlightedProjects(): Promise<Project[]> {
    return ProjectRepository.getHighlightedProjects();
  }

  public static async getDonationProjects(): Promise<Project[]> {
    return ProjectRepository.getDonationProjects();
  }

  public static async updateProject(
    id: string,
    project: UpdateProject
  ): Promise<Project> {
    return await ProjectRepository.updateProject(id, project);
  }

  public static async deleteProject(projectId: string): Promise<void> {
    const project = await ProjectRepository.getProjectById(projectId);
    const photos = project.photos;
    const documents = project.documents;

    const deletePhotoPromises = photos.map((photo) =>
      GoogleStorageManager.deleteFile(photo.url)
    );

    const deleteDocumentPromises = documents.map((document) =>
      GoogleStorageManager.deleteFile(document.url)
    );

    const allDeletePromises = [
      ...deletePhotoPromises,
      ...deleteDocumentPromises,
    ];

    await Promise.all(allDeletePromises);
    await ProjectRepository.deleteProject(project.id);
  }
}
