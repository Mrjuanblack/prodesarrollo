import { User } from "@/domain/user";
import apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (id: string): Promise<User> => {
  const response = await apiClient.get(`/user/${id}`);
  return response.data;
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
};

export default useUser;
