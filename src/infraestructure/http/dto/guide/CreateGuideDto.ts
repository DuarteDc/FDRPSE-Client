import { TypeGudie } from '../../../../domain/models';
import { CommonQualifications } from '../CommonQualificationsDto';

export interface CreateGuideDto extends CommonQualifications {
    name            : string;
    gradable        : TypeGudie,
    sections        : Array<string>
}


