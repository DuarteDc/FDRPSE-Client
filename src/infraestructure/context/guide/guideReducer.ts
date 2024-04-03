import { Guide, GuideQualifications } from '../../../domain/models';
import { type GudieState } from './';

export type GuideActionType =
    | { type: 'GUIDE - Load Guide', payload: Guide }
    | { type: 'GUIDE - Load Guides by query params', payload: Array<Guide> }
    | { type: 'GUIDE - Presave name and type', payload: { name: string, gradable: boolean } }
    | { type: 'GUIDE - Set qualification', payload: GuideQualifications }

export const guideReducer = (state: GudieState, { type, payload }: GuideActionType) => {
    switch (type) {

        case 'GUIDE - Load Guide':
            return {
                ...state,
                guide: payload,
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

        default:
            return state;
    }

}
