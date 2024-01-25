import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { AddQualification, FormQuestion, SubquestionForm } from '../../infraestructure/components/questions';
import { PlusIcon, StarsIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';

export interface ValidateStep {
    canContinue:() => Promise<boolean> |  boolean;
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
    {
        name: 'Agregar preguntas enlazadas',
        component: SubquestionForm
    },
];
