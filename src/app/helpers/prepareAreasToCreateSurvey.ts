import { Area, AreaSubareasDepartments, Departments } from '../../domain/models';
import { TypeAreas } from '../../domain/models/Area';

export const prepareAreasToCreateSurvey = (areas: Array<Area | AreaSubareasDepartments | Departments>) => {
    return areas.reduce((prev: any, curr) => {
        if (curr.typeArea == TypeAreas.Direction) {
            const direction = curr as AreaSubareasDepartments;
            if (direction.subdirections.length > 0) {
                const deparments = direction.subdirections.map(subdirection => subdirection.departments.length > 0
                    && subdirection.departments.map(deparment => ({ id: deparment.id, start_date: direction.startDate, end_date: direction.endDate })));

                (deparments.length > 0 && !deparments.includes(false)) && prev.push(...deparments.flat());

                prev.push(...direction.subdirections.map(sub => ({ id: sub.id, start_date: direction.startDate, end_date: direction.endDate })))
            }
            prev.push({ id: direction.id, start_date: direction.startDate, end_date: direction.endDate })
            return prev;
        }

        if (curr.typeArea == TypeAreas.Subdirection) {
            const subdirection = curr as Departments;
            if (subdirection.departments.length > 0) {
                const deparments = subdirection.departments.map((dep) => ({ id: dep.id, start_date: subdirection.startDate, end_date: subdirection.endDate }))
                deparments.length > 0 && prev.push(...deparments);
            }
            prev.push({ id: subdirection.id, start_date: subdirection.startDate, end_date: subdirection.endDate })
            return prev;
        }
        const deparment = curr as Area;
        prev.push({ id: deparment.id, start_date: deparment.startDate, end_date: deparment.endDate })
        return prev;
    }, [])
}
