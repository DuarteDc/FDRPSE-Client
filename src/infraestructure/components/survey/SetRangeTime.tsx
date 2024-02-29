import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react"
import { ValidateStep } from "../../../app/utils/dateTimeSteps"
import TimeKeeper, { TimeOutput } from "react-timekeeper";
import { areaService } from "../../../domain/services/area.service";
import { compareDesc, format } from "date-fns";
import { errorAlert } from "../../alert/alerts";

import { es } from 'date-fns/locale';

export const SetRangeTime = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { area, datetime, setTimeInDate } = areaService();
    const [time, setTime] = useState({ startTime: '06:00', endTime: '06:00' });

    const handleSetStartTime = (newTime: TimeOutput) => {
        setTime(prev => ({ ...prev, startTime: newTime.formatted24 }));
        setTimeInDate(newTime.formatted24, 'startDate')
    }
    const handleEndTime = (newTime: TimeOutput) => {
        setTime(prev => ({ ...prev, endTime: newTime.formatted24 }));
        setTimeInDate(newTime.formatted24, 'endDate');
    }


    const canContinue = () => {
        if (!datetime?.startDate || !datetime?.endDate) {
            errorAlert('Selecciona un horario para continuar');
            return false;
        }
        const isValidDate = compareDesc(datetime.startDate, datetime.endDate);
        if (isValidDate !== 1) {
            errorAlert('La fecha final de aplicación debe ser mayor a la fecha inicial');
            return false;
        }
        return false;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }))

    return (
        <div className="grid md:grid-cols-2 [&>div>div>div>*:first-child>span]:text-emerald-600 [&>div>div>div>div>span]:text-emerald-600/80 [&>div>div>div>span]:text-slate-800 place-items-center
        ">
            <div className="flex justify-center flex-col items-center">
                <span className="text-center font-extrabold w-full bg-gradient-to-r from-primary via-emerald-600 to-emerald-700 inline-block text-transparent bg-clip-text uppercase mb-4   ">
                    Selecciona la hora de inicio
                </span>
                <TimeKeeper
                    switchToMinuteOnHourSelect
                    time={time?.startTime}
                    onChange={handleSetStartTime}
                />
                <span className="uppercase font-bold text-emerald-600 [&>*]:text-black mt-2 block">
                    Fecha:
                    <b>
                        {
                            datetime && format(datetime.startDate!, 'PPpp', { locale: es })
                        }

                    </b>

                </span>
            </div>

            <div className="flex justify-center flex-col items-center">
                <span className="text-center font-extrabold w-full bg-gradient-to-r from-primary via-emerald-600 to-emerald-700 inline-block text-transparent bg-clip-text uppercase mb-4   ">
                    Selecciona la hora de fin
                </span>
                <TimeKeeper
                    switchToMinuteOnHourSelect
                    time={time?.endTime}
                    onChange={handleEndTime}
                />
                <span className="uppercase font-bold text-emerald-600 [&>*]:text-black mt-2 block">
                    Fecha:
                    <b>
                        {
                            datetime && format(datetime.endDate!, 'd-MMM-y', { locale: es })
                        }
                    </b>
                </span>
            </div>
        </div>
    )
})
