export interface GetGuideDetailResponseDto {
    guide: Guide;
}

interface Guide {
    id:       number;
    name:     string;
    gradable: boolean;
    status:   boolean;
    sections: Section[];
}

interface Section {
    id:               number;
    name:             string;
    question?:        string; 
    guide_id:         number;
    binary:           boolean;
    can_finish_guide: boolean;
    questions: Question[] | [];
}

interface Question {
    id:               number;
    name:             string;
    type:             string;
    section_id:       number;
    qualification_id: number | null;
    qualification:    Qualification | null;
}

interface Qualification {
    id:               number;
    name:             string;
    always_op:        number;
    almost_alwyas_op: number;
    sometimes_op:     number;
    almost_never_op:  number;
    never_op:         number;
}
