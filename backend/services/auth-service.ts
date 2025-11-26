import { generateToken } from "../utilities/auth/jwt";
import { LoginFormType, LoginResponse } from "@/domain/auth";
import { UserRepository } from "../db/repositories/user-repository";
import { AuthRepository } from "../db/repositories/auth-repository";

export class AuthService {
  public static async loginUser(login: LoginFormType): Promise<LoginResponse> {
    const user = await UserRepository.getUserPassWord(login.email);

    await AuthRepository.verifyPassword(user.password, login.password);

    const token = await generateToken(
      {
        sub: user.id,
        email: user.email,
      },
      process.env.JWT_EXPIRES_IN ?? "15m"
    );

    return {
      user,
      token,
    };
  }
}
