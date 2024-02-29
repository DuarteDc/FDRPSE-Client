import { http } from '../http/http';
import { AreasResponseDto } from '../http/dto/areas';
import { Area } from '../../domain/models';

export const areaRepository = {

    getAreas: async (): Promise<Array<Area> | string> => {
        try {
            const { areas } = await http.get<AreasResponseDto>('/auth/areas');
            return areas.map((area) => new Area(area.id, area.nombreArea, area?.users_count));
        } catch (error) {
            return error as string;
        }
    }
}