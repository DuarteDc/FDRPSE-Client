interface QuestionSchema {
    id          : string;
    question    : string;
    createdAt   : Date;
    updatedAt   : Date;
}

export class Question implements QuestionSchema {
    readonly id         : string;
    readonly question   : string;
    readonly createdAt  : Date;
    readonly updatedAt  : Date;

    constructor(id: string, question: string, createdAt: string, updatedAt: string) {
        this.id         = id;
        this.question   = question;
        this.createdAt  = new Date(createdAt);
        this.updatedAt  = new Date(updatedAt);
    }

}