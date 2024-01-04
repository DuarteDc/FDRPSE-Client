import { ReactNode, useReducer } from 'react';
import { DimensionContext, dimensionReducer } from './';
import { Dimension } from '../../../domain/models';

export interface DimensionState {
    dimension   : Dimension | null;
    dimensions  : Array<Dimension> | []
}

interface Props {
    children: ReactNode;
}
const DIMENSION_INITIAL_STATE: DimensionState = {
    dimension  : null,
    dimensions : [],
}
export const DimensionProvider = ({ children }: Props) => {

    const [ state, dispatch ] = useReducer(dimensionReducer, DIMENSION_INITIAL_STATE);

    return (
        <DimensionContext.Provider value={{ ...state, dispatch }}>
            { children }
        </DimensionContext.Provider>    
    )
}
