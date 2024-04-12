import { Button, Popover, PopoverTrigger, PopoverContent, Card, CardHeader, Chip } from '@nextui-org/react';
import { Bar, BarChart as BarChartMain, CartesianGrid, Cell, LabelList, Tooltip, XAxis, YAxis } from 'recharts';
import { InfoCircle, StarsIcon } from '../icons';


interface Props {
    data: Array<{ name: string, calificación: number, qualifications: string | undefined }>
    type: 'category' | 'domain';
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

export const BarChart = ({ data, type }: Props) => {
    return (
        <div>
            {
                type === 'category' ? (
                    <div className="flex items-center justify-center">
                        <span className="text-emerald-600 font-bold text-xl text-center block">Calificación por categoría</span>
                        <Popover showArrow backdrop="opaque">
                            <PopoverTrigger>
                                <Button isIconOnly size="sm" className="p-0 w-2 text-primary bg-transparent border ml-2">
                                    <InfoCircle width={19} height={19} strokeWidth={2} />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Card shadow="none" className="max-w-[22rem] font-bold">
                                    <CardHeader className="[&>svg]:text-emerald-600 [&>svg]:mr-2 font-bold [&>svg]:p-1 [&>svg]:border-2 [&>svg]:rounded-full [&>div>div>span]:font-bold">
                                        <StarsIcon strokeWidth={2} width={30} height={30} />
                                        La pregunta se califica de la siguiente manera
                                    </CardHeader>
                                    <div
                                        className="w-full font-bold gap-x-1 flex flex-wrap"
                                    >
                                        <Chip
                                            className="w-full font-bold cursor-pointer mb-1 hover:bg-emerald-600/10 hover:border-emerald-500 transition-all duration-400"
                                            radius="sm"
                                            variant="dot"
                                            size="sm"
                                            color="success"
                                        >
                                            Siempre
                                        </Chip>
                                    </div>
                                </Card>

                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <span className="text-emerald-600 font-bold text-xl text-center w-full block">Calificación por dominio</span>
                )
            }
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
        </div>
    )
}
