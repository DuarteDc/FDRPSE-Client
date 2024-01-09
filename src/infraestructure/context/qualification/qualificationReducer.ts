import { QualificationState } from '.';
import { Qualification } from '../../../domain/models';


export type QualificationActionType =
    | { type: 'QUALIFICATION - Load qualificatios', payload: Array<Qualification> }

export const qualificationReducer = (state: QualificationState, action: QualificationActionType) => {
    switch (action.type) {
        case 'QUALIFICATION - Load qualificatios':
            return {
                ...state,
                qualifications: action.payload,
            }
    }
}

