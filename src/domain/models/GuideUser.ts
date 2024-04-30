export interface GuideUser {
    id:        number;
    guideId:   number;
    userId:    number;
    surveyId:  number;
    answers?:  Answer[];
    guide?: Guide;
    createdAt: Date;
    updatedAt: Date;
    status:    boolean;
    success?:  boolean;
    total:     number;
}

export interface Answer {
    questionId:        number;
    name:              string;
    category:          Category;
    section:           Section;
    domain:            Category;
    dimension:         Category;
    qualification:     boolean;
    qualificationName: string;
}

export interface Category {
    id:   string;
    name: string;
}

export interface Section {
    id:   number;
    name: string;
}

export interface Guide {
    id:        number;
    name:      string;
    gradable:  boolean;
    status:    boolean;
}

