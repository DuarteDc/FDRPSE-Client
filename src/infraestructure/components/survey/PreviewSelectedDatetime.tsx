import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { ValidateStep } from '../../../app/utils/dateTimeSteps';
import { areaService } from '../../../domain/services/area.service';
import { CalendarMonth } from '../icons';
import { format } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import { useNewSurvey } from '../../../app/hooks/useNewSurvey';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { Departments } from '../../../domain/models';

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
                                className="font-bold block cursor-pointer transition-all duration-300 w-full [&>*]:my-4 [&>*:first-child]:px-0 py-2
                                    border-2 hover:border-emerald-600 rounded-lg p-4 mb-2
                                    [&>div]:ml-2 [&>div]:text-sm [&>div>span]:block [&>div>span]:text-xs [&>div>span]:ml-4 [&>div]:text-emerald-600 [&>div>span]:text-emerald-700/60
                                "
                            >
                                {index + 1}.- {area.name}
                                    {
                                        area.hasOwnProperty('subdirections') && area?.subdirections?.map((subdirection: Departments) => (
                                            <div key={subdirection.id} aria-label={`area-${subdirection.name}`}>
                                                {
                                                    subdirection.name
                                                }
                                                {
                                                    subdirection.departments.map((department) => (
                                                        <span key={department.id}>{department.name}</span>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
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
