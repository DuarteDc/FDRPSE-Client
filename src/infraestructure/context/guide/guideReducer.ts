import { Guide, GuideUser, } from '../../../domain/models';
import { GuideState } from './';

export type GuideActionType =
    | { type: 'GUIDE - Load Guide', payload: Guide }
    | { type: 'GUIDE - Load Guides by query params', payload: Array<Guide> }
    | { type: 'GUIDE - Presave name and type', payload: { name: string, gradable: boolean } }
    | { type: 'GUIDE - Set qualification', payload: any }
    | { type: 'GUIDE - set guideUser', payload: GuideUser }
    | { type: 'GUIDE - set has Guide', payload: boolean }
    | { type: 'GUIDE - Add guide to survey', payload: Guide }
    | { type: 'GUIDE - Delete guide to survey', payload: Guide }
    | { type: 'GUIDE - Clear selecte guides', payload: any }

export const guideReducer = (state: GuideState, { type, payload }: GuideActionType) => {
    switch (type) {
        case 'GUIDE - Load Guide':
            {
                return {
                    ...state,
                    guide: payload,
                }
            }

        case 'GUIDE - Load Guides by query params':
            return {
                ...state,
                guides: payload
            }

        case 'GUIDE - Presave name and type':
            return {
                ...state,
                guide: { ...payload, id: crypto.randomUUID() },
            }

        case 'GUIDE - Set qualification':
            return {
                ...state,
                qualifications: payload,
            }

        case 'GUIDE - set guideUser':
            return {
                ...state,
                guideUser: payload,
                hasGuide: payload.status ? false : true,
            }

        case 'GUIDE - set has Guide':
            return {
                ...state,
                hasGuide: false,
            }


        case 'GUIDE - Add guide to survey':
            return {
                ...state,
                guidesSelected: [...state.guidesSelected, payload],
                guides: state.guides.filter(guide => guide.id !== payload.id)
            }

        case 'GUIDE - Delete guide to survey': {
            const existGuide = state.guidesSelected.find(guide => guide.id === payload.id);
            return existGuide ?
                {
                    ...state,
                    guidesSelected: state.guidesSelected.filter(guide => guide.id !== payload.id),
                    guides: [...state.guides, payload]
                } : {
                    ...state
                }
        }


        case 'GUIDE - Clear selecte guides':
            return {
                ...state,
                guidesSelected: [],
            }

        default:
            return state;
    }

}
