import { CreateUser, UpdateFormUser, User } from "@/domain/user";
import { UserRepository } from "../db/repositories/user-repository";
import { PaginationRequest, PaginationResponse } from "@/domain/Pagination";

export class UserService {
  public static async createUser(user: CreateUser): Promise<User> {
    return UserRepository.createUser(user);
  }

  public static async getUserById(id: string): Promise<User> {
    return UserRepository.getUserById(id);
  }

  public static async getPaginatedUsers(
    pRequest: PaginationRequest
  ): Promise<PaginationResponse<User>> {
    return UserRepository.getPaginatedUsers(pRequest);
  }

  public static async updateUser(
    id: string,
    user: UpdateFormUser
  ): Promise<User> {
    return await UserRepository.updateUser(id, user);
  }
}
