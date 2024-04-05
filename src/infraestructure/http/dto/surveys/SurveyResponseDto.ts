export interface SurveyResponseDto {
    survey: SurveyClass;
}

export interface SurveyClass {
    id:         number;
    start_date: string;
    end_date:   null;
    status:     boolean;
    created_at: string;
    updated_at: string;
    total:      string;
    guides:     Guide[];
}

export interface Guide {
    id:         number;
    name:       string;
    survey_id:  null;
    gradable:   boolean;
    created_at: string;
    updated_at: string;
    status:     boolean;
    pivot:      Pivot;
}

export interface Pivot {
    surveyid: number;
    guideid:  number;
    status:   boolean;
}