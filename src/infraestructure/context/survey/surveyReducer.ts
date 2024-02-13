import { Survey, SurveyUser } from '../../../domain/models';
import { type SurveyState } from './';

export type SurveyActionType =
    | { type: 'SURVEY - Get all surveys', payload: Array<Survey> }
    | { type: 'SURVEY - Exist available survey', payload: boolean }
    | { type: 'SURVEY - Clear cache for available survey' }
    | { type: 'SURVEY - Get survey details', payload: Array<SurveyUser> }

export const surveyReducer = (state: SurveyState, action: SurveyActionType) => {

    switch (action.type) {

        case 'SURVEY - Get all surveys':
            return {
                ...state,
                surveys: action.payload
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
                surveyUser: action.payload
            }

        default:
            return state

    }

}
