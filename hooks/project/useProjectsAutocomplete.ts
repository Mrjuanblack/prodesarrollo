import { PaginationResponse } from "@/domain/Pagination";
import { Project } from "@/domain/Projects";
import apiClient from "../api-client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface UseProjectsAutocompleteProps {
    search: string;
    size?: number;
}

const fetchProjects = async (page: number, search: string, size: number): Promise<PaginationResponse<Project>> => {
    const response = await apiClient.get('/project', {
        params: {
            page,
            size,
            search: search || undefined,
        },
    });
    return response.data;
}

export const useProjectsAutocomplete = ({ search, size = 10 }: UseProjectsAutocompleteProps) => {
    const query = useInfiniteQuery({
        queryKey: ['projects-autocomplete', search, size],
        queryFn: ({ pageParam = 0 }) => fetchProjects(pageParam, search, size),
        getNextPageParam: (lastPage, allPages) => {
            // Calculate if there are more pages
            const loadedItems = allPages.reduce((acc, page) => acc + page.data.length, 0);
            if (loadedItems < lastPage.total) {
                return allPages.length; // Return next page number
            }
            return undefined; // No more pages
        },
        initialPageParam: 0,
        enabled: search.length >= 2, // Only search when user types at least 2 characters
    });

    // Flatten all pages into items array for HeroUI
    const items = useMemo(() => {
        return query.data?.pages.flatMap(page => page.data) ?? [];
    }, [query.data]);

    return {
        items,
        hasMore: query.hasNextPage,
        isLoading: query.isLoading || query.isFetchingNextPage,
        onLoadMore: query.fetchNextPage,
    };
}

