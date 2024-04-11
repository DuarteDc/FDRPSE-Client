import { http } from '../http/http';
import { errorAlert, succesAlert } from '../alert/alerts';

import { Survey, Pagination, GuideUserSurvey, Area, GuideSurveyUserDetail, StatusGuide, ChangeStatusGuide, FinalizeGuideAndStartNextGuide } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { FinalizeCurrentGuideResponseDto, GuideUserSurveyResponseDto, StartNewSurveyDto, StartNewSurveyResonseDto, SurveyResponseDto, SurveysPaginationResponseDto, TotalUsersResponseDto } from '../http/dto/surveys';
import { AreasResponseDto } from '../http/dto/areas';
import { GuideSurveyUserDetailDto, OneGuideResponseDto } from '../http/dto/guide';

export const surveyRepository = {
    startGetSurveys: async (page = 1): Promise<Pagination | string> => {
        try {
            const { data, per_page, total } = await http.get<SurveysPaginationResponseDto>(`/auth/surveys?page=${page}`);
            return {
                perPage: per_page,
                total: total,
                surveys: data.map(({ start_date, created_at, updated_at, ...rest }) =>
                    ({ startDate: new Date(start_date), endDate: rest.end_date, createdAt: new Date(created_at), updatedAt: new Date(updated_at), ...rest })),
            }

        } catch (error) {
            return error as string;
        }
    },

    showSurvey: async (surveyId: string): Promise<Survey | string> => {
        try {
            const { survey } = await http.get<SurveyResponseDto>(`/auth/surveys/show/${surveyId}`);
            return {
                ...survey,
                startDate: new Date(survey.start_date),
                endDate: survey.end_date ? new Date(survey.end_date) : null,
                createdAt: new Date(survey.created_at),
                updatedAt: new Date(survey.updated_at),
                guides: survey.guides.map(({ created_at, updated_at, survey_id, status, ...rest }) =>
                    ({ surveyId: survey_id, createdAt: new Date(created_at), updatedAt: new Date(updated_at), status: rest.pivot.status, ...rest })),
            }

        } catch (error) {
            return error as string;
        }
    },

    startNewSurvey: async (startNewSurveyDto: StartNewSurveyDto): Promise<Survey | string> => {
        try {
            const { survey, message } = await http.post<StartNewSurveyResonseDto>('/auth/surveys/start', startNewSurveyDto);
            succesAlert(message);
            return {
                id: survey.id,
                startDate: new Date(survey.start_date),
                createdAt: new Date(survey.created_at),
                updatedAt: new Date(survey.updated_at),
                status: survey.status,
                total: survey.total,
                endDate: survey?.end_date && new Date(survey.end_date),
            }
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },

    startSurveyByUser: async (): Promise<CommonResponseDto> => {
        try {
            return await http.post<CommonResponseDto>('/auth/surveys/start-user', {});
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

    endSurveyByUser: async (): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/auth/surveys/end-user', {});
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            return { message: error as string, success: false }
        }
    },

    searchInGuideSurveyUserDetail: async (surveyId: string, guideId: string, name = '', areaId = '', subareaId = ''): Promise<Array<GuideUserSurvey> | string> => {
        try {
            const { survey } = await http.get<GuideUserSurveyResponseDto>(`/auth/surveys/${surveyId}/guide/${guideId}/find-by?name=${name}&area=${areaId}&subarea=${subareaId}`);
            return survey.map((guide) => ({
                ...guide,
                createdAt: new Date(guide.created_at),
                updatedAt: new Date(guide.updated_at),
                userId: guide.user_id,
                guideId: guide.guide_id,
                surveyId: guide.survey_id,
                user: {
                    id: guide.user.id,
                    name: guide.user.nombre,
                    lastName: `${guide.user.apellidoP} ${guide.user.apellidoM}`,
                    area: {
                        id: guide.user.area.id,
                        name: guide.user.area.nombreArea,
                    }
                }
            }));
        } catch (error) {
            return error as string;
        }
    },

    getAreas: async (): Promise<Array<Area> | string> => {
        try {
            const { areas } = await http.get<AreasResponseDto>(`/auth/areas`);
            return areas.map(({ id, nombreArea, area_nivel, area_padre, users_count, }) => ({
                id,
                level: area_nivel,
                pather: area_padre,
                usersCount: users_count,
                name: nombreArea,
            }))
        } catch (error) {
            return error as string;
        }
    },

    getTotalUsers: async (): Promise<number | string> => {
        try {
            const { users } = await http.get<TotalUsersResponseDto>(`/auth/surveys/total-users`);
            return users;
        } catch (error) {
            return error as string;
        }
    },

    getUserDetail: async (surveyId: string, userId: string, guideId: string): Promise<GuideSurveyUserDetail | string> => {
        try {
            const { guide_user } = await http.get<GuideSurveyUserDetailDto>(`/auth/surveys/details/${surveyId}/${guideId}/${userId}`);

            return {
                ...guide_user,
                userId: guide_user.user_id,
                user: {
                    name: guide_user.user.nombre,
                    lastName: `${guide_user.user.apellidoP} ${guide_user.user.apellidoM}`,
                    areaId: guide_user.user.id_area,
                    area: {
                        id: guide_user.user.area.id,
                        name: guide_user.user.area.nombreArea,
                    },
                    id: guide_user.user.id,
                },
                answers: guide_user.answers.map((answer) => ({
                    ...answer,
                    questionId: answer.question_id,
                    name: answer.name,
                    category: {
                        ...answer.category,
                        qualification: {
                            ...answer.category?.qualification,
                            veryHigh: answer?.category?.qualification?.very_high,
                        }
                    },
                    domain: {
                        ...answer.domain,
                        qualification: {
                            ...answer.domain?.qualification,
                            veryHigh: answer?.domain?.qualification?.very_high,
                        }
                    },
                    qualificationData: {
                        alwaysOp: answer?.qualification_data?.always_op,
                        almostAlwyasOp: answer?.qualification_data?.almost_alwyas_op,
                        sometimesOp: answer?.qualification_data?.sometimes_op,
                        almostNeverOp: answer?.qualification_data?.almost_never_op,
                        neverOp: answer?.qualification_data?.never_op,
                    }
                }))
            }
        } catch (error) {
            return error as string;
        }
    },

    finalizeSurvey: async (surveyId: string): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>(`/auth/surveys/end/${surveyId}`, {});
            succesAlert(message);
            return { success: true, message };
        } catch (error) {
            errorAlert(error as string);
            return { success: false, message: error as string };
        }
    },

    changeSurveyGuideStatus: async (surveyId: string, guideId: string, status: StatusGuide.inProgress | StatusGuide.paused): Promise<ChangeStatusGuide | string> => {
        try {
            const { guide } = await http.patch<OneGuideResponseDto>(`/auth/surveys/${surveyId}/guide/${guideId}/change-status?status=${status}`, {});
            succesAlert('La guía se actualizo correctamente');
            return {
                guide: {
                    id: guide.id,
                    status: guide.surveys[0].pivot.status,
                }
            };
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },


    finalizeGuideSurveyAndStartNextGuide: async (surveyId: string, guideId: string): Promise<FinalizeGuideAndStartNextGuide | string> => {
        try {
            const { current_guide, next_guide } = await http.patch<FinalizeCurrentGuideResponseDto>(`/auth/surveys/${surveyId}/guide/${guideId}/finalized`, {});
            succesAlert('La guía se actualizo correctamente');
            return {
                currentGuide: {
                    id: current_guide.guide_id,
                    status: current_guide.status,
                },
                nextGuide: (next_guide) ? {
                    id: next_guide.guide_id,
                    status: next_guide?.status,
                } : null,
            }
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    },

    downloadSurveyUserResume: async (): Promise<CommonResponseDto> => {
        try {
            await http.download(`/auth/surveys/report`);
            return { success: true, message: '|' };
        } catch (error) {
            // errorAlert(error as string);
            console.log(error)
            return { success: false, message: error as string };
        }
    }
}