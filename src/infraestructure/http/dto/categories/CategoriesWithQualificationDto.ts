import { CategoryResponseDto } from ".";

export interface CategoriesWithQualificationDto {
    categories: Array<CategoriesWithQualificationResponseDto>
}

interface CategoriesWithQualificationResponseDto extends CategoryResponseDto {
    qualification: {
        id: number;
        despicable: string;
        low: string;
        middle: string;
        high: string;
        very_hight: string;
        qualificationable_id: number;
    }
}