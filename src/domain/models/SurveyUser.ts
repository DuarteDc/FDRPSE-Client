interface SurveyUserSchema {
    userId      : string;
    answers     : Array<Answer>;
    total       : string;
    user        : User;
}

interface Answer{
    questionId      : number,
    name            : string;
    qualification   : number;
    category        : DetailAnswer;
    section         : DetailAnswer;
    domain          : DetailAnswer;
    dimension       : DetailAnswer;
}

interface DetailAnswer {
    id  : number;
    name: string;
}

interface User {
    id      : string;
    nombre  : string;
    userName: string;
    area    : {
        id      : string;
        name    : string;
    }
}

export class SurveyUser implements SurveyUserSchema {

    
    readonly userId: string;
    readonly answers: Answer[];
    readonly total: string;
    readonly user: User;   
    

    constructor(userId: string, answers: Answer[], total: string, user: User) {
        this.userId     = userId;
        this.answers    = answers;
        this.total      = total;
        this.user       = user;
    }

}