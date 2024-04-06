import { GuideResponseDto } from "../guide";

export interface GuideUserSurveyResponseDto {
    survey: SurveyElement[];
}

export interface SurveyElement {
    id:        number;
    guide_id:  number;
    user_id:   number;
    survey_id: number;
    status:    boolean;
    users:     Users;
    total:      number;
    created_at: string;
    updated_at: string;
}


interface Users {
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