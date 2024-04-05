export interface SurveysPaginationResponseDto {
    per_page: number;
    data: Data[];
    total: number;
}
export interface Data {
    id: number;
    start_date: string;
    end_date: Date | undefined;
    status: boolean;
    created_at: string;
    updated_at: string;
    total: string;
}
