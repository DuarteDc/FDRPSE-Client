export interface GuideUserSurveyResponseDto {
    survey: SurveyElement[];
}

export interface SurveyElement {
    id:        number;
    guide_id:  number;
    user_id:   number;
    survey_id: number;
    status:    boolean;
    user:       User;
    total:      number;
    created_at: string;
    updated_at: string;
}


interface User {
    id:        number;
    nombre:    string;
    userName:  string;
    apellidoP: string;
    apellidoM: string;
    area:      Area;
}

interface Area {
    id:         number;
    nombreArea: string;
}