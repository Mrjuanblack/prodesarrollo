export interface PaginationRequest {
    page: number;
    size: number;
}

export interface PaginationResponse<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}