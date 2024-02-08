import { SurveyResponseDto } from './';

export interface SurveysResponseDto {
    data            : Array<SurveyResponseDto>
    current_page    : number;
    next_page_url   : string;
    prev_page_url   : string;
}