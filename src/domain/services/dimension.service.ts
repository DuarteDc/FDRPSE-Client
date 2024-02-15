import { useContext, useState } from 'react';
import { DimensionContext } from '../../infraestructure/context/dimension';
import { dimensionRepository } from '../../infraestructure/repositories/dimension.repository';
import { CreateDimensionDto } from '../../infraestructure/http/dto/dimensions';
import { useNavigate } from 'react-router-dom';

export const dimensionService = () => {

    const [loading, setLoading] = useState(false);
    const { dimensions, dispatch } = useContext(DimensionContext);
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



    return {
        loading,
        dimensions,
        startGetDimensions,
        startCreateDimension,
    }
}
