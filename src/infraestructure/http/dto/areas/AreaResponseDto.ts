export interface AreaResponseDto extends Area{
    subdirections: Array<Subdirection>
}

interface Subdirection extends Area {
    departments: Array<Area>
}
interface Area {
    id              : string;
    nombreArea      : string;
    area_padre      : string;
    users_count     : string;
}

