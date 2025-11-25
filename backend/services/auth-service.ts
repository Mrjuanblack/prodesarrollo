import { LoginFormType, LoginResponse } from "@/domain/auth";
import { AuthRepository } from "../db/repositories/auth-repository";

export class AuthService {
  public static async loginUser(login: LoginFormType): Promise<LoginResponse> {
    return AuthRepository.loginUser(login);
  }
}
