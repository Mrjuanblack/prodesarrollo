import apiClient from "../api-client";
import { UpdateUser, User } from "@/domain/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UseUpdateUserProps {
  id: string;
  user: UpdateUser;
}

const updateUser = async (props: UseUpdateUserProps): Promise<User> => {
  const response = await apiClient.put(`/user/${props.id}`, props.user);
  return response.data;
};

export const useUpdateUser = (props: UseUpdateUserProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", props.id] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
