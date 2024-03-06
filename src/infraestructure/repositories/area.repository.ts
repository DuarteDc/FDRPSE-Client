import { http } from '../http/http';
import { AreasResponseDto } from '../http/dto/areas';
import { Area, AreaSubareasDepartments } from '../../domain/models';
import { TypeAreas } from '../../domain/models/Area';

export const areaRepository = {

    getAreas: async (): Promise<Array<AreaSubareasDepartments> | string> => {
        try {
            const { areas } = await http.get<AreasResponseDto>('/auth/areas');
            return areas.map((area) => new AreaSubareasDepartments(area.id, area.nombreArea, area.area_padre,
                area.subdirections.map((subdirection) => ({
                    id: subdirection.id,
                    name: subdirection.nombreArea,
                    usersCount: +(subdirection?.users_count) ?? 0,
                    parentArea: subdirection.area_padre,
                    departments: subdirection.departments.map((deparment) =>
                        new Area(deparment.id, deparment.nombreArea, deparment.area_padre, deparment.users_count, TypeAreas.Deparment)),
                    typeArea: TypeAreas.Subdirection,
                })),
                area?.users_count, TypeAreas.Direction));
        } catch (error) {
            return error as string;
        }
    }
}