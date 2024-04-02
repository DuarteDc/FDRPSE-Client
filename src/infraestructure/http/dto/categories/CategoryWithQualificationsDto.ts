import { CategoryResponseDto } from '.';
import { CommonQualifications } from '../CommonQualificationsDto';

export interface CategoryWithQualificationsDto {
    category: CategoryWithQualificationResponseDto
}

interface CategoryWithQualificationResponseDto extends CategoryResponseDto {
    qualifications: Array<CommonQualifications>
}
