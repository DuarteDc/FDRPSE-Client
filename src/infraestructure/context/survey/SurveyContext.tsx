import { Dispatch, createContext } from 'react';
import { SurveyActionType, SurveyState } from '.';

interface ContextProps extends SurveyState {
    dispatch: Dispatch<SurveyActionType>
}

export const SurveyContext = createContext({} as ContextProps);