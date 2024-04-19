import { Guide, GuideDetail, GuideUser } from '../../../domain/models';
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
    | { type: 'GUIDE - Update guide status', payload: { id: number, status: number } }
    | { type: 'GUIDE - show guide detail', payload: GuideDetail }
    | { type: 'GUIDE - Clear cache detail', payload: null }
    | { type: 'GUIDE - Clear cache guide', payload: null }

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
            return state?.guidesSelected?.length > 0 ? {
                ...state,
                guides: payload.filter(guide => guide.id !== state.guidesSelected.find(currGuide => currGuide.id === guide.id)?.id),
            } :
                {
                    ...state,
                    guides: payload,
                }

        case 'GUIDE - Presave name and type':
            return {
                ...state,
                guide: { ...payload, id: new Date().getTime(), createdAt: new Date(), updatedAt: new Date(), status: 0 },
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

        case 'GUIDE - Update guide status':
            return {
                ...state,
                guides: state.guides?.filter(guide => guide.id !== payload.id),
            }

        case 'GUIDE - Clear selecte guides':
            return {
                ...state,
                guidesSelected: [],
            }


        case 'GUIDE - show guide detail':
            return {
                ...state,
                detail: payload
            }


        case 'GUIDE - Clear cache detail':
            return {
                ...state,
                detail: null,
            }

        case 'GUIDE - Clear cache guide':
            return {
                ...state,
                guide: null
            }

        default:
            return state;
    }

}
