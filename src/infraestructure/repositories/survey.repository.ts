import { Survey } from "../../domain/models";
import { SurveysPagination } from "../context/survey";
import { SurveysResponseDto } from "../http/dto/surveys";
import { http } from "../http/http";

export const surveyRepository = {
    startGetSurveys: async (): Promise<SurveysPagination | string> => {
        try {
            const { data, current_page, next_page_url, prev_page_url } = await http.get<SurveysResponseDto>('/surveys');
            return {
                surveys: data.map(({ id, start_date, end_date, status, created_at, updated_at }) => new Survey(id, start_date, end_date = "", status, created_at, updated_at)),
                currentPage: current_page,
                nextPageUrl: next_page_url, 
                prevPageUrl: prev_page_url,
            }
        } catch (error) {
            return error as string;
        }
    }
}