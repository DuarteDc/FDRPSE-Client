import { DomainResponseDto } from '.';
import { CommonQualifications } from '../CommonQualificationsDto';

export interface DomainWithQualificationsDto {
    domain: DomainWithQualificationResponseDto
}

interface DomainWithQualificationResponseDto extends DomainResponseDto {
    qualifications: Array<CommonQualifications>
}
