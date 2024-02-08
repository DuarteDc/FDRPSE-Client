interface SectionSchema {
    id              : string;
    name            : string;
    question        : string | null;
    binary          : boolean
    questionCount   : number | null;
    createdAt       : Date;
    updatedAt       : Date;
}

export class Section implements SectionSchema {

    readonly id;
    readonly name;
    readonly question;
    readonly binary;
    readonly createdAt;
    readonly questionCount;
    readonly updatedAt;

    constructor(id: string, name:string, question: string | null, binary: boolean, questionCount: number | null, createdAt: string, updatedAt: string) {
        this.id             = id;
        this.name           = name;
        this.question       = question;
        this.binary         = binary;
        this.questionCount  = questionCount;
        this.createdAt      = new Date(createdAt);
        this.updatedAt      = new Date(updatedAt);
    }

}