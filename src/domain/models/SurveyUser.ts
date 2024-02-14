interface SurveyUserSchema {
    userId      : string;
    answers     : Array<Answer> | [];
    total       : string;
    user        : User;
    status      : boolean;
}

interface Answer{
    question_id      : number,
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
    id          : string;
    name        : string;
    last_name   : string;
    area    : {
        id      : string;
        name    : string;
    }
}

export class SurveyUser implements SurveyUserSchema {

    
    readonly userId: string;
    readonly answers: Answer[] | [];
    readonly total: string;
    readonly user: User;   
    readonly status: boolean; 

    constructor(userId: string, answers: Answer[], total: string, user: User, status: boolean) {
        this.userId     = userId;
        this.answers    = answers;
        this.total      = total;
        this.user       = user;
        this.status     = status;
    }

}