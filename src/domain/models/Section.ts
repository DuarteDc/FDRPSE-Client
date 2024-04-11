
import { TypeQuestion } from "./SectionQuestions";

export interface SectionSchema {
    id              : number;
    name            : string;
    question        : string | null;
    binary          : boolean
    questionCount   : number | null;
    type            : TypeQuestion;
    canFinishGuide ?: boolean;
    createdAt       : Date;
    updatedAt       : Date;
}

export class Section implements SectionSchema {

    readonly id;
    readonly name;
    readonly question;
    readonly binary;
    readonly canFinishGuide;
    readonly questionCount;
    readonly type;
    readonly createdAt;
    readonly updatedAt;

    constructor(id: number, name:string, question: string | null, binary: boolean, questionCount: number | null,canFinishGuide: boolean | undefined, type: TypeQuestion,createdAt: string, updatedAt: string) {
        this.id             = id;
        this.name           = name;
        this.question       = question;
        this.binary         = binary;
        this.canFinishGuide = canFinishGuide;
        this.questionCount  = questionCount;
        this.type           = type;
        this.createdAt      = new Date(createdAt);
        this.updatedAt      = new Date(updatedAt);
    }

}