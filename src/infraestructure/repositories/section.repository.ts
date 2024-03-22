import { http } from '../http/http';
import { Section } from '../../domain/models';
import { CreateSectioResponseDto, CreateSectionDto, GetOneSectionWithQuestions, GetSectionsWithQuestions, PostSectionsIdDto, SectionDetailResponseDto, SectionsResponseDto } from '../http/dto/sections';
import { errorAlert, succesAlert } from '../alert/alerts';
import { SectionQuesions } from '../../domain/models/SectionQuestions';
import { SectionDetail } from '../../domain/models/SectionDetail';

export const sectionRespository = {

    getSections: async (type: string): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>(`/auth/sections${type}`);
            return sections.map(({ id, name, question, binary, questions_count, created_at, updated_at }) => new Section(id, name, question, binary, questions_count, created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    },

    getOneSection: async (sectionId: string): Promise<SectionDetail | string> => {
        try {
            const { section } = await http.get<SectionDetailResponseDto>(`/auth/sections/${sectionId}`);
            return {
                ...section,
                createdAt: new Date(section.created_at),
                updatedAt: new Date(section.updated_at),
                canFinishGuide: !!(section.can_finish_guide),
                questionsCount: section.questions_count,
                questions: (section?.questions) && 
                    section.questions.map((question) => ({
                        ...question,
                        createdAt: new Date(question.created_at),
                        updatedAt: new Date(question.updated_at),
                        deletedAt: new Date(question.deleted_at),
                        category: question.category ? {
                            ...question.category,
                            createdAt: new Date(question.category?.created_at),
                            updatedAt: new Date(question.category?.updated_at),
                        }: undefined,
                        domain: question.domain ? {
                            ...question.domain,
                            createdAt: new Date(question.domain?.created_at),
                            updatedAt: new Date(question.domain?.updated_at),
                        }: undefined,
                        dimension: question.dimension ? {
                            ...question.dimension,
                            createdAt: new Date(question.dimension?.created_at),
                            updatedAt: new Date(question.dimension?.updated_at),
                        }: undefined,
                        qualification: question.qualification ?  {
                            ...question.qualification,
                            alwaysOp: question.qualification.always_op,
                            almostAlwyasOp: question.qualification.almost_alwyas_op,
                            sometimesOp: question.qualification.sometimes_op,
                            almostNeverOp: question.qualification.almost_never_op,
                            neverOp: question.qualification.never_op,
                            createdAt: new Date(question.qualification.created_at),
                            updatedAt: new Date(question.qualification.updated_at),
                            deletedAt: question.qualification.deleted_at ? new Date(question.qualification?.deleted_at) : null,
                        }: undefined
                    })),
            }
        } catch (error) {
            return error as string;
        }
    },

    createSection: async (createSectionDto: CreateSectionDto): Promise<Section | string> => {
        try {
            const { message, section } = await http.post<CreateSectioResponseDto>('/auth/sections/create', createSectionDto);
            succesAlert(message);
            return new Section(section.id, section.name, section.question, section.binary, section.questions_count, section.created_at, section.updated_at);
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },

    getSectionWithQuestions: async (): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>('/auth/sections/questions');
            return sections.map(({ id, name, question, binary, questions_count, created_at, updated_at }) => new Section(id, name, question, binary, questions_count, created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    },

    getSectionsByType: async (type: string): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>(`/auth/sections/questions/by?type=${type}`);
            return sections.map(({ id, name, question, binary, questions_count, created_at, updated_at }) => new Section(id, name, question, binary, questions_count, created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    },

    getSectionDetail: async (sectionId: string): Promise<SectionQuesions | string> => {
        try {
            const { section } = await http.get<GetOneSectionWithQuestions>(`/auth/sections/questions/${sectionId}`);
            return new SectionQuesions(section.id, section.name, section.question, section.binary, section.questions_count, section.created_at, section.updated_at, section.questions)
        } catch (error) {
            return error as string;
        }
    },

    getMultipleSectionsWithQuestions: async (sectionsId: PostSectionsIdDto) => {
        try {
            const { sections } = await http.post<GetSectionsWithQuestions>('/auth/sections/details', sectionsId);
            return sections.map(({ id, name, binary, question, questions, questions_count, created_at, updated_at }) =>
                new SectionQuesions(id, name, question, binary, questions_count, created_at, updated_at, questions))
        } catch (error) {
            return error as string;
        }
    }

}