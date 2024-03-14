import { http } from '../http/http';
import { CreateGuideDto, GuidesResponseDto } from '../http/dto/guide';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';
import { Guide } from '../../domain/models';


export const guideRepository = {


    getGuides: async (query: string): Promise<Array<Guide> | string> => {
        try {
            const { guides } = await http.get<GuidesResponseDto>(`/auth/guides/search${query}`);
            return guides.map(({ id, name, gradable, created_at, updated_at }) => new Guide(id, name, gradable, [], [], created_at, updated_at))
        } catch (error) {
            return error as string;
        }
    },

    createGuide: async (createGuideDto: CreateGuideDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/auth/guides/create', createGuideDto);
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false };
        }
    }

}