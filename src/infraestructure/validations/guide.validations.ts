import * as Yup from 'yup';

export const preSaveGuideValidation = () => ({
    name: Yup.string().required('El campo nombre es obligatorio')
        .min(8, 'La pregunta debe contener al menos 8 caracteres')
        .max(200, 'La pregunta debe contener 200 caracteres como máximo'),
    gradable: Yup.boolean().required('El campo tipo de cuestionario es requerido'),
}); 