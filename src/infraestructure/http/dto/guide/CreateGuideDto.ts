import { TypeQuestion } from '../../../../domain/models/SectionQuestions';
import { CommonQualifications } from '../CommonQualificationsDto';

export interface CreateGuideDto extends CommonQualifications {
    name            : string;
    gradable        : TypeQuestion,
    sections        : Array<number>
}


