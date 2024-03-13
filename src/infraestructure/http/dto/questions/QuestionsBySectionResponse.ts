export interface QuestionsBySectionResponse {
    current_page : number;
    section      : QuestionsBySection;
    next_page    : string;
    previous_page: string;
    total_pages  : number; 
}

export interface QuestionsBySection {
    id          : number;
    name        : string;
    binary      : boolean;
    question    : string | null;
    questions   : Array<QuestionsInsideSection> | [];
}

export interface QuestionsInsideSection {
    id              : number;
    name            : string;
    section_id      : number;
    qualification   : Qualification;
}

export interface Qualification {
    id: string;
    name: string;
    always_op: string;
    almost_alwyas_op: string;
    sometimes_op: string;
    almost_never_op: string;
    never_op: string;
}