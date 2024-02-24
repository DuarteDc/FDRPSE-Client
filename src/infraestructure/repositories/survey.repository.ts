import { http } from '../http/http';
import { errorAlert, succesAlert } from '../alert/alerts';

import { Area, Survey, SurveyUser } from '../../domain/models';
import { SurveysPagination } from '../context/survey';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { GetAreasDto, GetOneSurveyResponseDto, GetOneSurveyUserResponseDto, StartNewSurveyResponseDto, SurveysResponseDto, TotalUsersResponseDto } from '../http/dto/surveys';

export const surveyRepository = {
    startGetSurveys: async (): Promise<SurveysPagination | string> => {
        try {
            const { data, current_page, next_page_url, prev_page_url } = await http.get<SurveysResponseDto>('/auth/surveys');
            return {
                surveys: data.map(({ id, start_date, end_date, status, created_at, updated_at }) => new Survey(id, start_date, end_date || '', status, created_at, updated_at)),
                currentPage: current_page,
                nextPageUrl: next_page_url,
                prevPageUrl: prev_page_url,
            }
        } catch (error) {
            return error as string;
        }
    },

    startNewSurvey: async (): Promise<Survey | string> => {
        try {
            const { survey, message } = await http.post<StartNewSurveyResponseDto>('/auth/surveys/start', {});
            succesAlert(message);
            return new Survey(survey.id, survey.start_date, survey.end_date || '', survey.status, survey.created_at, survey.updated_at);
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
            const { areas } = await http.get<GetAreasDto>(`/auth/areas`);
            return areas.map(({ id, nombreArea }) => new Area(id, nombreArea));
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

    getUserDetail: async (surveyId: string, userId: string): Promise<SurveyUser | string> => {
        try {
            const { survey_user } = await http.get<GetOneSurveyUserResponseDto>(`/auth/surveys/details/${surveyId}/${userId}`);
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
            return { success: true, message: '|'};
        } catch (error) {
            // errorAlert(error as string);
            console.log(error)
            return { success: false, message: error as string };
        }
    }
}