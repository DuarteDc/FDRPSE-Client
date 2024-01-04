import { Dispatch, createContext } from 'react';
import { DimensionActionType, DimensionState } from './';

interface ContextProps extends DimensionState {
    dispatch : Dispatch<DimensionActionType>
}

export const DimensionContext = createContext({} as ContextProps);