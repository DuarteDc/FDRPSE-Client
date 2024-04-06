import { Area } from './';


export interface AreaSubareasDepartmentsSchema extends Area {
    subdirections: Array<Departments>
}

export interface Departments extends Area {
    departments: Array<Area>
}

export class AreaSubareasDepartments  {

 

}
