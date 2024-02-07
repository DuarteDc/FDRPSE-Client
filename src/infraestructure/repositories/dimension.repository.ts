import { http } from '../http/http';

import { Dimension } from '../../domain/models';
import { CreateDimensionDto, DimensionsResponseDto} from '../http/dto/dimensions/';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';

export const dimensionRepository = {

    getDimensions: async (): Promise<Array<Dimension> | string> => {
        try {
            const { dimensions } = await http.get<DimensionsResponseDto>('/dimensions');
            return dimensions.map(({ id, name, created_at, updated_at }) => new Dimension(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createDimension: async (createDimensionDto: CreateDimensionDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/dimensions/create', createDimensionDto);
            return { message, success: true }
        } catch (error) {
             return { message: error as string, success: false }
        }
    }

}