import { AreaState, type DATETIME } from './'
import { Area } from '../../../domain/models'

export type AreaActionType =
    | { type: 'AREA - Get areas', payload: Array<Area> }
    | { type: 'AREA - Get area', payload: Area }
    | { type: 'AREA - Set Datetime', payload: DATETIME }
    | { type: 'AREA - Change StartDateTime', payload: Date }
    | { type: 'AREA - Change EndDateTime', payload: Date }


export const areaReducer = (state: AreaState, action: AreaActionType) => {

    switch (action.type) {

        case 'AREA - Get areas':
            return {
                ...state,
                areas: action.payload,
            }

        case 'AREA - Get area':
            return {
                ...state,
                area: action.payload,
            }

        case 'AREA - Set Datetime':
            return {
                ...state,
                datetime: action.payload
            }

        case 'AREA - Change StartDateTime':
            return {
                ...state,
                datetime: {
                    ...state.datetime,
                    startDate: action.payload
                }
            }

        case 'AREA - Change EndDateTime':
            return {
                ...state,
                datetime: {
                    ...state.datetime,
                    endDate: action.payload
                }
            }
        default:
            return state;
    }

}
