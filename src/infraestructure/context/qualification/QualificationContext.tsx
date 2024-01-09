import { Dispatch, createContext } from 'react';
import { QualificationActionType, QualificationState } from './';

interface ContextProps extends QualificationState {
    dispatch: Dispatch<QualificationActionType>
}

export const QualificationContext = createContext({} as ContextProps);