import {
  CreateProject,
  Project,
  ProjectType,
  UpdateProject,
} from "@/domain/Projects";
import { ProjectRepository } from "../db/repositories/project-repository";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";

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
}
