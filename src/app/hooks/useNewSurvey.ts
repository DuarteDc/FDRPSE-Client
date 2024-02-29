import { DragEvent, useCallback, useMemo, useState } from 'react';
import { Area } from '../../domain/models';
import { areaService } from '../../domain/services/area.service';
import { DATETIME } from '../../infraestructure/context/area';


interface Props {
    openDatetime?: () => void;
}
export const useNewSurvey = (props: Props) => {

    const { dispatch, selectedAreas } = areaService();
    const [isDrag, setIsDrag] = useState<boolean>(false);

    const selectedAreasMemorized = useCallback((areas: Array<Area>) => dispatch({ type: 'AREA - Set Current Areas', payload: areas }), []);

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, area: Area) => {
        event.dataTransfer.setData('area', JSON.stringify(area));
        setIsDrag(prev => !prev);
    }, []);

    const onDragEnd = useCallback(() => setIsDrag(prev => !prev), []);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropArea = (event: DragEvent<HTMLDivElement>) => {
        const area = JSON.parse(event.dataTransfer.getData('area')) as Area;
        selectedAreasMemorized([area]);
        dispatch({ type: 'AREA - Add Area', payload: area })
        props.openDatetime!();
        onDragEnd()
    }

    const onDeleteArea = (area: Area) => dispatch({ type: 'AREA - Delete Area', payload: area });

    const handleSelectMultiplesAreas = (areasId: Array<string>) => {
        dispatch({ type: 'AREA - Add Multiple Areas', payload: areasId })
    }

    const handleSelectAllAreas = () => {
        dispatch({ type: 'AREA - Select All Areas' })
        props.openDatetime!();
    }

    const handleSetDatetimeToArea = (datetime: DATETIME) => {
        dispatch({ type: 'AREA - Set Datetime to areas', payload: { datetime, areas: selectedAreas } })
    }



    return {
        isDrag,
        selectedAreas,

        onDragEnd,
        onDragStart,
        allowDrop,
        onDropArea,

        onDeleteArea,
        handleSetDatetimeToArea,
        handleSelectAllAreas,
    }
}
