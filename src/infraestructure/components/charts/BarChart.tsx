
import { Bar, BarChart as BarChartMain, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { GhostIcon } from '../icons';


interface Props {
    data: Array<{ name: string, calificación: number, qualifications: string | undefined }>
    type: 'category' | 'domain';
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', 'green', '#F4A9F3', '#B50430', '#8A2908', '#2ECCFA'];

export const BarChart = ({ data, type }: Props) => {
    return (
        <div>
            {
                type === 'category' ? (
                    <div className="flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-xl text-center block">Calificación por categoría</span>
                    </div>
                ) : (
                    <span className="text-emerald-600 font-bold text-xl text-center w-full block">Calificación por dominio</span>
                )
            }
            {
                data.length > 0 ?(
                    <BarChartMain
                        width={800}
                        height={300}
                        data={data}
                        margin={{ top: 55, right: 10, left: 2, bottom: 5 }}
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
                ):(
                    <div className="w-full flex items-center flex-col justify-center">
                        <GhostIcon height={60} width={60} strokeWidth={2} />
                        <span className="text-xs font-bold text-gray-400">Información no disponible</span>
                    </div>
                )
            }
        </div>
    )
}
