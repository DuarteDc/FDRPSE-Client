
interface QualificationData {
    alwaysOp: number;
    almostAlwyasOp: number;
    sometimesOp: number;
    almostNeverOp: number;
    neverOp: number;
}

interface NamesOfQualificationsOptions {
    [key: string]: string
}
const namesOfQualificationsOptions: NamesOfQualificationsOptions = {
    ["alwaysOp"]:   'Siempre',
    ["almostAlwyasOp"]: 'Casi siempre',
    ["sometimesOp"]:    'Algunas veces',
    ["almostNeverOp"]:  'Casi nunca',
    ["neverOp"]:        'Nunca',
}

export const getAnswerNameByNumber = (qualification: number, namesOfQualifications: QualificationData) => {
    if(!namesOfQualifications) return
    const key = Object.entries(namesOfQualifications).find(([__, value]) => value === qualification)?.[0] as string;
    return typeof key === 'string' ? namesOfQualificationsOptions[`${key}`] : 'NA';
}
