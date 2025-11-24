import { db } from "../config";
import { CreateUser, User } from "@/domain/user";
import { ProjectPhoto } from "@/domain/ProjectPhoto";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { users, projectsToProjects } from "../schema";
import { ProjectDocument } from "@/domain/ProjectDocument";
import { count, eq, or, ilike, inArray, and, sql } from "drizzle-orm";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.USERS);

export class UserRepository {
  public static async createUser(user: CreateUser): Promise<User> {
    try {
      const newUser = await db.insert(users).values(user).returning();

      const finalRelatedProjects: SimpleProject[] = [];
      if (user.relatedProjects && user.relatedProjects.length > 0) {
        await db.insert(projectsToProjects).values(
          user.relatedProjects.map((projectId) => ({
            projectOneId: newUser[0].id,
            projectTwoId: projectId,
          }))
        );

        const relatedProjects = await db.query.projectsToProjects.findMany({
          where: and(
            inArray(projectsToProjects.projectTwoId, user.relatedProjects),
            eq(projectsToProjects.projectOneId, newUser[0].id)
          ),
          with: {
            projectTwo: {
              columns: {
                id: true,
                title: true,
              },
            },
          },
        });
        finalRelatedProjects.push(
          ...relatedProjects.map((relatedProject) => ({
            id: relatedProject.projectTwo.id,
            title: relatedProject.projectTwo.title,
          }))
        );
      }

      return UserRepository.mapToDomain({
        ...newUser[0],
        photos: null,
        documents: null,
        relatedProjects:
          finalRelatedProjects.length > 0 ? finalRelatedProjects : null,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  public static async getUserById(id: string): Promise<Project> {
    try {
      const result = await db.query.projects.findFirst({
        where: eq(users.id, id),
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
          title: rel.projectTwo.title,
        })),
        ...result.relatedProjectsAsTwo.map((rel) => ({
          id: rel.projectOne.id,
          title: rel.projectOne.title,
        })),
      ];

      return UserRepository.mapToDomain({
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

  public static async getPaginatedUsers(
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
        conditions.push(ilike(users.title, `%${search}%`));
      }

      if (year !== undefined) {
        conditions.push(sql`EXTRACT(YEAR FROM ${users.date}) = ${year}`);
      }

      if (type) {
        conditions.push(eq(users.type, type));
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
                  },
                },
              },
            },
          },
        }),
        db.select({ count: count() }).from(users).where(whereCondition),
      ]);

      return {
        data: result.map((project) => {
          // Merge both directions of relationships
          const relatedProjects = [
            ...project.relatedProjectsAsOne.map((rel) => ({
              id: rel.projectTwo.id,
              title: rel.projectTwo.title,
            })),
            ...project.relatedProjectsAsTwo.map((rel) => ({
              id: rel.projectOne.id,
              title: rel.projectOne.title,
            })),
          ];

          return UserRepository.mapToDomain({
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

  public static async getYearsWithUsers(): Promise<number[]> {
    try {
      const result = await db
        .select({
          year: sql<number>`EXTRACT(YEAR FROM ${users.date})::integer`.as(
            "year"
          ),
        })
        .from(users)
        .groupBy(sql`EXTRACT(YEAR FROM ${users.date})`)
        .orderBy(sql`EXTRACT(YEAR FROM ${users.date}) ASC`);

      // Extract unique years and convert to numbers
      const years = [...new Set(result.map((row) => row.year))];
      return years;
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async updateUser(
    id: string,
    project: UpdateProject
  ): Promise<Project> {
    try {
      const result = await db
        .update(users)
        .set({
          title: project.title,
          description: project.description,
          status: project.status,
          date: project.date,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      // Fetch documents and photos
      const additionalData = await db.query.projects.findFirst({
        where: eq(users.id, id),
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
              },
            },
          },
        });
        finalRelatedProjects.push(
          ...relatedProjects.map((relatedProject) => ({
            id: relatedProject.projectTwo.id,
            title: relatedProject.projectTwo.title,
          }))
        );
      }

      return UserRepository.mapToDomain({
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

  public static mapToDomain(
    project: typeof users.$inferSelect & {
      photos: ProjectPhoto[] | null;
      relatedProjects: SimpleProject[] | null;
    } & { documents: ProjectDocument[] | null }
  ): Project {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      type: project.type,
      status: project.status,
      date: project.date,
      photos: project.photos ?? [],
      documents: project.documents ?? [],
      relatedProjects: project.relatedProjects ?? [],
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
