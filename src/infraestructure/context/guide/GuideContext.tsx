import { createContext, Dispatch } from 'react';
import { GuideState, GuideActionType } from './';

interface ContextProps extends GuideState {
    dispatch: Dispatch<GuideActionType>
}

export const GuideContext = createContext({} as ContextProps);