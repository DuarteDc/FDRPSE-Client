import { AddQualification, FormQuestion } from '../../infraestructure/components/questions';

export interface StepComponent {
    name        : string;
    component   : () => JSX.Element;
}

export const QUESTION_STEPS: Array<StepComponent> = [
    {
        name: 'Crear pregunta',
        component: FormQuestion,
    },
    {
        name: 'Agregar calificación',
        component: AddQualification
    },
    {
        name: 'Agregar preguntas enlazadas',
        component: FormQuestion
    },
];
