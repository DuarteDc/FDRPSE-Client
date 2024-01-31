export interface CreateQuestionDto {
    name                 : string;
    category_id          : string;
    domain_id           ?: string;
    dimension_id        ?: string;
    qualification_id    ?: string;
    section_id           : string;
}