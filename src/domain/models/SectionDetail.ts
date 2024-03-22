import { TypeQuestion } from "./SectionQuestions";

export interface QuestionInsideSection {
    id:              number;
    name:            string;
    createdAt:       Date;
    updatedAt:       Date;
    deletedAt:       Date;
    type:            TypeQuestion;
    qualification?:   Qualification;
    category ?:       Dimension;
    dimension?:       Dimension;
    domain?:          Dimension | null;
}

export interface SectionDetail {
    id:             number;
    name:           string;
    createdAt:      Date;
    updatedAt:      Date;
    binary:         boolean;
    question:       string;
    type:           string;
    canFinishGuide: boolean;
    questionsCount: number;
    questions?:     QuestionInsideSection[];
}

export interface Dimension {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Qualification {
    id:             number;
    name:           string;
    alwaysOp:       number;
    almostAlwyasOp: number;
    sometimesOp:    number;
    almostNeverOp:  number;
    neverOp:        number;
    createdAt:      Date;
    updatedAt:      Date;
    deletedAt:      Date | null;
}
