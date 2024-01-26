export interface CreateQuestionDto {
    question             : string;
    category_id          : string;
    domain_id           ?: string;
    dimension_id        ?: string;
    qualification_id    ?: string;
}