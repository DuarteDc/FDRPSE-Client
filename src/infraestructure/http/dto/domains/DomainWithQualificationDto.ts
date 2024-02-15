import { DomainResponseDto } from './';

export interface DomainWithQualificationDto {
    domains: Array<DomainsWithQualificationResponseDto>
}

interface DomainsWithQualificationResponseDto extends DomainResponseDto {
    qualification: {
        id                  : number;
        despicable          : string;
        low                 : string;
        middle              : string;
        high                : string;
        very_hight          : string;
        qualificationable_id: number;
    }
}