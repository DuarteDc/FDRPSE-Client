import { Area } from './';
import { AreaSchema } from './Area';

interface AreaSubareasDepartmentsSchema extends AreaSchema {
    subdirections: Array<Departments>
}

interface Departments extends AreaSchema {
    departments: Array<AreaSchema>
}

export class AreaSubareasDepartments extends Area implements AreaSubareasDepartmentsSchema {

    readonly subdirections;

    constructor(id: string, name: string, parentArea: string, subdirections: Array<Departments>, usersCount = "", startDate?: Date, endDate?: Date) {
        super(id, name, parentArea, usersCount, startDate, endDate);
        this.subdirections = subdirections;
    }

}
