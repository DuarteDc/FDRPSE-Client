import { http } from '../http/http';
import { Section } from '../../domain/models';
import { CreateSectioResponseDto, CreateSectionDto, GetOneSectionResponseDto, SectionsResponseDto } from '../http/dto/sections';
import { errorAlert, succesAlert } from '../alert/alerts';

export const sectionRespository = {

    getSections: async (): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>('/sections');
            return sections.map(({ id, name, question, binary, questions_count, created_at, updated_at }) => new Section(id, name, question, binary, questions_count, created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    },

    createSection: async (createSectionDto: CreateSectionDto): Promise<Section | string> => {
        try {
            const { message, section } = await http.post<CreateSectioResponseDto>('/sections/create', createSectionDto);
            succesAlert(message);
            return new Section(section.id, section.name, section.question, section.binary, section.questions_count, section.created_at, section.updated_at);
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },

    getSectionWithQuestions: async (): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>('/sections/questions');
            return sections.map(({ id, name, question, binary, questions_count, created_at, updated_at }) => new Section(id, name, question, binary, questions_count, created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    }


}