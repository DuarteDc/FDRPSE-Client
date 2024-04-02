import type { ForwardRefExoticComponent, RefAttributes } from 'react';

// import { PreviewSelectedDatetime, SelectRangeDates, SetRangeTime, StartSurvey, ViewTimeLineAreas } from '../../infraestructure/components/survey';
// import { CalendarMonth, ClockIcon, SaveIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';
import { ViewAreasSelected } from '../../infraestructure/components/survey';
import { BuildingComunity } from '../../infraestructure/components/icons';

export interface ValidateStep {
    canContinue: () => boolean | Promise<boolean>;
}
export interface StepComponent {
    name        : string;
    component   : ForwardRefExoticComponent<RefAttributes<ValidateStep>>;
    icon       ?: IconFunction;
}

export const SURVEY_STEPS: Array<StepComponent> = [
    {
        name: 'Áreas seleccionadas',
        component: ViewAreasSelected, 
        icon: BuildingComunity
    },
    // {
    //     name: 'Asignar horarios',
    //     component: StartSurvey,
    //     icon: CalendarMonth,
    // },
    // {
    //     name: 'Programación',
    //     component: ViewTimeLineAreas,
    //     icon: CalendarMonth,
    // },
    // {
    //     name: 'Asignar horario',
    //     component: SetRangeTime,
    //     icon: ClockIcon
    // },
    // {
    //     name: 'Antes de guardar',
    //     component: PreviewSelectedDatetime,
    //     icon: SaveIcon
    // }
];
