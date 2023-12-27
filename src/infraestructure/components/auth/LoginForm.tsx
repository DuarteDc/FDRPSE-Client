import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button, Input } from '@nextui-org/react';

import { GoogleIcon, LockIcon, UserIcon } from '../icons';
import { loginValidation } from '../../validations/auth.validations';
import { authService } from '../../../domain/services/auth.service';

import { LoginRequestDto } from '../../http/dto/auth';

export const LoginForm = () => {

    const { startSignin } = authService();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object(loginValidation()),
        onSubmit: (data: LoginRequestDto) => startSignin(data),
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1 className="text-center font-bold text-3xl mb-20 mt-10">Iniciar Sesión</h1>
                <Input
                    placeholder="Correo electronico"
                    className="my-5 text-gray-500"
                    size="lg"
                    name="email"
                    startContent={
                        <UserIcon />
                    }
                    isInvalid={formik.touched.email && formik.errors.email ? true : false}
                    errorMessage={formik.touched.email && formik.errors.email && formik.errors.email}
                    onChange={formik.handleChange}
                />
                <Input
                    placeholder="Contraseña"
                    className="my-5 text-gray-500"
                    name="password"
                    type="password"
                    size="lg"
                    startContent={
                        <LockIcon />
                    }
                    isInvalid={formik.touched.password && formik.errors.password ? true : false}
                    errorMessage={formik.touched.password && formik.errors.password && formik.errors.password}
                    onChange={formik.handleChange}
                />
                <span className="text-slate-800 text-sm text-right w-full block my-5 underline">Olvide mi Contraseña</span>
                <Button className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs" size="lg" type="submit">Iniciar Sesión</Button>
            </form>
            <span className="text-gray-400 text-xs text-center w-full block mt-12">O iniciar con</span>
            <div className="flex justify-center">
                <Button className=" bg-gray-100 p-8 border-1 border-gray-400 text-blue-600">
                    <GoogleIcon />
                </Button>

            </div>
        </div>
    )
}