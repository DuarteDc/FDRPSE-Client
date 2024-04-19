import { Question } from ".";

export interface QuestionPagination {
    questions: Question[];
    perPage: number;
    total: number;
}

