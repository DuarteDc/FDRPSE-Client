import type { ForwardRefExoticComponent, RefAttributes } from 'react';

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
    // {
    //     name: 'Áreas seleccionadas',
    //     component: ViewAreasSelected, 
    //     icon: BuildingComunity
    // },
   
];
