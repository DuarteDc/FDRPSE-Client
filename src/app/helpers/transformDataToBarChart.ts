import { CategoryQualifications, DomainQualifications, SurveyUser } from '../../domain/models';

interface Props {
    [key: string]: number;
}

type dataType = 'category' | 'domain';

const tarnsformDataByType = (surveyUser: SurveyUser, type: dataType): Props => {
    return surveyUser?.answers.reduce((prev: Props, curr) => {
        const { qualification, } = curr;
        prev[curr[type].name] = prev[curr[type].name] ? prev[curr[type].name] + qualification : qualification;
        return prev;
    }, {});
}

export const trasformDataToBarChart = (surveyUser: SurveyUser, type: dataType, data: Array<CategoryQualifications | DomainQualifications>) => {

    const newData = tarnsformDataByType(surveyUser, type);
    return Object.entries(newData).map(([key, value]) => {
        return {
            name: key,
            calificación: value,
            qualifications: data.map(({ qualification, name }) => {
                const { despicable, low, middle, high } = qualification;
                return name === key ?
                    getNameOfQualification(+despicable, +low, +middle, +high, value)
                    : 'NA'
            }).find(value => value !== 'NA')
        }
    }
    );
}


const getNameOfQualification = (despicable: number, low: number, middle: number, high: number, value: number) => {
    if (value < despicable) return 'Despreciable o nulo';
    if (value >= despicable && value < low) return 'Bajo';
    if (value >= low && value < middle) return 'Medio';
    if (value >= middle && value < high) return 'Alto';
    if (value >= high) return 'Muy alto';
    return 'NA'
}