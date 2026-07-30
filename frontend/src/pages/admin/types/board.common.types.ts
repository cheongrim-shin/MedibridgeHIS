// 페이징 타입
export interface PagedResponse<T> {
    items: T[];
    totalCount: number;
    currentPage: number;
    size: number;
    totalPages: number;
}