import { http } from '../http/http';
import { errorAlert, succesAlert } from '../alert/alerts';

import { Survey, SurveyUser } from '../../domain/models';
import { SurveysPagination } from '../context/survey';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { GetOneSurveyResponseDto, SurveysResponseDto } from '../http/dto/surveys';

export const surveyRepository = {
    startGetSurveys: async (): Promise<SurveysPagination | string> => {
        try {
            const { data, current_page, next_page_url, prev_page_url } = await http.get<SurveysResponseDto>('/surveys');
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

    startSurveyByUser: async (): Promise<CommonResponseDto> => {
        try {
            return await http.post<CommonResponseDto>('/surveys/start-user', {});
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

    endSurveyByUser: async (): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/surveys/end-user', {});
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            return { message: error as string, success: false }
        }
    },

    existAvailableSurvey: async (): Promise<boolean> => {
        try {
            const { survey } = await http.get<GetOneSurveyResponseDto>('/surveys/current');
            return survey ? true : false;
        } catch (error) {
            return false;
        }
    },

    getSurvey: async (surveyId: string): Promise<Array<SurveyUser> | string> => {
        try {
            const { survey } = await http.get<GetOneSurveyResponseDto>(`/surveys/${surveyId}`);
            return survey.map(({ user_id, total, answers, user }) => {
                const answer = answers.map((currentAnswer) => ({ questionId: Number(currentAnswer.question_id), ...currentAnswer }));
                return new SurveyUser(user_id, answer, total, { ...user, area: { id: user.area.id, name: user.area.nombreArea } });
            });
        } catch (error) {
            return error as string;
        }
    }
}