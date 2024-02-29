import { useContext } from 'react';
import { AreaContext, DATETIME } from '../../infraestructure/context/area';
import { createCustomDatetime } from '../../app/helpers/createCustomDatetime';
import { areaRepository } from '../../infraestructure/repositories/area.repository';

type date = 'startDate' | 'endDate';

export const areaService = () => {

    const { area, areas, dispatch, datetime, areasWithDatetime, selectedAreas } = useContext(AreaContext);

    const startLoadAreas = async () => {
        const areas = await areaRepository.getAreas();
        typeof areas !== 'string' && dispatch({ type: 'AREA - Get areas', payload: areas });
    }

    const setDatetime = (datetime: DATETIME) => dispatch({ type: 'AREA - Set Datetime', payload:  datetime });

    const setTimeInDate = (hours: string, date: date) => {
        if (date === 'startDate') {
            const newDate = createCustomDatetime(datetime.startDate!, hours);
            dispatch({ type: 'AREA - Change StartDateTime', payload: newDate })
            return newDate;
        }
        const newDate = createCustomDatetime(datetime.startDate!, hours);
        dispatch({ type: 'AREA - Change EndDateTime', payload: newDate });
        return newDate
    }


    return {
        area,
        areas,
        datetime,
        selectedAreas,
        areasWithDatetime,
        dispatch,
        setDatetime,
        setTimeInDate,
        startLoadAreas,
    }


}
