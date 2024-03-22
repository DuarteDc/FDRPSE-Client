import { TypeQuestion } from '../../../../domain/models/SectionQuestions';
import { CategoryResponseDto } from '../categories';
import { DimensionResponseDto } from '../dimensions';
import { DomainResponseDto } from '../domains';
import { QualificationResponseDto } from '../qualifications';
import { SectionResponseDto } from '../sections';

export interface CommonQuestionResponseDto {
    id               : string;
    name             : string;
    type             : TypeQuestion;
    created_at       : string;
    updated_at       : string;
    section         ?: SectionResponseDto,
    category        ?: CategoryResponseDto,
    qualification   ?: QualificationResponseDto,
    dimension        ?: DimensionResponseDto,
    domain          ?: DomainResponseDto
}

export interface QuestionResponseDto {
    question: CommonQuestionResponseDto
}