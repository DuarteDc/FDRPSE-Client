import { DimensionState } from '.';
import { Dimension } from '../../../domain/models';

export type DimensionActionType =
    | { type: 'DIMENSION - Load dimensions', payload: Array<Dimension> }

export const dimensionReducer = (state: DimensionState, action: DimensionActionType) => {
    switch (action.type) {
        case 'DIMENSION - Load dimensions':
            return {
                ...state,
                dimensions: action.payload,
            }

        default:
            return state;
    }
}
