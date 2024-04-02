interface DomainSchema {
    id          : string;
    name        : string;
    createdAt   : Date;
    updatedAt   : Date;
}

interface Qualifications {
    id                  : number;
    despicable          : string;
    low                 : string;
    middle              : string;
    high                : string;
    veryHigh            : string;
    qualificationableId : number;
}
export class DomainQualifications implements DomainSchema {

    readonly id             : string;
    readonly name           : string;
    readonly qualifications : Array<Qualifications>;
    readonly createdAt      : Date;
    readonly updatedAt      : Date;

    constructor(id: string, name:string, qualifications: any, createdAt: string, updatedAt: string) {
        this.id                 = id;
        this.name               = name;
        this.qualifications     = qualifications;
        this.createdAt          = new Date(createdAt);
        this.updatedAt          = new Date(updatedAt);
    }

}