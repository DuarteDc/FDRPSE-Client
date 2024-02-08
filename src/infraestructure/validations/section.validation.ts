import * as Yup from 'yup';

export const createSectionValidation = () => ({
    name: Yup.string().required('El campo de nombre es obligatorio').min(8, 'El nombre debe contener al menos 8 caracteres').max(200, 'El nombre debe contener 200 caracteres como máximo'),
    binary: Yup.boolean().required('El campo es requerido'),
    question: Yup.string().when('binary', {
        is: true,
        then: (schema) => schema.required('La pregunta es requerida cuando deseas que la sección sea opcional')
            .min(8, 'El nombre debe contener al menos 8 caracteres')
            .max(200, 'El nombre debe contener 200 caracteres como máximo'),
    })
})