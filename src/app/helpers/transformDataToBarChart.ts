import { CategoryQualifications, SurveyUser } from '../../domain/models';

interface Props {
    [key: string]: number;
}

export const trasformDataToBarChart = (surveyUser: SurveyUser, categories: Array<CategoryQualifications>) => {

    const x = surveyUser?.answers.reduce((prev: Props, curr) => {
        const { category, qualification, } = curr;
        prev[category.name] = prev[category.name] ? prev[category.name] + qualification : qualification;
        return prev;
    }, {});

    return Object.entries(x).map(([key, value]) => {
        return {
            name: key,
            calificación: value,
            qualifications: categories.map(({ qualification, name }) => {
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