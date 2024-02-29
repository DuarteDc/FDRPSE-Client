import { useContext } from 'react';
import { AreaContext, DATETIME } from '../../infraestructure/context/area';

type date = 'startDate' | 'endDate';

export const areaService = () => {

    const { area, areas, dispatch, datetime } = useContext(AreaContext);

    // const startLoadAreas = async () => {

    // }

    const setDatetime = (datetime: DATETIME) => dispatch({ type: 'AREA - Set Datetime', payload: datetime });

    const setTimeInDate = (hours: string, date: date) => {
        if (date === 'startDate') {
            const dateSplited = datetime.startDate?.toISOString().split('T');
            const newDate = dateSplited![0] + "T" + (hours.split(":")[0].length > 1 ? hours : "0" + hours) + ":00.000Z";
            dispatch({ type: 'AREA - Change StartDateTime', payload: new Date(newDate) })
            return new Date(newDate)
        }
        const dateSplited = datetime.endDate?.toISOString().split('T');
        const newDate = dateSplited![0] + "T" + hours + ":00.000Z";
        dispatch({ type: 'AREA - Change EndDateTime', payload: new Date(newDate) });
        return new Date(newDate)
    }


    return {
        area,
        datetime,
        dispatch,
        setDatetime,
        setTimeInDate
    }


}
