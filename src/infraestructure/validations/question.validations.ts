import * as Yup from 'yup';

import { createFieldQuestionValidations } from '../../app/helpers/createFieldsQuestionValidations';

export const qustionAnswerValidation = (questions: any) => createFieldQuestionValidations(questions);

export const createQuestionValidation = () => ({
    name            : Yup.string().required('El campo pregunta es obligatorio').min(8, 'La pregunta debe contener al menos 8 caracteres').max(200, 'La pregunta debe contener 200 caracteres como máximo'),
    type            : Yup.string().required('El tipo de pregunta es requerido'),
    category_id     : Yup.string(),
    domain_id       : Yup.string(), 
    dimension_id    : Yup.string().when('gradable', {
        is: 'gradable',
        then: (schema) => schema.required('El campo de categoría es obligatorio')
    })
})