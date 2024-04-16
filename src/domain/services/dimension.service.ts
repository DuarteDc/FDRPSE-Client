import { useContext, useState } from 'react';
import { DimensionContext } from '../../infraestructure/context/dimension';
import { dimensionRepository } from '../../infraestructure/repositories/dimension.repository';
import { CreateDimensionDto } from '../../infraestructure/http/dto/dimensions';
import { useNavigate } from 'react-router-dom';
import { Dimension } from '../models';

export const dimensionService = () => {

    const [loading, setLoading] = useState(false);
    const { dimensions, dispatch, dimension } = useContext(DimensionContext);
    const navigate = useNavigate();

    const startGetDimensions = async (): Promise<void> => {
        setLoading(true);
        const dimensions = await dimensionRepository.getDimensions();
        typeof dimensions !== 'string' && dispatch({ type: 'DIMENSION - Load dimensions', payload: dimensions });
        setLoading(false);
    }


    const startCreateDimension = async (createDimensionDto: CreateDimensionDto): Promise<void> => {
        setLoading(true);
        const { success } = await dimensionRepository.createDimension(createDimensionDto);
        success && navigate(-1);
        setLoading(false);
    }

    const startUpdateDimension = async (dimensionId: string, createDimensionDto: CreateDimensionDto, callback?: CallableFunction): Promise<void> => {
        setLoading(true);
        const dimension = await dimensionRepository.updateDimension(dimensionId, createDimensionDto);
        if (typeof dimension !== 'string') {
            dispatch({ type: 'DIMENSION - Update dimension', payload: dimension });
            callback && callback();
        }
        setLoading(false);
    }



    const startGetCurrentDimension = (dimensionId: string): void => {
        return dispatch({ type: 'DIMENSION - Load current dimension', payload: dimensionId });
    }


    return {
        loading,
        dimension,
        dimensions,
        startGetDimensions,
        startCreateDimension,
        startUpdateDimension,
        startGetCurrentDimension,
    }
}
