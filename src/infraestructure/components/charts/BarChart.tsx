import { Bar, BarChart as BarChartMain, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from 'recharts';


interface Props {
    data: Array<{ name: string, calificación: number, qualifications: string | undefined }>
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

export const BarChart = ({ data }: Props) => {
    return (
        <BarChartMain
            width={800}
            height={300}
            data={data}
            margin={{ top: 55, right: 10, left: 10, bottom: 5 }}
        >

            <XAxis dataKey="name" fontSize={10} tick={{ stroke: '#000', strokeWidth: 0.3 }} />
            <YAxis />
            <Tooltip cursor={{ stroke: '#059669', strokeWidth: 1, fill: '#E8E8E8' }} />
            <CartesianGrid stroke="#F2F2F2" strokeDasharray="4 4" />
            <Bar dataKey="calificación">
                <LabelList dataKey="qualifications" position="top" />
                {data.map((__, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
            </Bar>
        </BarChartMain>

    )
}
