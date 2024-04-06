
export interface Area {
    id:             number;
    name:           string;
    pather:         string;
    level:          string;
    usersCount:     number;
    subdirections?: Area[];
    departments?:   Area[];
}


export enum TypeAreas {
    Direction = 1,
    Subdirection = 2,
    Deparment = 3,
}