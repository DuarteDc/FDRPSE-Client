
export interface GuideSurveyUserDetail {
    userId:  number;
    total:   number;
    status:  boolean;
    answers: Answer[];
    user:    User;
}

interface Answer {
    questionId:        number;
    name:              string;
    category:          Category;
    section:           Ion;
    domain:            Category;
    dimension:         Ion;
    qualification:     number;
    qualificationData: QualificationData;
}

interface Category {
    id:            number;
    name:          string;
    qualification: Qualification;
}

interface Qualification {
    id:         number;
    despicable: string;
    low:        string;
    middle:     string;
    high:       string;
    veryHigh:   string;
}

interface Ion {
    id:   number;
    name: string;
}

interface QualificationData {
    alwaysOp:       number;
    almostAlwyasOp: number;
    sometimesOp:    number;
    almostNeverOp:  number;
    neverOp:        number;
}

interface User {
    id:        number;
    name:    string;
    lastName: string;
    area:      Area;
    areaId:    number;
}

interface Area {
    id:  number;
    name: string;
}
