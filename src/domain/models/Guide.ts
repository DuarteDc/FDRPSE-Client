import { SectionQuesions } from './';

export type TypeGudie = 'gradable' | 'nongradable'

export interface GuideSchema {
    id: number;
    name: string;
    gradable: boolean;
    sections  ?: Array<SectionQuesions>
    createdAt ?: Date;
    updatedAt ?: Date;
}


export class Guide implements GuideSchema {
    
    readonly id;
    readonly name;
    readonly gradable;
    readonly sections;
    readonly createdAt;
    readonly updatedAt;

    constructor(id: number, name: string, gradable: boolean, sections: any, createdAt: string, updatedAt: string) {
        this.id        = id; 
        this.name      = name; 
        this.gradable  = gradable;
        this.sections  = sections;     
        this.createdAt = new Date(createdAt);     
        this.updatedAt = new Date(updatedAt);     
    }

}