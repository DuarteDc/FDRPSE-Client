import { ReactNode, useReducer } from 'react';
import { QuestionContext, questionReducer } from './';
import { Question } from '../../../domain/models';
import { QuestionsBySection } from '../../http/dto/questions/QuestionsBySectionResponse';
import { CommonQualificationItem } from '../../http/dto/questions/CreateQuestionDto';
export interface QuestionDetail extends Question {

}

interface QualificationBy {

}
export interface QuestionState {
    questions: Array<Question> | [];
    question: QuestionDetail | null;
    sectionQuestions: QuestionsBySection | null,
    totalQuestions: number | null;
    currentPage: number | null;
    qualifications: { [key: string]: CommonQualificationItem } | null;
}
interface Props {
    children: ReactNode;
}

const QUESTION_INITIAL_STATE: QuestionState = {
    questions: [],
    question: null,
    sectionQuestions: null,
    totalQuestions: null,
    currentPage: null,
    qualifications: null,
}

export const QuestionProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(questionReducer, QUESTION_INITIAL_STATE);

    return (
        <QuestionContext.Provider value={{ ...state, dispatch }}>
            {children}
        </QuestionContext.Provider>
    )
}
