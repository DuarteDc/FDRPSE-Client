export interface GudieDetailResponseDto {
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
    id:        number;
    name:      string;
    guideid:   number;
    questions: Question[];
}

interface Question {
    id:              number;
    name:            string;
    sectionid:       number;
    qualificationid: number;
    qualification:   Qualification;
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
