import { Dispatch, createContext } from 'react';
import { AreaActionType, AreaState } from './';

export interface ContextProps extends AreaState {
    dispatch: Dispatch<AreaActionType>
}

export const AreaContext = createContext({} as ContextProps);