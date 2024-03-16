import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { AddQualification, FormQuestion, SetSection, ReviewQuestion } from '../../infraestructure/components/questions';
import { PlusIcon, SaveIcon, SectionIcon, StarsIcon } from '../../infraestructure/components/icons';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';

export interface ValidateStep {
    canContinue:() =>  boolean | Promise<boolean>;
}
export interface Props {
    step?: number,
    nextStep?: () => void;
    backStep?: () => void;
}
export interface StepComponent {
    name            : string;
    component       : ForwardRefExoticComponent<Props & RefAttributes<ValidateStep>>;
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
        name: 'Asignar sección',
        component: SetSection,
        icon: SectionIcon
    },
    {
        name: 'Antes de guardar',
        component: ReviewQuestion,
        icon: SaveIcon
    }
];
