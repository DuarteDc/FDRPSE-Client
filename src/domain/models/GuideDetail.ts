import { TypeQuestion } from "./SectionQuestions";

export interface GuideDetail {
    id:       number;
    name:     string;
    gradable: boolean;
    status:   boolean;
    sections: Section[];
}

interface Section {
    id:        number;
    name:      string;
    guideId:   number;
    question?: string;
    binary: boolean;
    canFinishGuide: boolean;
    questions: Question[] | undefined;
}

interface Question {
    id:              number;
    type:            TypeQuestion;
    name:            string;
    sectionId:       number;
    qualificationId: number | null;
    qualification:   Qualification | undefined;
}

interface Qualification {
    id:             number;
    name:           string;
    alwaysOp:       number;
    almostAlwyasOp: number;
    sometimesOp:    number;
    almostNeverOp:  number;
    neverOp:        number;
}
