import { TypeQuestion } from '../../../../domain/models/SectionQuestions';

export interface CreateQuestionDto {
    name                 : string;
    type                 : TypeQuestion;
    category_id         ?: string;
    domain_id           ?: string;
    dimension_id        ?: string;
    qualification_id    ?: string;
    section_id           : string;
}