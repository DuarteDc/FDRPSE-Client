import { Dispatch, createContext } from 'react';
import { type SectionActionType, type SectionState } from './';

interface ContextProps extends SectionState { 
    dispatch : Dispatch<SectionActionType>
}

export const SectionContext = createContext({} as ContextProps);