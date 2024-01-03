import { Dispatch, createContext } from 'react';
import { DomainActionType, DomainState } from './';

interface ContextProps extends DomainState {
    dispatch: Dispatch<DomainActionType>
 }

export const DomainContext = createContext({} as ContextProps);