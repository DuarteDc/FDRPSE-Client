interface SectionSchema {
    id          : string;
    name        : string;
    question    : string | null;
    binary      : boolean
    createdAt   : Date;
    updatedAt   : Date;
}

export class Section implements SectionSchema {

    readonly id;
    readonly name;
    readonly question;
    readonly binary;
    readonly createdAt;
    readonly updatedAt;

    constructor(id: string, name:string, question: string | null, binary: boolean, createdAt: string, updatedAt: string) {
        this.id         = id;
        this.name       = name;
        this.question   = question;
        this.binary     = binary;
        this.createdAt  = new Date(createdAt);
        this.updatedAt  = new Date(updatedAt);
    }

}