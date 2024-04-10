import { http } from '../http/http';
import { CreateGuideDto, GuideUserResponseDto, GuidesResponseDto, OneGuideResponseDto } from '../http/dto/guide';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';
import { Guide, GuideUser } from '../../domain/models';


export const guideRepository = {


    getGuides: async (query: string): Promise<Array<Guide> | string> => {
        try {
            const { guides } = await http.get<GuidesResponseDto>(`/auth/guides/search${query}`);
            return guides.map((guide) =>
            ({
                id: guide.id,
                gradable: guide.gradable,
                name: guide.name,
                status: guide.status,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),

            }))
        } catch (error) {
            return error as string;
        }
    },

    getGuide: async (guideId: string): Promise<Guide | string> => {
        try {
            const { guide } = await http.get<OneGuideResponseDto>(`/auth/guides/${guideId}`);
            console.log(guide)
            return {
                id: guide.id,
                gradable: guide.gradable,
                name: guide.name,
                status: guide.status,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),
                qualification: (guide.survey.length > 0) ? {
                    id: guide?.survey[0]?.pivot?.qualification?.id,
                    low: guide?.survey[0]?.pivot?.qualification?.low,
                    middle: guide?.survey[0]?.pivot?.qualification?.middle,
                    despicable: guide?.survey[0]?.pivot?.qualification?.despicable,
                    high: guide?.survey[0]?.pivot?.qualification?.high,
                    veryHigh: guide?.survey[0]?.pivot?.qualification?.very_high,
                } : undefined
            }
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
    },

    existAvailableGuide: async (): Promise<GuideUser | string> => {
        try {
            const { guide } = await http.get<GuideUserResponseDto>('/auth/surveys/current');
            return {
                id: guide.id,
                status: guide.status,
                total: guide.total,
                guideId: guide.guide_id,
                userId: guide.user_id,
                answers: undefined,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),
            }
        } catch (error) {
            return error as string;
        }
    },

    getGuideBySurvey: async (guideId: string, surveyId: string): Promise<Guide | string> => {
        try {
            const { guide } = await http.get<OneGuideResponseDto>(`/auth/guides/${guideId}/survey/${surveyId}`);
            console.log(guide)
            return {
                id: guide.id,
                gradable: guide.gradable,
                name: guide.name,
                status: guide.status,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),
                qualification: (guide.survey.length > 0) ? {
                    id: guide?.survey[0]?.pivot?.qualification?.id,
                    low: guide?.survey[0]?.pivot?.qualification?.low,
                    middle: guide?.survey[0]?.pivot?.qualification?.middle,
                    despicable: guide?.survey[0]?.pivot?.qualification?.despicable,
                    high: guide?.survey[0]?.pivot?.qualification?.high,
                    veryHigh: guide?.survey[0]?.pivot?.qualification?.very_high,
                } : undefined
            }
        } catch (error) {
            return error as string;
        }
    },


}