import { QuestionDetail, QuestionState } from './';
import { Question } from '../../../domain/models';


export type QuestionActionType =
    | { type: 'QUESTION - Load questions', payload: Array<Question> }
    | {
        type: 'QUESTION - Presave question', payload: QuestionDetail
    }

export const questionReducer = (state: QuestionState, action: QuestionActionType) => {
    switch (action.type) {
        case 'QUESTION - Load questions':
            return {
                ...state,
                questions: action.payload,
            }

        case 'QUESTION - Presave question':{
            return {
                ...state,
                question: action.payload
            }
        }

        default:
            return state;
    }
}
