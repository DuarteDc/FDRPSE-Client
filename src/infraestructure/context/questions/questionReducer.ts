import { QuestionDetail, QuestionState } from './';
import type { Qualification, Question, Section } from '../../../domain/models';
import type { QuestionsBySectionResponse } from '../../http/dto/questions';
import { CommonQualificationItem } from '../../http/dto/questions/CreateQuestionDto';

export type QuestionActionType =
    | { type: 'QUESTION - Load questions', payload: Array<Question> }
    | { type: 'QUESTION - Load question', payload: QuestionDetail }
    | { type: 'QUESTION - Presave question', payload: { question: QuestionDetail, qualifications: { [key: string]: CommonQualificationItem | undefined } } }
    | { type: 'QUESTION - Set qualification before save', payload: Qualification }
    | { type: 'QUESTION - Set section before save', payload: Section }
    | { type: 'QUESTION - Get Question to user', payload: QuestionsBySectionResponse }
    | { type: 'QUESTION - Clear Question Cache' }
    | { type: 'QUESTION - Clear new Question Cache' }

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
        case 'QUESTION - Presave question': {
            console.log(action.payload);
            return {
                ...state,
                qualifications: action.payload.qualifications,
                question: action.payload.question,

            }
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

        case 'QUESTION - Get Question to user':
            return {
                ...state,
                sectionQuestions: action.payload.section,
                totalQuestions: action.payload.total_pages,
                currentPage: action.payload.current_page
            }


        case 'QUESTION - Clear Question Cache':
            return {
                ...state,
                sectionQuestions: null
            }


        case 'QUESTION - Clear new Question Cache':
            return {
                ...state,
                question: null,
            }
        default:
            return state;
    }
}
