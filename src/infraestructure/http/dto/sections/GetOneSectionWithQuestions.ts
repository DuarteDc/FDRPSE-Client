import { SectionResponseDto } from './';

export interface GetOneSectionWithQuestions {
    section: SectionWithQuestions
}

export interface SectionWithQuestions extends SectionResponseDto {
    questions: Array<QuestionInsideSection>
}


export interface QuestionInsideSection {
    id: number;
    name: string;
    category_id: number | null;
    section_id: number;
    domain_id: number | null;
    dimension_id: number;
    qualification_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    type: string;
}