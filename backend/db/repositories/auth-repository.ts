import argon2 from "argon2";
import { ErrorHandler_Repository } from "./ErrorHanlder";
import { RepositoryErrorOrigin, RepositoryErrorType } from "@/domain/Errors";

const errorHandler = new ErrorHandler_Repository(RepositoryErrorOrigin.AUTH);

export class AuthRepository {
  public static async verifyPassword(hash: string, plain: string) {
    try {
      const valid = await argon2.verify(hash, plain);

      if (!valid) {
        throw errorHandler.handleError(
          RepositoryErrorType.NOT_FOUND,
          new Error("Credenciales inválidas")
        );
      }
    } catch (error) {
      throw errorHandler.handleError(RepositoryErrorType.CREATE, error);
    }
  }
}
