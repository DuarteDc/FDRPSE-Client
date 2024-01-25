import { Section } from "../../domain/models";
import { SectionsResponseDto } from "../http/dto/sections"
import { http } from "../http/http"

export const sectionRespository = {

    getSections: async (): Promise<Array<Section> | string> => {
        try {
            const { sections } = await http.get<SectionsResponseDto>('/sections');
            return sections.map(({ id, name, question, binary, created_at, updated_at }) => new Section(id, name, question, binary, created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    }

}