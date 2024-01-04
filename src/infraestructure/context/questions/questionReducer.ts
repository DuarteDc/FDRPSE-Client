import { Question } from '../../../domain/models';


export type QuestionActionType =
    | { type: 'QUESTION - Load questions', payload: Array<Question> }

export const questionReducer = (state: any, action: QuestionActionType) => {
    switch (action.type) {
        case 'QUESTION - Load questions':
            return {
                ...state,
                questions: action.payload,
            }
    }
}
