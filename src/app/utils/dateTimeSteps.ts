import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { PreviewSelectedDatetime, SelectRangeDates, SetRangeTime, ViewAreasSelected } from '../../infraestructure/components/survey';
import { BuildingComunity, CalendarMonth, ClockIcon, SaveIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';

export interface ValidateStep {
    canContinue: () => boolean | Promise<boolean>;
}
export interface StepComponent {
    name        : string;
    component   : ForwardRefExoticComponent<RefAttributes<ValidateStep>>;
    icon       ?: IconFunction;
}

export const DATETIME_STEP: Array<StepComponent> = [
    {
        name: 'Áreas seleccionadas',
        component: ViewAreasSelected, 
        icon: BuildingComunity
    },
    {
        name: 'Seleccionar fecha',
        component: SelectRangeDates,
        icon: CalendarMonth,
    },
    {
        name: 'Asignar horario',
        component: SetRangeTime,
        icon: ClockIcon
    },
    {
        name: 'Antes de guardar',
        component: PreviewSelectedDatetime,
        icon: SaveIcon
    }
];
