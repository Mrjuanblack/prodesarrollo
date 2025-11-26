import argon2 from "argon2";
import { db } from "../config";
import { users } from "../schema";
import { count, eq } from "drizzle-orm";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { CreateUser, PrivateUser, UpdateUser, User } from "@/domain/user";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.USERS);

export class UserRepository {
  private static async hashPassword(password: string) {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
  }

  public static async createUser(user: CreateUser): Promise<User> {
    try {
      const passwordHash = await this.hashPassword(user.password);

      const newUser = await db
        .insert(users)
        .values({
          username: user.username,
          email: user.email,
          password: passwordHash,
        })
        .returning();

      return this.mapToDomain({
        ...newUser[0],
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  public static async updateUser(id: string, user: UpdateUser): Promise<User> {
    try {
      const updateData: UpdateUser = {
        email: user.email,
        username: user.username,
        updatedAt: new Date(),
      };

      if (user.password && user.password.length > 0) {
        updateData.password = await this.hashPassword(user.password);
      }

      const result = await db
        .update(users)
        .set(updateData)
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

      return this.mapToDomain({ ...result[0] });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.UPDATE, error);
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

      return this.mapToDomain({
        ...result,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!result) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("User not found")
        );
      }

      return this.mapToDomain({
        ...result,
      });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.GET, error);
    }
  }

  public static async getUserPassWord(email: string): Promise<PrivateUser> {
    try {
      const result = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!result) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("User not found")
        );
      }

      return this.mapToDomainPrivate({
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
          return this.mapToDomain({
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

  public static mapToDomain(user: typeof users.$inferSelect): User {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  public static mapToDomainPrivate(
    user: typeof users.$inferSelect
  ): PrivateUser {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
