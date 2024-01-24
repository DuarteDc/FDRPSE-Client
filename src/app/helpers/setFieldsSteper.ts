import { StepComponent } from '../utils/questionSteps';

export interface FieldsSteper {
    [name: string]: boolean;
}

export const setFieldsSteper = (stepsComponent: Array<StepComponent>): FieldsSteper => {
    let fieldsSteper = {};
    stepsComponent.forEach(({ name }) => {
        fieldsSteper = { ...fieldsSteper, [name]: false };
    });
    return fieldsSteper;
}