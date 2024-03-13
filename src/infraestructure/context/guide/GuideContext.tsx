import { createContext, Dispatch } from 'react';
import { GudieState, GuideActionType } from './';

interface ContextProps extends GudieState {
    dispatch: Dispatch<GuideActionType>
}

export const GuideContext = createContext({} as ContextProps);