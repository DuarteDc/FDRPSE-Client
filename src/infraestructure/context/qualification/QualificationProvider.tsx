import { ReactNode, useReducer } from 'react';
import { Qualification } from '../../../domain/models';
import { QualificationContext, qualificationReducer } from './';


export interface QualificationState {
    qualifications: Array<Qualification> | [];
}

interface Props {
    children: ReactNode;
}

export const QUALIFICATION_INITIAL_STATE: QualificationState = {
    qualifications: [],
}

export const QualificationProvider = ({ children }: Props) => {

    const [ state, dispatch ] = useReducer(qualificationReducer, QUALIFICATION_INITIAL_STATE);

    return (
        <QualificationContext.Provider value={{ ...state, dispatch }}>
            { children }
        </QualificationContext.Provider>
    )
}
