export interface CreateCategoryDto {
    name        : string;
    qualifications: Array<QualificationsDto>;
}

export interface QualificationsDto {
    despicable  : number;
    low         : number;
    middle      : number;
    high        : number;
    very_high  : number;
}

export interface SetNameToCategory {
    name: string;
}