import apiClient from "../api-client";
import { User } from "@/domain/user";
import { useQuery } from "@tanstack/react-query";
import { PaginationResponse } from "@/domain/Pagination";

interface UseUsersProps {
  page: number;
  size: number;
}

const fetchUsers = async (
  props: UseUsersProps
): Promise<PaginationResponse<User>> => {
  const response = await apiClient.get("/user", {
    params: {
      page: props.page,
      size: props.size,
    },
  });
  return response.data;
};

export const useUsers = (props: UseUsersProps) => {
  return useQuery({
    queryKey: ["users", props.page, props.size],
    queryFn: () => fetchUsers(props),
    placeholderData: (previousData) => previousData,
  });
};
