import { PaginationResponse } from "@/domain/Pagination";
import { News, NewsCategory } from "@/domain/News";
import apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";

interface UseNewsListProps {
    page: number;
    size: number;
    type?: NewsCategory;
}

const fetchNewsList = async (props: UseNewsListProps): Promise<PaginationResponse<News>> => {
    const response = await apiClient.get('/news', {
        params: {
            page: props.page,
            size: props.size,
            type: props.type,
        },
    });
    return response.data;
}

export const useNewsList = (props: UseNewsListProps) => {
    return useQuery({
        queryKey: ['news-list', props.page, props.size, props.type],
        queryFn: () => fetchNewsList(props),
        placeholderData: (previousData) => previousData,
    });
}

