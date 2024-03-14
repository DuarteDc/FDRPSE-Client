import { Guide, GuideQualifications, SectionQuesions } from '../../domain/models';

import { TypeGudie } from '../../domain/models';
import { CommonQualifications } from '../../infraestructure/http/dto/CommonQualificationsDto';


interface ParseDatatToCreateGuide extends CommonQualifications {
    name: string;
    gradable: TypeGudie;
    sections: Array<string>
}
export const parseDataToCreateGuide = ({ name, gradable }: Guide, sections: Array<SectionQuesions>, qualifications: GuideQualifications): ParseDatatToCreateGuide =>
({
    name, gradable: gradable ? 'gradable' : 'nongradable',
    sections: sections.map((section) => section.id),
        despicable: +qualifications.despicable,
        low: +qualifications.low,
        middle: +qualifications.middle,
        high: +qualifications.high,
        very_high: +qualifications.veryHigh
});

