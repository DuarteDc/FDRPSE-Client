import { DimensionState } from '.';
import { Dimension } from '../../../domain/models';

export type DimensionActionType =
    | { type: 'DIMENSION - Load dimensions', payload: Array<Dimension> }
    | { type: 'DIMENSION - Load current dimension', payload: string }
    | { type: 'DIMENSION - Update dimension', payload: Dimension }

export const dimensionReducer = (state: DimensionState, action: DimensionActionType) => {
    switch (action.type) {
        case 'DIMENSION - Load dimensions':
            return {
                ...state,
                dimensions: action.payload,
            }


        case 'DIMENSION - Load current dimension':
            return {
                ...state,
                dimension: state.dimensions.find(dimension => dimension.id === action.payload)!,
            }

        case 'DIMENSION - Update dimension':
            return {
                ...state,
                dimensions: state.dimensions.map(dimension => dimension.id === action.payload.id ? action.payload : dimension)!,
            }


        default:
            return state;
    }
}
