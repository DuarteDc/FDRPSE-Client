import { QuestionInsideSection } from '../../infraestructure/http/dto/sections/GetOneSectionWithQuestions';
import { Section, SectionSchema } from './Section';

interface SectionQuestionsSchema extends SectionSchema {
    questions: Array<Question>
}

interface Question {
    id: number;
    name: string;
    categoryId: number | null,
    sectionId: number,
    domainId: number | null,
    dimensionId: number;
    qualificationId: number,
    type: string;
}
export class SectionQuesions extends Section implements SectionQuestionsSchema {

    readonly questions: Question[];

    constructor(id: string, name: string, question: string | null, binary: boolean, questionCount: number | null, createdAt: string, updatedAt: string, questions: Array<QuestionInsideSection>) {
        super(id, name, question, binary, questionCount, createdAt, updatedAt);
        this.questions = questions.map((question) => ({
            id: question.id,
            name: question.name,
            categoryId: question.category_id,
            sectionId: question.section_id,
            domainId: question.domain_id,
            dimensionId: question.dimension_id,
            qualificationId: question.qualification_id,
            type: 'graddable'
        }))
    }

}