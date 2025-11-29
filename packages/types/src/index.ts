export * from '@realtyeaseai/database';

export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
