import { http } from '../http/http';
import { CreateGuideDto, GetGuideDetailResponseDto, GuideUserResponseDto, GuidesResponseDto, OneGuideResponseDto } from '../http/dto/guide';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';
import { Guide, GuideDetail, GuideUser } from '../../domain/models';


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
            return {
                id: guide.id,
                gradable: guide.gradable,
                name: guide.name,
                status: guide.status,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),
                qualification: (guide.surveys.length > 0) ? {
                    id: guide?.surveys[0]?.pivot?.qualification?.id,
                    low: guide?.surveys[0]?.pivot?.qualification?.low,
                    middle: guide?.surveys[0]?.pivot?.qualification?.middle,
                    despicable: guide?.surveys[0]?.pivot?.qualification?.despicable,
                    high: guide?.surveys[0]?.pivot?.qualification?.high,
                    veryHigh: guide?.surveys[0]?.pivot?.qualification?.very_high,
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
                surveyId: guide.survey_id,
                guide: guide?.guide,
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
            return {
                id: guide.id,
                gradable: guide.gradable,
                name: guide.name,
                status: guide.status,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),
                qualification: (guide.surveys.length > 0) ? {
                    id: guide?.surveys[0]?.pivot?.qualification?.id,
                    low: guide?.surveys[0]?.pivot?.qualification?.low,
                    middle: guide?.surveys[0]?.pivot?.qualification?.middle,
                    despicable: guide?.surveys[0]?.pivot?.qualification?.despicable,
                    high: guide?.surveys[0]?.pivot?.qualification?.high,
                    veryHigh: guide?.surveys[0]?.pivot?.qualification?.very_high,
                } : undefined
            }
        } catch (error) {
            return error as string;
        }
    },

    disableGudie: async (guideId: number): Promise<CommonResponseDto> => {
        try {
            const { message, success } = await http.destroy<CommonResponseDto>(`/auth/guides/disable/${guideId}`);
            succesAlert(message)
            return { message, success };
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false };
        }
    },

    enableGudie: async (guideId: number): Promise<CommonResponseDto> => {
        try {
            const { message, success } = await http.patch<CommonResponseDto>(`/auth/guides/enable/${guideId}`, {});
            succesAlert(message)
            return { message, success };
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false };
        }
    },

    getGuideDetail: async (guideId: number): Promise<GuideDetail | string> => {
        try {
            const { guide } = await http.get<GetGuideDetailResponseDto>(`/auth/guides/${guideId}/detail`);
            return {
                ...guide,
                sections: guide.sections.map(
                    section => ({
                        ...section, guideId:
                            section.guide_id,
                        canFinishGuide: section.can_finish_guide,
                        binary: section.binary,
                        questions: section.questions.map(
                            question => ({
                                ...question,
                                sectionId: question.section_id,
                                type: question?.type === 'gradable' ? 'gradable' : 'nongradable',
                                qualificationId: question.qualification_id || null,
                                qualification: question.qualification ? {
                                    id: question.qualification.id,
                                    name: question.qualification.name,
                                    alwaysOp: question.qualification.always_op,
                                    almostAlwyasOp: question.qualification.almost_alwyas_op,
                                    sometimesOp: question.qualification.sometimes_op,
                                    almostNeverOp: question.qualification.almost_never_op,
                                    neverOp: question.qualification.never_op,
                                } : undefined
                            }))
                    }))
            }
        } catch (error) {
            return error as string;
        }
    }


}