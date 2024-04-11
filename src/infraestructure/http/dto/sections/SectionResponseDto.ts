import { TypeQuestion } from "../../../../domain/models/SectionQuestions";

export interface SectionResponseDto {
    id                  : number;
    name                : string;
    question            : string | null;
    binary              : boolean;
    questions_count     : number | null;
    type                : TypeQuestion;
    can_finish_guide    ?:boolean;
    created_at          : string;
    updated_at          : string;
}
