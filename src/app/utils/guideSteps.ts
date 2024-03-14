import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';
import { FormNameAndTypeGuide, PreviewNewGuide, SetQualification, SetSectionToGuide } from '../../infraestructure/components/guides';

export interface ValidateStep {
    canContinue: () => boolean | Promise<boolean>;
}
export interface StepComponent {
    name        : string;
    component   : ForwardRefExoticComponent<RefAttributes<ValidateStep>>;
    icon       ?: IconFunction;
}

export const GUIDE_STEPS: Array<StepComponent> = [
    {
        name: 'Nombre y tipo de cuestionario',
        component: FormNameAndTypeGuide,
    },
    {
        name: 'Secciones dentro del cuestionario',
        component: SetSectionToGuide,
    },
    {
        name: 'Asignar calificación al cuestionario',
        component: SetQualification,
    },
    {
        name: 'Antes de guardar',
        component: PreviewNewGuide,
    }
    
];
