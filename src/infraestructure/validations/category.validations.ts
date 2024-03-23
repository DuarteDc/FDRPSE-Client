import * as Yup from 'yup';

export const createCategoryValidation = () => ({
    name: Yup.string().required('El campo de nombre es obligatorio').min(8, 'El nombre debe contener al menos 8 caracteres').max(200, 'El nombre debe contener 200 caracteres como máximo'),
});