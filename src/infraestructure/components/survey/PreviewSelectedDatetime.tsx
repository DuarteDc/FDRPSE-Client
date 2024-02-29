import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { ValidateStep } from '../../../app/utils/dateTimeSteps';
import { areaService } from '../../../domain/services/area.service';
import { CalendarMonth } from '../icons';
import { format } from 'date-fns-tz';
import { ar, es } from 'date-fns/locale';
import { useNewSurvey } from '../../../app/hooks/useNewSurvey';
import { Accordion, AccordionItem } from '@nextui-org/react';

export const PreviewSelectedDatetime = forwardRef<ValidateStep>((_, ref: ForwardedRef<ValidateStep>) => {

    const { datetime, selectedAreas } = areaService();
    const { handleSetDatetimeToArea } = useNewSurvey({});

    useImperativeHandle(ref, () => ({
        canContinue: () => {
            handleSetDatetimeToArea(datetime);
            return true
        }
    }));

    return (
        <div className="w-full [&>*]:my-4 [&>*:first-child]:px-0">
            <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Areas seleccionadas" title={
                    <span className="text-emerald-600 font-bold">Ver áreas seleccionadas</span>
                } className="max-h-[300px] overflow-y-auto">
                    {
                        selectedAreas.map((area, index) => (
                            <span key={area.id}
                            className="font-bold block cursor-pointer hover:text-emerald-500 transition-all duration-300"
                            >
                                {index + 1}.- {area.name}
                            </span>
                        ))
                    }
                </AccordionItem>
            </Accordion>
            <div className="border-2 w-full border-emerald-600 py-4 px-2 rounded-lg flex items-center">
                <span className="flex items-center h-14 w-14 bg-emerald-600 justify-center text-white rounded-full mr-4">
                    <CalendarMonth />
                </span>
                <span className="font-bold [&>b]:block [&>b]:uppercase">
                    <b className="text-lg bg-gradient-to-r from-primary via-emerald-600 to-emerald-700 inline-block text-transparent bg-clip-text">Fecha de inicio</b>
                    <b>{format(datetime.startDate!, 'PPP h:mm a', { locale: es })}</b>
                </span>
            </div>

            <div className="border-2 w-full border-emerald-600 py-4 px-2 rounded-lg flex items-center">
                <span className="flex items-center h-14 w-14 bg-emerald-600 justify-center text-white rounded-full mr-4">
                    <CalendarMonth />
                </span>
                <span className="font-bold [&>b]:block [&>b]:uppercase">
                    <b className="text-lg bg-gradient-to-r from-primary via-emerald-600 to-emerald-700 inline-block text-transparent bg-clip-text">Fecha final</b>
                    <b>{format(datetime.endDate!, 'PPP h:mm a', { locale: es })}</b>
                </span>
            </div>
        </div>
    )
})
