import { http } from '../http/http';
import { AreasResponseDto } from '../http/dto/areas';
import { Area, AreaSubareasDepartments } from '../../domain/models';

export const areaRepository = {

    getAreas: async (): Promise<Array<Area> | string> => {
        try {
            const { areas } = await http.get<AreasResponseDto>('/auth/areas');
            // return areas.map((area) => new AreaSubareasDepartments(area.id, area.nombreArea, area.area_padre,
            //     area.subdirections.map((subdirection) => ({
            //         id: subdirection.id, name: subdirection.id, usersCount: subdirection?.users_count || "",
            //         parentArea: subdirection.area_padre || 0,
            //         departments: subdirection.departments.map((deparment) => new Area(deparment.id, deparment.nombreArea, deparment.area_padre, deparment.users_count))
            //     })),
            //     area?.users_count));
        } catch (error) {
            return error as string;
        }
    }
}