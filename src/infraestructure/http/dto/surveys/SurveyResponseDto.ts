export interface SurveyResponseDto {
    id              : string;
    start_date      : string;
    end_date        ?: string;
    status          : boolean;
    created_at      : string;
    updated_at      : string;
}

export interface StartNewSurveyResponseDto {
    survey: SurveyResponseDto;
    messgae: string;
}