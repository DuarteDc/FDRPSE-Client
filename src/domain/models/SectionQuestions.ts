import { Qualification } from '.';
import { QuestionInsideSection } from '../../infraestructure/http/dto/sections/GetOneSectionWithQuestions';
import { Section, SectionSchema } from './Section';

interface SectionQuestionsSchema extends SectionSchema {
    questions?: Array<Question>
}

export type TypeQuestion = 'gradable' | 'nongradable';
interface Question {
    id: number;
    name: string;
    categoryId: number | null,
    sectionId: number,
    canFinishGuide?: boolean;
    domainId: number | null,
    dimensionId: number;
    qualification: Qualification,
    type: TypeQuestion;
}
export class SectionQuesions extends Section implements SectionQuestionsSchema {

    readonly questions?: Question[];

    constructor(id: number, name: string, question: string | null, binary: boolean, questionCount: number | null, canFinishGuide: boolean |  undefined, type: TypeQuestion, createdAt: string, updatedAt: string, questions: Array<QuestionInsideSection>) {
        super(id, name, question, binary, questionCount, canFinishGuide, type, createdAt, updatedAt);
        this.questions = questions.map((question) => ({
            id: question.id,
            name: question.name,
            categoryId: question.category_id,
            sectionId: question.section_id,
            domainId: question.domain_id,
            dimensionId: question.dimension_id,
            qualification: { ...question.qualification, createdAt: new Date, updatedAt: new Date },
            type: question.type
        }))
    }

}