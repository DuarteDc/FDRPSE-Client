import * as Yup from 'yup';

export const createDimensionValidation = () => ({
    question        : Yup.string().required('El campo pregunta es obligatorio').min(8, 'La pregunta debe contener al menos 8 caracteres').max(200, 'La pregunta debe contener 200 caracteres como máximo'),
    category_id     : Yup.string().required('El campo de categoría es obligatorio'),
    domain_id       : Yup.string(), 
    dimension_id    : Yup.string(), 
    // section_id      : Yup.string().required('Es necesario seleccionar una sección para poder continuar')
});