import { Guide, GuideQualification, SectionQuesions } from '../../domain/models';
import { TypeQuestion } from '../../domain/models/SectionQuestions';

import { CommonQualifications } from '../../infraestructure/http/dto/CommonQualificationsDto';


interface ParseDatatToCreateGuide extends CommonQualifications {
    name: string;
    gradable: TypeQuestion;
    sections: Array<number>
}

export const parseDataToCreateGuide = ({ name, gradable }: Guide, sections: Array<SectionQuesions>, qualifications: GuideQualification | null): ParseDatatToCreateGuide =>
({
    name,
    gradable: gradable ? 'gradable' : 'nongradable',
    sections: sections.map((section) => section.id),
    despicable: (qualifications?.despicable) ? +qualifications.despicable : 0,
    low: (qualifications?.low) ? +qualifications.low : 0,
    middle: (qualifications?.middle) ? +qualifications.middle : 0,
    high: (qualifications?.high) ? +qualifications.high : 0,
    very_high: (qualifications?.veryHigh) ? +qualifications.veryHigh : 0,
});

