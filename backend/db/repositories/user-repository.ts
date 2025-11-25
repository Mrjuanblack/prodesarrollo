import { db } from "../config";
import { users } from "../schema";
import { count, eq } from "drizzle-orm";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { CreateUser, UpdateUser, User } from "@/domain/user";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.USERS);

export class UserRepository {
  public static async createUser(user: CreateUser): Promise<User> {
    try {
      const newUser = await db.insert(users).values(user).returning();

      return UserRepository.mapToDomain({
        ...newUser[0],
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  public static async getUserById(id: string): Promise<User> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      if (!result) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("User not found")
        );
      }

      return UserRepository.mapToDomain({
        ...result,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getPaginatedUsers(
    pRequest: PaginationRequest
  ): Promise<PaginationResponse<User>> {
    try {
      const { page, size } = pRequest;

      const [result, total] = await Promise.all([
        db.query.users.findMany({
          limit: size,
          offset: page * size,
        }),
        db.select({ count: count() }).from(users),
      ]);

      return {
        data: result.map((user) => {
          return UserRepository.mapToDomain({
            ...user,
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

  public static async updateUser(id: string, user: UpdateUser): Promise<User> {
    try {
      const result = await db
        .update(users)
        .set({
          email: user.email,
          username: user.username,
          password: user.password,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))
        .returning();

      const additionalData = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      if (!additionalData) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("User not found")
        );
      }

      return UserRepository.mapToDomain({
        ...result[0],
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.UPDATE, error);
    }
  }

  public static mapToDomain(user: typeof users.$inferSelect): User {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
