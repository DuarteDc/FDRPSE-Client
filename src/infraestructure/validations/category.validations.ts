import * as Yup from 'yup';

export const createCategoryValidation = () => ({
    name: Yup.string().required('El campo de nombre es obligatorio').min(8, 'El nombre debe contener al menos 8 caracteres').max(200, 'El nombre debe contener 200 caracteres como máximo'),

    despicable: Yup.number().required('La calificación nula o despreciable es requerida')
        .positive('La calificación nula o despreciable es requerida')
        .min(1, 'La calificación nula o despreciable debe de ser de al menos 1')
        .typeError('La calificación debe de ser un número'),

    low: Yup.number().required('La calificación baja es requerida')
        .positive('La calificación baja es requerida').when('despicable', ([despicable], shcema) => {
            return despicable ? shcema.min(despicable + 1, `La calificación debe ser mayor o igual a ${despicable + 1}`) : shcema.typeError('')
        })
        .typeError('La calificación debe de ser un número'),

    middle: Yup.number().required('La calificación media es requerida')
        .positive('La calificación media es requerida').when('low', ([low], shcema) => {
            return low ? shcema.min(low + 1, `La calificación debe ser mayor igual mayor que ${low + 1}`) : shcema.typeError('')
        })
        .typeError('La calificación debe de ser un número'),

    high: Yup.number().required('La calificación alta es requerida')
        .positive('La calificación alta es requerida').when('middle', ([middle], shcema) => {
            return middle ? shcema.min(middle + 1, `La calificación debe ser mayor igual a que ${middle + 1}`) : shcema.typeError('')
        })
        .typeError('La calificación debe de ser un número'),

    very_hight: Yup.number().required('La calificación muy alta es requerida')
        .positive('La calificación muy alta es requerida').when('high', ([high], shcema) => {
            return high ? shcema.min(high + 1, `La calificación debe ser mayor o igual que ${high + 1}`) : shcema.typeError('')
        })
        .typeError('La calificación debe de ser un número'),

});