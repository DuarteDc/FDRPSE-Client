import { ReactNode, useReducer } from 'react';
import { AreaContext, areaReducer } from './';
import { Area } from '../../../domain/models';


interface Props {
    children: ReactNode | Array<ReactNode>
}
export interface DATETIME {
    startDate : Date | null,
    endDate   : Date | null,
}

export interface AreaState {
    area                : Area | null;
    areas               : Array<Area> | [];
    datetime            : DATETIME;
    areasWithDatetime   : Array<Area> | [];
    areaWithDatetime    : Area | null;
}

const INITIAL_STATE: AreaState = {
    area                : null,
    areas               : [],
    areasWithDatetime   : [],
    areaWithDatetime    : null,
    datetime: {
        startDate : null,
        endDate   : null
    },
}

export const AreaProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(areaReducer, INITIAL_STATE);

    return (
        <AreaContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AreaContext.Provider>

    )



}
