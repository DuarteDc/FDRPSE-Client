import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

import { DatePicker } from '../ui'

import { type ValidateStep } from '../../../app/utils/dateTimeSteps';
import { compareDesc } from 'date-fns';
import { errorAlert } from '../../alert/alerts';
import { areaService } from '../../../domain/services/area.service';
import { getCurrentDate } from '../../../app/helpers/getCurrentDateTime';

export const SelectRangeDates = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { datetime, dispatch } = areaService();
    const handleSelectStartDate: SelectSingleEventHandler = (__, day?: Date) => dispatch({ type: 'AREA - Change StartDateTime', payload: day! })
    const handleSelectEndDate: SelectSingleEventHandler = (__, day?: Date) => dispatch({ type: 'AREA - Change EndDateTime', payload: day! });

    const canContinue = () => {
        if (!datetime?.startDate || !datetime?.endDate) {
            errorAlert('Selecciona un rango de fechas para continuar');
            return false;
        }
        const isValidDate = compareDesc(datetime.startDate, datetime.endDate);
        if (isValidDate === -1) {
            errorAlert('La fecha de final debe ser mayor a la fecha de inicio');
            return false;
        };
        return true;
    };

    useImperativeHandle(ref, () => ({
        canContinue,
    }));

    return (
        <div className="grid md:grid-cols-2">
            <DatePicker
                title="Fecha de inicio"
                value={datetime?.startDate!}
                onSelected={handleSelectStartDate}
                from={getCurrentDate()}
            />
            <DatePicker
                title="Fecha de fin"
                value={datetime?.endDate!}
                onSelected={handleSelectEndDate}
                from={datetime.startDate || getCurrentDate()}
            />
        </div>
    )
})
