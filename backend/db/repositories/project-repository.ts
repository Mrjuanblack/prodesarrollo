import {
  Project,
  ProjectType,
  SimpleProject,
  UpdateProject,
  CreateProject,
} from "@/domain/Projects";
import { db } from "../config";
import { ProjectPhoto } from "@/domain/ProjectPhoto";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { projects, projectsToProjects } from "../schema";
import { ProjectDocument } from "@/domain/ProjectDocument";
import { count, eq, or, ilike, inArray, and, sql } from "drizzle-orm";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(
  RepositoryErrorOrigin.PROJECTS
);

export class ProjectRepository {
  public static async createProject(project: CreateProject): Promise<Project> {
    try {
      const newProject = await db.insert(projects).values(project).returning();

      // Create related projects
      const finalRelatedProjects: SimpleProject[] = [];

      if (project.relatedProjects && project.relatedProjects.length > 0) {
        await db.insert(projectsToProjects).values(
          project.relatedProjects.map((projectId) => ({
            projectOneId: newProject[0].id,
            projectTwoId: projectId,
          }))
        );

        const relatedProjects = await db.query.projectsToProjects.findMany({
          where: and(
            inArray(projectsToProjects.projectTwoId, project.relatedProjects),
            eq(projectsToProjects.projectOneId, newProject[0].id)
          ),
          with: {
            projectTwo: {
              columns: {
                id: true,
                title: true,
                code: true,
              },
            },
          },
        });
        finalRelatedProjects.push(
          ...relatedProjects.map((relatedProject) => ({
            id: relatedProject.projectTwo.id,
            code: relatedProject.projectTwo.code,
            title: relatedProject.projectTwo.title,
          }))
        );
      }

      return ProjectRepository.mapToDomain({
        ...newProject[0],
        photos: null,
        documents: null,
        relatedProjects:
          finalRelatedProjects.length > 0 ? finalRelatedProjects : null,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  public static async getProjectById(id: string): Promise<Project> {
    try {
      const result = await db.query.projects.findFirst({
        where: eq(projects.id, id),
        with: {
          photos: {
            columns: {
              id: true,
              url: true,
              createdAt: true,
            },
          },
          documents: true,
          relatedProjectsAsOne: {
            columns: {
              projectTwoId: true,
            },
            with: {
              projectTwo: {
                columns: {
                  id: true,
                  title: true,
                  code: true,
                },
              },
            },
          },
          relatedProjectsAsTwo: {
            columns: {
              projectOneId: true,
            },
            with: {
              projectOne: {
                columns: {
                  id: true,
                  title: true,
                  code: true,
                },
              },
            },
          },
        },
      });

      if (!result) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("Project not found")
        );
      }

      // Merge both directions of relationships
      const relatedProjects: SimpleProject[] = [
        ...result.relatedProjectsAsOne.map((rel) => ({
          id: rel.projectTwo.id,
          code: rel.projectTwo.code,
          title: rel.projectTwo.title,
        })),
        ...result.relatedProjectsAsTwo.map((rel) => ({
          id: rel.projectOne.id,
          code: rel.projectOne.code,
          title: rel.projectOne.title,
        })),
      ];

      return ProjectRepository.mapToDomain({
        ...result,
        photos: result.photos
          ? result.photos.map((photo) => ({
              id: photo.id,
              projectId: result.id,
              url: photo.url,
              createdAt: photo.createdAt,
            }))
          : null,
        relatedProjects: relatedProjects.length > 0 ? relatedProjects : null,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getPaginatedProjects(
    pRequest: PaginationRequest,
    search?: string,
    year?: number,
    type?: ProjectType
  ): Promise<PaginationResponse<Project>> {
    try {
      const { page, size } = pRequest;

      // Build where conditions array
      const conditions = [];

      if (search) {
        conditions.push(ilike(projects.title, `%${search}%`));
      }

      if (year !== undefined) {
        conditions.push(sql`EXTRACT(YEAR FROM ${projects.date}) = ${year}`);
      }

      if (type) {
        conditions.push(eq(projects.type, type));
      }

      // Combine all conditions with AND
      const whereCondition =
        conditions.length > 0 ? and(...conditions) : undefined;

      const [result, total] = await Promise.all([
        db.query.projects.findMany({
          limit: size,
          offset: page * size,
          where: whereCondition,
          with: {
            photos: {
              columns: {
                id: true,
                url: true,
                createdAt: true,
              },
            },
            documents: true,
            relatedProjectsAsOne: {
              columns: {
                projectTwoId: true,
              },
              with: {
                projectTwo: {
                  columns: {
                    id: true,
                    title: true,
                    code: true,
                  },
                },
              },
            },
            relatedProjectsAsTwo: {
              columns: {
                projectOneId: true,
              },
              with: {
                projectOne: {
                  columns: {
                    id: true,
                    title: true,
                    code: true,
                  },
                },
              },
            },
          },
        }),
        db.select({ count: count() }).from(projects).where(whereCondition),
      ]);

      return {
        data: result.map((project) => {
          // Merge both directions of relationships
          const relatedProjects = [
            ...project.relatedProjectsAsOne.map((rel) => ({
              id: rel.projectTwo.id,
              code: rel.projectTwo.code,
              title: rel.projectTwo.title,
            })),
            ...project.relatedProjectsAsTwo.map((rel) => ({
              id: rel.projectOne.id,
              code: rel.projectOne.code,
              title: rel.projectOne.title,
            })),
          ];

          return ProjectRepository.mapToDomain({
            ...project,
            photos: project.photos
              ? project.photos.map((photo) => ({
                  id: photo.id,
                  projectId: project.id,
                  url: photo.url,
                  createdAt: photo.createdAt,
                }))
              : null,
            relatedProjects:
              relatedProjects.length > 0 ? relatedProjects : null,
          });
        }),
        page,
        size,
        total: total[0].count,
      };
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getYearsWithProjects(): Promise<number[]> {
    try {
      const result = await db
        .select({
          year: sql<number>`EXTRACT(YEAR FROM ${projects.date})::integer`.as(
            "year"
          ),
        })
        .from(projects)
        .groupBy(sql`EXTRACT(YEAR FROM ${projects.date})`)
        .orderBy(sql`EXTRACT(YEAR FROM ${projects.date}) ASC`);

      // Extract unique years and convert to numbers
      const years = [...new Set(result.map((row) => row.year))];
      return years;
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getHighlightedProjects(): Promise<Project[]> {
    try {
      const result = await db.query.projects.findMany({
        where: eq(projects.highlight, true),
      });
      // No need to fetch extra data for this query
      return result.map((project) =>
        ProjectRepository.mapToDomain({
          ...project,
          photos: null,
          documents: null,
          relatedProjects: null,
        })
      );
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getDonationProjects(): Promise<Project[]> {
    try {
      const result = await db.query.projects.findMany({
        where: eq(projects.donationProject, true),
      });

      return result.map((project) =>
        ProjectRepository.mapToDomain({
          ...project,
          photos: null,
          documents: null,
          relatedProjects: null,
        })
      );
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async updateProject(
    id: string,
    project: UpdateProject
  ): Promise<Project> {
    try {
      const result = await db
        .update(projects)
        .set({
          code: project.code,
          title: project.title,
          description: project.description,
          type: project.type,
          status: project.status,
          date: project.date,
          highlight: project.highlight,
          donationProject: project.donationProject,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id))
        .returning();

      // Fetch documents and photos
      const additionalData = await db.query.projects.findFirst({
        where: eq(projects.id, id),
        with: {
          photos: {
            columns: {
              url: true,
            },
          },
          documents: true,
        },
      });

      if (!additionalData) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("Project not found")
        );
      }

      // Delete all related projects
      await db
        .delete(projectsToProjects)
        .where(
          or(
            eq(projectsToProjects.projectOneId, id),
            eq(projectsToProjects.projectTwoId, id)
          )
        );
      // Create updated related projects
      const finalRelatedProjects: SimpleProject[] = [];
      if (project.relatedProjects && project.relatedProjects.length > 0) {
        await db.insert(projectsToProjects).values(
          project.relatedProjects.map((projectId) => ({
            projectOneId: id,
            projectTwoId: projectId,
          }))
        );

        const relatedProjects = await db.query.projectsToProjects.findMany({
          where: and(
            inArray(projectsToProjects.projectTwoId, project.relatedProjects),
            eq(projectsToProjects.projectOneId, id)
          ),
          with: {
            projectTwo: {
              columns: {
                id: true,
                title: true,
                code: true,
              },
            },
          },
        });
        finalRelatedProjects.push(
          ...relatedProjects.map((relatedProject) => ({
            id: relatedProject.projectTwo.id,
            title: relatedProject.projectTwo.title,
            code: relatedProject.projectTwo.code,
          }))
        );
      }

      return ProjectRepository.mapToDomain({
        ...result[0],
        photos: null,
        documents: null,
        relatedProjects:
          finalRelatedProjects.length > 0 ? finalRelatedProjects : null,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.UPDATE, error);
    }
  }

  public static async deleteProject(id: string): Promise<void> {
    try {
      await db.delete(projects).where(eq(projects.id, id));
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.DELETE, error);
    }
  }

  public static mapToDomain(
    project: typeof projects.$inferSelect & {
      photos: ProjectPhoto[] | null;
      relatedProjects: SimpleProject[] | null;
    } & { documents: ProjectDocument[] | null }
  ): Project {
    return {
      id: project.id,
      code: project.code,
      title: project.title,
      description: project.description,
      type: project.type,
      status: project.status,
      date: project.date,
      photos: project.photos ?? [],
      documents: project.documents ?? [],
      relatedProjects: project.relatedProjects ?? [],
      highlight: project.highlight,
      donationProject: project.donationProject,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
