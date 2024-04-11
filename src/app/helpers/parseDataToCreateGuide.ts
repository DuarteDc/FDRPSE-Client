import { Guide, GuideQualification, SectionQuesions } from '../../domain/models';
import { TypeQuestion } from '../../domain/models/SectionQuestions';

import { CommonQualifications } from '../../infraestructure/http/dto/CommonQualificationsDto';


interface ParseDatatToCreateGuide extends CommonQualifications {
    name: string;
    gradable: TypeQuestion;
    sections: Array<number>
}

export const parseDataToCreateGuide = ({ name, gradable }: Guide, sections: Array<SectionQuesions>, qualifications: GuideQualification): ParseDatatToCreateGuide =>
({
    name, gradable: gradable ? 'gradable' : 'nongradable',
    sections: sections.map((section) => section.id),
        despicable: +qualifications.despicable,
        low: +qualifications.low,
        middle: +qualifications.middle,
        high: +qualifications.high,
        very_high: +qualifications.veryHigh
});

