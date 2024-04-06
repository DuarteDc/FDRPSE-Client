export interface AreaResponseDto {
    areas: AreaElement[];
}

interface AreaElement {
    id:             number;
    nombreArea:     string;
    area_padre:     string;
    area_nivel:     string;
    users_count:    number;
    subdirections?: AreaElement[];
    departments?:   AreaElement[];
}
