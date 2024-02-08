import { Section } from '../../../domain/models';
import { SectionState } from './';

export type SectionActionType =
    | { type: 'SECTION - Start load section', payload: Section }
    | { type: 'SECTION - Start load sections', payload: Array<Section> }
    | { type: 'SECTION - Create new section', payload: Section }

export const sectionReducer = (state: SectionState, action: SectionActionType) => {

    switch (action.type) {
        case 'SECTION - Start load section':
            return {
                ...state,
                section: action.payload,
            }

        case 'SECTION - Start load sections':
            return {
                ...state,
                sections: action.payload
            }

        case 'SECTION - Create new section':
            return {
                ...state,
                sections: [action.payload, ...state.sections],
            }

        default:
            return state;
    }

}
