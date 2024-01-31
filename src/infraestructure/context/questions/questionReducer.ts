import { QuestionDetail, QuestionState } from './';
import type { Qualification, Question, Section } from '../../../domain/models';

export type QuestionActionType =
    | { type: 'QUESTION - Load questions', payload: Array<Question> }
    | { type: 'QUESTION - Load question', payload: QuestionDetail }
    | { type: 'QUESTION - Presave question', payload: QuestionDetail }
    | { type: 'QUESTION - Set qualification before save', payload: Qualification }
    | { type: 'QUESTION - Set section before save', payload: Section }

export const questionReducer = (state: QuestionState, action: QuestionActionType) => {
    switch (action.type) {
        case 'QUESTION - Load questions':
            return {
                ...state,
                questions: action.payload,
            }

        case 'QUESTION - Load question':
            return {
                ...state,
                question: action.payload,
            }
        case 'QUESTION - Presave question':
            return {
                ...state,
                question: action.payload
            }


        case 'QUESTION - Set qualification before save': {
            return {
                ...state,
                question: { ...state.question!, qualification: action.payload }
            }
        }
        case 'QUESTION - Set section before save':
            return {
                ...state,
                question: { ...state.question!, section: action.payload }
            }

        default:
            return state;
    }
}
