import { GuideSurveyUserDetail } from '../../domain/models';

interface Props {
    [key: string]: number;
}
interface NameOfQualification {
    despicable: string, low: string, middle: string, high: string, value: number
}

type dataType = 'category' | 'domain';

const tarnsformDataByType = (userDetail: GuideSurveyUserDetail, type: dataType): Props => {
    return userDetail?.answers.reduce((prev: Props, curr) => {
        const { qualification, } = curr;
        prev[curr[type].name] = prev[curr[type].name] ? prev[curr[type].name] + qualification : qualification;
        return prev;
    }, {});
}

export const getNameOfQualification = ({ despicable, low, high, middle, value }: NameOfQualification) => {
    if (value < +despicable) return 'Despreciable o nulo';
    if (value >= +despicable && value < +low) return 'Bajo';
    if (value >= +low && value < +middle) return 'Medio';
    if (value >= +middle && value < +high) return 'Alto';
    if (value >= +high) return 'Muy alto';
    return 'NA'
}

export const trasformDataToBarChart = (userDetail: GuideSurveyUserDetail | null, type: dataType) => {
    if (!userDetail) return;

    const newData = tarnsformDataByType(userDetail, type);
    return Object.entries(newData).map(([key, value]) => {
        return {
            name: key,
            calificación: value,
            qualifications: getNameOfQualification({ ...getQualificationData(type, userDetail, key)!, value: value }),
            qualification: getQualificationData(type, userDetail, key)
        } 
    }).filter(key => key.name !== "undefined");
}



const getQualificationData = (type: dataType, userDetail: GuideSurveyUserDetail, name: string) => {
    if (type === 'category') {
        return userDetail.answers.find(({ category }) => {
            return category.name === name;
        })?.category.qualification;
    }
    return userDetail.answers.find(({ domain }) => {
        return domain.name === name;
    })?.domain.qualification;

}