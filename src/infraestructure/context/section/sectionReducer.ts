import { Section, SectionQuesions } from '../../../domain/models';
import { SectionState } from './';

export type SectionActionType =
    | { type: 'SECTION - Start load section', payload: SectionQuesions }
    | { type: 'SECTION - Start load sections', payload: Array<Section> }
    | { type: 'SECTION - Create new section', payload: Section }
    | { type: 'SECTION - Add section to guide', payload: Section }
    | { type: 'SECTION - Delete section to guide', payload: Section }
    | { type: 'SECTION - Start load sections with questions', payload: Array<SectionQuesions> }
    | { type: 'SECTION - Get current section', payload: SectionQuesions }

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


        case 'SECTION - Add section to guide':
            return {
                ...state,
                sectionsSelected: [...state.sectionsSelected, action.payload],
                sections: state.sections.filter(section => section.id !== action.payload.id)
            }

        case 'SECTION - Delete section to guide': {
            const existSection = state.sectionsSelected.find(section => section.id === action.payload.id);
            return existSection ?
                {
                    ...state,
                    sectionsSelected: state.sectionsSelected.filter(section => section.id !== action.payload.id),
                    sections: [...state.sections, action.payload]
                } : {
                    ...state
                }
        }

        case 'SECTION - Start load sections with questions':
            return {
                ...state,
                sections: action.payload
            }

        case 'SECTION - Get current section':
            return {
                ...state,
                section: state.sections.find(section => section.id === action.payload.id),
            }


        default:
            return state;
    }

}
