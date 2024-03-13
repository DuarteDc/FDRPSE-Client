import { DragEvent, useCallback, useState } from 'react';
import { Area, AreaSubareasDepartments, Departments, Section } from '../../domain/models';
import { areaService } from '../../domain/services/area.service';
import { DATETIME } from '../../infraestructure/context/area';


interface Props {
    openDatetime?: () => void;
}
export const useNewSurvey = (props: Props) => {

    const { dispatch, selectedAreas, areas } = areaService();
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [multiSelect, setMultiSelect] = useState<boolean>(false);
    const [multipleAreasSelected, setMultipleAreasSelected] = useState<Array<string>>([]);

    const selectedAreasMemorized = useCallback((areas: Array<Area>) => dispatch({ type: 'AREA - Set Current Areas', payload: areas }), []);

    const onDragStart = useCallback((event: DragEvent<HTMLDivElement>, section: Section) => {
        event.stopPropagation();
        event.dataTransfer.setData('section', JSON.stringify(section));
        setIsDrag(true);
    }, []);

    const onDragEnd = useCallback(() => setIsDrag(false), []);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropArea = (event: DragEvent<HTMLDivElement>) => {
        const area = JSON.parse(event.dataTransfer.getData('section'));
        // selectedAreasMemorized([area]);
        // dispatch({ type: 'AREA - Add Area', payload: area })
        onDragEnd()
        props.openDatetime!();
    }

    const handleMultiSelect = useCallback(() => setMultiSelect(prev => !prev), []);

    const handleOnChageSelectedAreas = useCallback((areasId: Array<string>) => setMultipleAreasSelected(areasId), []);

    const onDeleteArea = (area: Area) => dispatch({ type: 'AREA - Delete Area', payload: area });

    const handleSelectMultiplesAreas = () => {
        const selectedAreas = multipleAreasSelected.map((areaId) => areas.find(({ id }) => id === areaId)!);
        dispatch({ type: 'AREA - Add Multiple Areas', payload: { areas: selectedAreas, deleteAreas: multipleAreasSelected } });
        setMultipleAreasSelected([]);
        handleMultiSelect()
        props.openDatetime!()
    }

    const handleSelectAllAreas = () => {
        dispatch({ type: 'AREA - Select All Areas' })
        props.openDatetime!();
    }

    const handleSetDatetimeToArea = (datetime: DATETIME) => {
        dispatch({ type: 'AREA - Set Datetime to areas', payload: { datetime, areas: selectedAreas } });
    }

    const handleRollbackSelectedAreas = () => dispatch({ type: 'AREA - Rollback Selected Areas' });


    return {
        isDrag,
        selectedAreas,

        multiSelect,
        multipleAreasSelected,

        onDragEnd,
        onDragStart,
        allowDrop,
        onDropArea,

        handleMultiSelect,
        handleOnChageSelectedAreas,

        onDeleteArea,
        handleSetDatetimeToArea,
        handleSelectAllAreas,
        handleSelectMultiplesAreas,
        handleRollbackSelectedAreas,
    }
}
