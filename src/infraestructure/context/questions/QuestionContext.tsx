import { Dispatch, createContext } from 'react';
import { QuestionActionType, QuestionState } from './';

interface ContextProps extends QuestionState {
    dispatch: Dispatch<QuestionActionType>;
}

export const QuestionContext = createContext({} as ContextProps);