import { Survey } from '../../../domain/models';
import { type SurveyState } from './';

export type SurveyActionType =
    | { type: 'SURVEY - Get all surveys', payload: Array<Survey> }


export const surveyReducer = (state: SurveyState, action: SurveyActionType) => {

    switch (action.type) {
        case 'SURVEY - Get all surveys':
            return {
                ...state,
                surveys: action.payload
            }
    }

}
