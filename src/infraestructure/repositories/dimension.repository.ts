import { http } from '../http/http';

import { Dimension } from '../../domain/models';
import { CreateDimensionDto, DimensionsResponseDto } from '../http/dto/dimensions/';
import { CommonResponseDto } from '../http/dto/CommonResponseDto';
import { errorAlert, succesAlert } from '../alert/alerts';
import { GetOneDimensionDto } from '../http/dto/dimensions/GetOneDimensionDto';

export const dimensionRepository = {

    getDimensions: async (): Promise<Array<Dimension> | string> => {
        try {
            const { dimensions } = await http.get<DimensionsResponseDto>('/auth/dimensions');
            return dimensions.map(({ id, name, created_at, updated_at }) => new Dimension(id, name, created_at, updated_at));
        } catch (error) {
            return error as string;
        }
    },

    createDimension: async (createDimensionDto: CreateDimensionDto): Promise<CommonResponseDto> => {
        try {
            const { message } = await http.post<CommonResponseDto>('/auth/dimensions/create', createDimensionDto);
            succesAlert(message);
            return { message, success: true }
        } catch (error) {
            errorAlert(error as string);
            return { message: error as string, success: false }
        }
    },

    updateDimension: async (dimensionId: string, createDimensionDto: CreateDimensionDto): Promise<Dimension | string> => {
        try {
            const { message, dimension } = await http.patch<GetOneDimensionDto>(`/auth/dimensions/update/${dimensionId}`, createDimensionDto);
            succesAlert(message!);
            return new Dimension(dimension.id, dimension.name, dimension.created_at, dimension.updated_at);
        } catch (error) {
            errorAlert(error as string);
            return error as string;
        }
    }

}