import * as Yup from 'yup';

export const loginValidation = () => ({
    email: Yup.string().email('La dirección de correo proporcionada no es válida').required('El campo de correo electrónico es obligatorio'),
    password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required('El campo de contraseña es obligatorio'),
});

export const forgotPasswordValidations = () => ({
    email: Yup.string().email('La dirección de correo no es valida').required('El correo es requerido'),
});

// export const changePassword = () => ({
//     password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required('La contraseña es requerida'),
//     confirm_password: Yup.string().required('Confirma la contraseña para continuar').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
// });