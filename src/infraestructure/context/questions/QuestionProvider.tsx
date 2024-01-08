import { ReactNode, useReducer } from 'react';
import { QuestionContext, questionReducer } from './';
import { Category, Dimension, Domain, Question } from '../../../domain/models';

export interface QuestionDetail extends Question{
    category    ?: Category;
    domain      ?: Domain | undefined;
    dimension   ?: Dimension | undefined;
}
export interface QuestionState {
    questions   : Array<Question> | [];
    question    : QuestionDetail | null;
}
interface Props {
    children: ReactNode;
}

const QUESTION_INITIAL_STATE: QuestionState = {
    questions   : [],
    question    : null,
}

export const QuestionProvider = ({ children }: Props) => {

    const [ state, dispatch ] = useReducer(questionReducer, QUESTION_INITIAL_STATE);

    return (
        <QuestionContext.Provider value={{ ...state, dispatch }}>
            { children }
        </QuestionContext.Provider>
    )
}
