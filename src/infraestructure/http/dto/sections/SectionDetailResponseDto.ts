import { TypeQuestion } from "../../../../domain/models/SectionQuestions";

export interface SectionDetailResponseDto {
    section: SectionClass;
}

export interface Question {
    id:               number;
    name:             string;
    created_at:       Date;
    updated_at:       Date;
    deleted_at:       Date;
    type:             TypeQuestion;
    qualification:    Qualification;
    category:         Dimension | null;
    dimension:        Dimension;
    domain:           Dimension | null;
}

export interface SectionClass {
    id:               number;
    name:             string;
    created_at:       Date;
    updated_at:       Date;
    binary:           boolean;
    question:         string;
    type:             string;
    can_finish_guide: boolean;
    questions_count:  number;
    questions?:       Question[];
}

export interface Dimension {
    id:         number;
    name:       string;
    created_at: Date;
    updated_at: Date;
}

export interface Qualification {
    id:               number;
    name:             string;
    always_op:        number;
    almost_alwyas_op: number;
    sometimes_op:     number;
    almost_never_op:  number;
    never_op:         number;
    created_at:       Date;
    updated_at:       Date;
    deleted_at:       Date | null;
}
