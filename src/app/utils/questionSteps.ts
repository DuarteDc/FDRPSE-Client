import { FormQuestion } from '../../infraestructure/components/questions';


export interface StepComponent {
    name            : string;
    component       : any
}

export const QUESTION_STEPS: Array<StepComponent> = [
    {
        name: 'Crear pregunta',
        component: FormQuestion,
    },
    {
        name: 'Agregar calificación',
        component: FormQuestion
    },
    {
        name: 'Agregar preguntas enlazadas',
        component: FormQuestion
    },
];
