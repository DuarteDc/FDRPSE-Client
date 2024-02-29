import { AreaState, type DATETIME } from './'
import { Area } from '../../../domain/models'

export type AreaActionType =
    | { type: 'AREA - Get areas', payload: Array<Area> }
    | { type: 'AREA - Get area', payload: Area }
    | { type: 'AREA - Set Datetime', payload: DATETIME }
    | { type: 'AREA - Change StartDateTime', payload: Date }
    | { type: 'AREA - Change EndDateTime', payload: Date }
    | { type: 'AREA - Add Multiple Areas', payload: Array<string> }
    | { type: 'AREA - Add Area', payload: Area }
    | { type: 'AREA - Delete Area', payload: Area }
    | { type: 'AREA - Select All Areas' }
    | { type: 'AREA - Set Current Areas', payload: Array<Area> }
    | { type: 'AREA - Set Datetime to areas', payload: { datetime: DATETIME, areas: Array<Area> } }


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

        case 'AREA - Add Multiple Areas':
            return {
                ...state,
                // areasWithDatetime: [...state.areasWithDatetime, state.areas.filter(({ id }) => id === action.payload.find(areaId => areaId === id))],
                // areas: state.areas.map((area) => area.id !== action.payload.find(areaId => areaId === area.id))
            }

        case 'AREA - Add Area':
            return {
                ...state,
                areas: state.areas.filter(({ id }) => id !== action.payload.id),
                areasWithDatetime: [...state.areasWithDatetime, action.payload],
            }


        case 'AREA - Delete Area':
            return {
                ...state,
                areas: [action.payload, ...state.areas],
                areasWithDatetime: state.areasWithDatetime.filter(({ id }) => id !== action.payload.id),
            }

        case 'AREA - Select All Areas':
            return {
                ...state,
                areasWithDatetime: [...state.areasWithDatetime, ...state.areas],
                selectedAreas: state.areas,
                areas: [],
            }

        case 'AREA - Set Current Areas':
            return {
                ...state,
                selectedAreas: action.payload
            }


        case 'AREA - Set Datetime to areas':
            return {
                ...state,
                areasWithDatetime: state.areasWithDatetime
                    .map((area) => (area.id == action.payload.areas.find(a => a.id === area.id)?.id) ?
                        { ...action.payload.areas.find(a => a.id === area.id), startDate: action.payload.datetime.startDate, endDate: action.payload.datetime.endDate } : area),
                selectedAreas: []
            }

        default:
            return state;
    }

}
