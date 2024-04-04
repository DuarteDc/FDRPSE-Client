export interface GuideUser {
    id:        number;
    guideId:   number;
    userId:    number;
    answers?:  Answer[];
    createdAt: Date;
    updatedAt: Date;
    status:    boolean;
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
