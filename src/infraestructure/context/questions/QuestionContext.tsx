import { Dispatch, createContext } from 'react';
import { QuestionActionType, QuestionState } from './';
import { CreateQuestionDto } from '../../http/dto/questions';

interface ContextProps extends QuestionState {
    dispatch: Dispatch<QuestionActionType>;
    preSaveQuestion: (createQuestionDto: CreateQuestionDto) => void;
}

export const QuestionContext = createContext({} as ContextProps);