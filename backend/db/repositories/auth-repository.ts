import argon2 from "argon2";
import { db } from "../config";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { LoginFormType, LoginResponse } from "@/domain/auth";
import { generateToken } from "@/backend/utilities/auth/jwt";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.AUTH);

export class AuthRepository {
  private static async verifyPassword(hash: string, plain: string) {
    return argon2.verify(hash, plain);
  }

  public static async loginUser(login: LoginFormType): Promise<LoginResponse> {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, login.email),
      });

      if (!user) {
        throw new Error("Credenciales inválidas");
      }

      const isValid = await this.verifyPassword(user.password, login.password);

      if (!isValid) {
        throw new Error("Credenciales inválidas");
      }

      const token = await generateToken(
        {
          sub: user.id,
          email: user.email,
        },
        process.env.JWT_EXPIRES_IN ?? "15m"
      );

      return this.mapToDomain({ user, token });
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }

  public static mapToDomain({
    user,
    token,
  }: {
    user: typeof users.$inferSelect;
    token: string;
  }): LoginResponse {
    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      token,
    };
  }
}
