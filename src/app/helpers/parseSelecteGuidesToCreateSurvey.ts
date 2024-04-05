import { Guide } from "../../domain/models";
import { StartNewSurveyDto } from "../../infraestructure/http/dto/surveys";

export const parseSelecteGuidesToCreateSurvey = (guides: Array<Guide>): StartNewSurveyDto => {
    const guidesId = guides.map(({ id }) => id);
    return {
        guides: Array.from(new Set(guidesId)),
    }
}
