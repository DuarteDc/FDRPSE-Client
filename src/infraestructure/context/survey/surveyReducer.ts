import { Survey, SurveyUser } from '../../../domain/models';
import { type SurveyState } from './';

export type SurveyActionType =
    | { type: 'SURVEY - Get all surveys', payload: Array<Survey> }
    | { type: 'SURVEY - Start new survey', payload: Survey }
    | { type: 'SURVEY - Exist available survey', payload: boolean }
    | { type: 'SURVEY - Clear cache for available survey' }
    | { type: 'SURVEY - Get survey details', payload: Array<SurveyUser> }
    | { type: 'SURVEY - Get total users', payload: number }
    | { type: 'SURVEY - Get survey user detail', payload: SurveyUser }
    | { type: 'SURVEY - End survey', payload: string }

export const surveyReducer = (state: SurveyState, action: SurveyActionType) => {

    switch (action.type) {

        case 'SURVEY - Get all surveys':
            return {
                ...state,
                surveys: action.payload
            }

        case 'SURVEY - Start new survey':
            return {
                ...state,
                surveys: [action.payload, ...state.surveys]
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
                surveys: state.surveys.map((survey) => survey.id === action.payload ? { ...survey, status: survey.status = !survey.status }: survey)
            }

        default:
            return state

    }

}
