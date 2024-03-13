import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { AddQualification, FormQuestion, ReviewQuestion, SubquestionForm } from '../../infraestructure/components/questions';
import { PlusIcon, SaveIcon, SectionIcon, StarsIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';

export interface ValidateStep {
    canContinue:() =>  boolean | Promise<boolean>;
}
export interface StepComponent {
    name            : string;
    component       : ForwardRefExoticComponent<RefAttributes<ValidateStep>>;
    icon           ?: IconFunction;
}

export const QUESTION_STEPS: Array<StepComponent> = [
    {
        name: 'Agregar nueva pregunta',
        component: FormQuestion,
        icon: PlusIcon,
    },
    {
        name: 'Agregar calificación',
        component: AddQualification,
        icon: StarsIcon,
    },
    // {
    //     name: 'Asignar sección',
    //     component: SubquestionForm,
    //     icon: SectionIcon
    // },
    {
        name: 'Antes de guardar',
        component: ReviewQuestion,
        icon: SaveIcon
    }
];
