import { Guide } from '../../../domain/models';
import { type GudieState } from './';

export type GuideActionType =
    | { type: 'GUIDE - Load Guide', payload: Guide }
    | { type: 'GUIDE - Presave name and type', payload: { name: string, gradable: boolean } }

export const guideReducer = (state: GudieState, { type, payload }: GuideActionType) => {
    switch (type) {

        case 'GUIDE - Load Guide':
            return {
                ...state,
                guide: payload,
            }


        case 'GUIDE - Presave name and type':
            return {
                ...state,
                guide: {...payload, id: Date.now() },
            }
        default:
            return state;
    }

}
