export interface SurveysPaginationResponseDto {
    current_page:   number;
    data:           Data[];
    next_page_url:  null;
    prev_page_url:  null;
}
export interface Data {
    id:         number;
    start_date: string;
    end_date:   Date | undefined;
    status:     boolean;
    created_at: string;
    updated_at: string;
    total:      string;
}
