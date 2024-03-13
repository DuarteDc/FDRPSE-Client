import { http } from '../http/http';
import { Section } from '../../domain/models';
import { CreateSectioResponseDto, CreateSectionDto, GetOneSectionResponseDto, GetOneSectionWithQuestions, GetSectionsWithQuestions, PostSectionsIdDto, SectionsResponseDto } from '../http/dto/sections';
import { errorAlert, succesAlert } from '../alert/alerts';
import { SectionQuesions } from '../../domain/models/SectionQuestions';
import { SectionWithQuestions } from '../http/dto/sections/GetOneSectionWithQuestions';

export const sectionRespository = {

    getSections: async (): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>('/auth/sections');
            return sections.map(({ id, name, question, binary, questions_count, created_at, updated_at }) => new Section(id, name, question, binary, questions_count, created_at, updated_at))
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