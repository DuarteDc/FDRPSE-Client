import { DayContent, DayContentProps, DayPicker, SelectSingleEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import 'react-day-picker/dist/style.css';

interface Props {
    value       : Date;
    onSelected  : SelectSingleEventHandler;
    from        : Date;
}

export const DatePicker = ({ value, onSelected, from }: Props) => {
    return (
        <DayPicker
            selected={value}
            onSelect={onSelected}
            locale={es}
            mode="single"
            modifiersClassNames={{
                today: '[&>time]:text-emerald-500 font-bold',
                selected: 'border-emerald-500 border-emerald-500 border-2 border-emerald-600 bg-emerald-600 [&>time]:text-white',
            }}
            components={{
                DayContent: (props: DayContentProps) => {
                    const dateTime = format(props.date, 'yyyy-MM-dd')
                    return (
                        <time dateTime={dateTime}
                            className="hover:bg-emerald-600 w-full h-full flex justify-center items-center text-black hover:text-white transition-all duration-400">
                            <DayContent {...props} />
                        </time>)
                }
            }}

        />
    )
}
