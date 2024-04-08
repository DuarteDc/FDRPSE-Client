import { http } from '../http/http';
import { errorAlert, succesAlert } from '../alert/alerts';

import { Survey, SurveyUser, Pagination, GuideUserSurvey, Area } from '../../domain/models';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { GetOneSurveyResponseDto, GetOneSurveyUserResponseDto, GuideUserSurveyResponseDto, StartNewSurveyDto, StartNewSurveyResonseDto, SurveyResponseDto, SurveysPaginationResponseDto, TotalUsersResponseDto } from '../http/dto/surveys';
import { AreasResponseDto } from '../http/dto/areas';

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

    existAvailableSurvey: async (): Promise<boolean> => {
        try {
            const { survey } = await http.get<GetOneSurveyResponseDto>('/auth/surveys/current');
            return survey ? true : false;
        } catch (error) {
            return false;
        }
    },
    loadGuideSurveyUserDetail: async (surveyId: string, guideId: string, name = '', areaId = '', subareaId = ''): Promise<GuideUserSurvey | string> => {
        try {
            const { survey, guide } = await http.get<GuideUserSurveyResponseDto>(`/auth/surveys/${surveyId}/guide/${guideId}/find-by?name=${name}&area=${areaId}&subarea=${subareaId}`);
            return {
                guide: { createdAt: new Date(guide.created_at), updatedAt: new Date(guide.updated_at), surveyId: guide.survey_id, ...guide },
                survey: survey.map((guide) => ({
                    ...guide,
                    createdAt: new Date(guide.created_at),
                    updatedAt: new Date(guide.updated_at),
                    userId: guide.user_id,
                    guideId: guide.guide_id,
                    surveyId: guide.survey_id,
                    user: {
                        id: guide.user.id,
                        name: guide.user.nombre,
                        last_name: `${guide.user.apellidoP} ${guide.user.apellidoM}`,
                        area: {
                            id: guide.user.area.id,
                            name: guide.user.area.nombreArea,
                        }
                    }
                })),
            }
        } catch (error) {
            return error as string;
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
                        last_name: `${guide.user.apellidoP} ${guide.user.apellidoM}`,
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

    getSurvey: async (surveyId: string): Promise<Array<SurveyUser> | string> => {
        try {
            const { survey } = await http.get<GetOneSurveyResponseDto>(`/auth/surveys/${surveyId}`);
            return survey.map(({ user_id, total, user, status }) => {
                return new SurveyUser(user_id, [], total, { id: user.id, name: user.nombre, last_name: `${user.apellidoP} ${user.apellidoM}`, area: { id: user.area.id, name: user.area.nombreArea } }, status);
            });
        } catch (error) {
            return error as string;
        }
    },

    searchByNameAndArea: async (surveyId: string, name = '', area = ''): Promise<Array<SurveyUser> | string> => {
        try {
            const { survey } = await http.get<GetOneSurveyResponseDto>(`/auth/surveys/${surveyId}/find-by?name=${name}&area=${area}`);
            return survey.map(({ user_id, total, user, status, answers }) => {
                return new SurveyUser(user_id, answers, total, { id: user.id, name: user.nombre, last_name: `${user.apellidoP} ${user.apellidoM}`, area: { id: user.area.id, name: user.area.nombreArea } }, status);
            });
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

    getUserDetail: async (surveyId: string, userId: string, guideId: string): Promise<SurveyUser | string> => {
        try {
            const { survey_user } = await http.get<GetOneSurveyUserResponseDto>(`/auth/surveys/details/${surveyId}/${guideId}/${userId}`);
            return new SurveyUser(survey_user.user_id, survey_user.answers, survey_user.total, { id: survey_user.user.id, name: survey_user.user.nombre, last_name: `${survey_user.user.apellidoP} ${survey_user.user.apellidoM}`, area: { id: survey_user.user.area.id, name: survey_user.user.area.nombreArea } }, survey_user.status)
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