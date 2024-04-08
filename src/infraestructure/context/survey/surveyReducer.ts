import { Survey, Pagination, GuideUserSurvey, GuideSurveyUserDetail } from '../../../domain/models';
import { type SurveyState } from './';

export type SurveyActionType =
    | { type: 'SURVEY - Get all surveys', payload: Pagination }
    | { type: 'SURVEY - Get show surveys', payload: Survey }
    | { type: 'SURVEY - Get survey guide detail', payload: Array<GuideUserSurvey> }
    | { type: 'SURVEY - Start new survey', payload: Survey }
    | { type: 'SURVEY - Exist available survey', payload: boolean }
    | { type: 'SURVEY - Clear cache for available survey' }
    | { type: 'SURVEY - Get survey details', payload: Array<any> }
    | { type: 'SURVEY - Get total users', payload: number }
    | { type: 'SURVEY - Get survey user detail', payload: GuideSurveyUserDetail }
    | { type: 'SURVEY - End survey', payload: string }

export const surveyReducer = (state: SurveyState, action: SurveyActionType) => {

    switch (action.type) {

        case 'SURVEY - Get all surveys':
            return {
                ...state,
                surveys: action.payload
            }

        case 'SURVEY - Get show surveys':
            return {
                ...state,
                survey: action.payload,
            }

        case 'SURVEY - Get survey guide detail':
            return {
                ...state,
                guideUserSurvey: action.payload,
            }

        case 'SURVEY - Exist available survey':
            return {
                ...state,
                hasSurvey: action.payload,
            }

        case 'SURVEY - Clear cache for available survey':
            return {
                ...state,
                hasSurvey: null
            }

        case 'SURVEY - Get survey details':
            return {
                ...state,
                surveyUser: action.payload,
                totalUsersInSurvey: state.totalUsersInSurvey > 0 ? state.totalUsersInSurvey : action.payload.length,
            }

        case 'SURVEY - Get total users':
            return {
                ...state,
                users: action.payload
            }


        case 'SURVEY - Get survey user detail':
            return {
                ...state,
                userDetail: action.payload,
            }

        case 'SURVEY - End survey':
            return {
                ...state,
                // surveys: state.surveys.map((survey) => survey.id === action.payload ? { ...survey, status: survey.status = !survey.status }: survey)
            }

        default:
            return state

    }

}
