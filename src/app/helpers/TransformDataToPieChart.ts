import { SurveyUser } from "../../domain/models";

interface Props {
    ['Despreciable o nulo']: number;
    ['Bajo']: number;
    ['Medio']: number;
    ['Alto']: number;
    ['Muy alto']: number;
}

export const TransformDataToPieChart = (data: Array<SurveyUser>) => {

    const countData = data.reduce((prev: Props, curr) => {
        const total = Number(curr.total);

        if (total < 50) prev['Despreciable o nulo'] = prev['Despreciable o nulo'] + 1;
        if (total >= 50 && +total < 75) prev['Bajo'] = prev['Bajo'] + 1;
        if (total >= 75 && +total < 99) prev['Medio'] = prev['Medio'] + 1;
        if (total >= 99 && +total < 140) prev['Alto'] = prev['Alto'] + 1;
        if (total >= 140) prev['Muy alto'] = prev['Muy alto'] + 1;

        return prev;
    },
        { ['Despreciable o nulo']: 0, ['Bajo']: 0, ['Medio']: 0, ['Alto']: 0, ['Muy alto']: 0 }
    )

    return Object.entries(countData).map(([key, value]) => ({
        name: key, value,
    }))

}
