import { SectionQuesions } from './';

export type TypeGudie = 'gradable' | 'nongradable'

export interface GuideQualifications {
    id                 ?: number;
    despicable          : number;
    low                 : number;
    middle              : number;
    high                : number;
    veryHigh            : number;
    qualificationableId?: number;
}
export interface GuideSchema {
    id: number;
    name: string;
    gradable: boolean;
    sections  ?: Array<SectionQuesions>
    qualification ?:GuideQualifications;
    createdAt ?: Date;
    updatedAt ?: Date;
}


export class Guide implements GuideSchema {
    
    readonly id;
    readonly name;
    readonly gradable;
    readonly sections;
    readonly qualification;
    readonly createdAt;
    readonly updatedAt;


    constructor(id: number, name: string, gradable: boolean, sections: any, qualification:any, createdAt: string, updatedAt: string) {
        this.id        = id; 
        this.name      = name; 
        this.gradable  = gradable;
        this.sections  = sections;     
        this.qualification = qualification;
        this.createdAt = new Date(createdAt);     
        this.updatedAt = new Date(updatedAt);     
    }

}