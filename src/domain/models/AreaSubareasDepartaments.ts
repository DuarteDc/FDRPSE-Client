import { Area } from './';
import { AreaSchema, TypeAreas } from './Area';

export interface AreaSubareasDepartmentsSchema extends AreaSchema {
    subdirections: Array<Departments>
}

export interface Departments extends AreaSchema {
    departments: Array<AreaSchema>
}

export class AreaSubareasDepartments extends Area implements AreaSubareasDepartmentsSchema {

    readonly subdirections;

    constructor(id: string, name: string, parentArea: string, subdirections: Array<Departments>, usersCount = "", typeArea = TypeAreas.Subdirection, startDate?: Date, endDate?: Date) {
        super(id, name, parentArea, usersCount, typeArea, startDate, endDate);
        this.subdirections = subdirections;
    }

}
