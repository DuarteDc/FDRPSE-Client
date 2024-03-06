import { AreaState, type DATETIME } from './'
import { Area, AreaSubareasDepartments, Departments } from '../../../domain/models'
import { TypeAreas } from '../../../domain/models/Area'

export type AreaActionType =
    | { type: 'AREA - Get areas', payload: Array<AreaSubareasDepartments> }
    | { type: 'AREA - Get area', payload: Area }
    | { type: 'AREA - Set Datetime', payload: DATETIME }
    | { type: 'AREA - Change StartDateTime', payload: Date }
    | { type: 'AREA - Change EndDateTime', payload: Date }
    | { type: 'AREA - Add Multiple Areas', payload: { areas: Array<Area>, deleteAreas: Array<string> } }
    | { type: 'AREA - Add Area', payload: Area | AreaSubareasDepartments | Departments }
    | { type: 'AREA - Delete Area', payload: Area }
    | { type: 'AREA - Select All Areas' }
    | { type: 'AREA - Set Current Areas', payload: Array<Area | AreaSubareasDepartments> }
    | { type: 'AREA - Set Datetime to areas', payload: { datetime: DATETIME, areas: Array<Area> } }
    | { type: 'AREA - Rollback Selected Areas' }


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
                areas: state.areas.filter(({ id }) => id !== action.payload.deleteAreas.find(areaId => areaId === id)),
                areasWithDatetime: [...state.areasWithDatetime, ...action.payload.areas],
                selectedAreas: action.payload.areas,
            }

        case 'AREA - Add Area':
            {
                if (action.payload.typeArea === TypeAreas.Direction) {
                    return {
                        ...state,
                        areas: state.areas.filter(({ id }) => id != action.payload.id),
                        areasWithDatetime: [...state.areasWithDatetime, action.payload],
                    }
                }
                if (action.payload.typeArea === TypeAreas.Subdirection) {
                    return {
                        ...state,
                        areas: state.areas.map((area: any) => area.id == action.payload.parentArea ?
                            {
                                ...area, subdirections: area?.subdirections.filter((subdirection: Departments) => subdirection.id != action.payload.id)
                            } : area),
                        areasWithDatetime: [...state.areasWithDatetime, action.payload],
                    }
                }

                const parent = state.areas.find((area: any) => area?.subdirections.find((subdirection: Departments) => subdirection.id == action.payload.parentArea));

                return {
                    ...state,
                    areas: state.areas.map((area: any) => area.id == parent!.id ? {
                        ...area, subdirections: area?.subdirections.map((subdirection: Departments) => subdirection.id == action.payload.parentArea
                            ? {
                                ...subdirection, departments: subdirection.departments.filter(department => department.id != action.payload.id)
                            } : subdirection,
                        )
                    } : area),
                    areasWithDatetime: [...state.areasWithDatetime, action.payload],
                }
            }


        case 'AREA - Delete Area':
            return {
                ...state,
                areas: [{ ...action.payload, startDate: undefined, endDate: undefined }, ...state.areas],
                areasWithDatetime: state.areasWithDatetime.filter(({ id }) => id !== action.payload.id),
                selectedAreas: state.selectedAreas.filter(({ id }) => id !== action.payload.id)
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
                selectedAreas: [],
            }


        case 'AREA - Rollback Selected Areas': {

            console.log('xd')
            return {
                ...state,
                areas: [...state.selectedAreas, ...state.areas],
                areasWithDatetime: state.areasWithDatetime.filter(({ id }) => id !== state.selectedAreas.find((selectedArea) => selectedArea.id === id)!.id),
                selectedAreas: [],
            }
        }

        default:
            return state;
    }

}
