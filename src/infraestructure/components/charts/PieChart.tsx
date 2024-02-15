import { Cell, Pie, PieChart as PieChartMain, Tooltip } from 'recharts'

interface Props {
    data: Array<{ name: string, value: number }>
}
const COLORS = ['#0088FE', '#00C49F', '#FA5882', '#FFBB28', '#FF8042',];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const PieChart = ({ data }: Props) => {
    return (
        <div>
            <PieChartMain width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((__, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChartMain>
            <p className="text-center text-emerald-600 font-bold lg:text-xl mt-2">Estadisticas de cuestionario</p>
        </div>
    )
}
