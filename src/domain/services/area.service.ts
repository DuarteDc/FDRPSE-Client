import { useContext } from 'react';
import { AreaContext } from '../../infraestructure/context/area';
import { areaRepository } from '../../infraestructure/repositories/area.repository';


export const areaService = () => {

    const { areas, subareas, dispatch} = useContext(AreaContext);

    const startLoadAreas = async () => {
        const areas = await areaRepository.getAreas();
        typeof areas !== 'string' && dispatch({ type: 'AREA - Get areas', payload: areas });
    }
    
    const startLoadSubAreas = async (areaId: string) => {
        const areas = await areaRepository.getSubAreasByArea(areaId);
        typeof areas !== 'string' && dispatch({ type: 'AREA - Get subareas by areas', payload: areas });
    }


    return {
        areas,
        subareas,

        startLoadAreas,
        startLoadSubAreas,
        
    
    }


}
