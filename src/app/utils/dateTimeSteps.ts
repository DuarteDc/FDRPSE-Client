import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { SelectRangeDates, SetRangeTime } from '../../infraestructure/components/survey';
import { CalendarMonth, ClockIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';

export interface ValidateStep {
    canContinue: () => boolean | Promise<boolean>;
}
export interface StepComponent {
    name: string;
    component: ForwardRefExoticComponent<RefAttributes<ValidateStep>>;
    icon?: IconFunction;
}

export const DATETIME_STEP: Array<StepComponent> = [
    {
        name: 'Seleccionar Fecha',
        component: SelectRangeDates,
        icon: CalendarMonth,
    },
    {
        name: 'Asignar horario',
        component: SetRangeTime,
        icon: ClockIcon
    },
    // {
    //     name: 'Antes de guardar',
    //     component: ReviewQuestion,
    //     icon: SaveIcon
    // }
];
