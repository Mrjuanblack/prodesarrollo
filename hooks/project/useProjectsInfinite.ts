import { useMemo } from "react";
import apiClient from "../api-client";
import { PaginationResponse } from "@/domain/Pagination";
import { Project, ProjectType } from "@/domain/Projects";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseProjectsInfiniteProps {
  size?: number;
  year?: number;
  type?: ProjectType;
  search?: string;
}

const fetchProjects = async (
  page: number,
  size: number,
  year?: number,
  type?: ProjectType,
  search?: string
): Promise<PaginationResponse<Project>> => {
  const response = await apiClient.get("/project", {
    params: {
      page,
      size,
      year: year || undefined,
      type: type || undefined,
      search: search || undefined,
    },
  });
  return response.data;
};

export const useProjectsInfinite = ({
  size = 10,
  year,
  type,
  search,
}: UseProjectsInfiniteProps) => {
  const query = useInfiniteQuery({
    queryKey: ["projects-infinite", year, type, search, size],
    queryFn: ({ pageParam = 0 }) =>
      fetchProjects(pageParam, size, year, type, search),
    getNextPageParam: (lastPage, allPages) => {
      // Calculate if there are more pages
      const loadedItems = allPages.reduce(
        (acc, page) => acc + page.data.length,
        0
      );
      if (loadedItems < lastPage.total) {
        return allPages.length; // Return next page number
      }
      return undefined; // No more pages
    },
    initialPageParam: 0,
  });

  // Flatten all pages into items array
  const items = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.data) ?? [];
  }, [query.data]);

  return {
    items,
    hasMore: query.hasNextPage,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    onLoadMore: query.fetchNextPage,
    refetch: query.refetch,
    error: query.error,
  };
};
