import { SectionResponseDto } from '.';
import { CommonResponseDto } from '../CommonResponseDto';

export interface CreateSectioResponseDto extends CommonResponseDto {
    section: SectionResponseDto,
}