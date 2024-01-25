import { QualificationState } from '.';
import { Qualification } from '../../../domain/models';


export type QualificationActionType =
    | { type: 'QUALIFICATION - Load qualificatios', payload: Array<Qualification> }
    | { type: 'QUALIFICATION - Set qualification', payload: string }

export const qualificationReducer = (state: QualificationState, action: QualificationActionType) => {

    switch (action.type) {

        case 'QUALIFICATION - Load qualificatios':
            return {
                ...state,
                qualifications: action.payload,
            }

        case 'QUALIFICATION - Set qualification':
            return {
                ...state,
                qualification: state.qualifications.find(qualification => qualification.id === action.payload)!,
            }

    }
}

