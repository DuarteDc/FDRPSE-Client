import * as Yup from 'yup';
import { useFormik } from 'formik';
import { GoogleLogin } from '@react-oauth/google';
import { Button, Input, Spinner } from '@nextui-org/react';
2
import { LockIcon, UserIcon } from '../icons';
import { loginValidation } from '../../validations/auth.validations';
import { authService } from '../../../domain/services/auth.service';

import { LoginRequestDto } from '../../http/dto/auth';

export const LoginForm = () => {

    const { startSignin, loading } = authService();

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: Yup.object(loginValidation()),
        onSubmit: (data: LoginRequestDto) => startSignin(data),
    });
    return (
        <div className="lg:px-10 xl:px-28 col-span-3">
            <form onSubmit={formik.handleSubmit}>
                <h1 className="text-center font-bold text-3xl mb-20 mt-10">Iniciar sesión <b className="text-emerald-600">en tu cuenta</b></h1>
                <h2 className="text-gray-500 font-semibold text-center text-sm">¡Bienvenido de vuelta! Por favor, introduce tus credenciales para acceder a tu cuenta.</h2>
                <Input
                    placeholder="Username"
                    className="my-5 text-gray-500"
                    size="md"
                    name="username"
                    startContent={
                        <UserIcon />
                    }
                    isInvalid={formik.touched.username && formik.errors.username ? true : false}
                    errorMessage={formik.touched.username && formik.errors.username && formik.errors.username}
                    onChange={formik.handleChange}
                />
                <Input
                    placeholder="Contraseña"
                    className="my-5 text-gray-500"
                    name="password"
                    type="password"
                    size="md"
                    startContent={
                        <LockIcon />
                    }
                    isInvalid={formik.touched.password && formik.errors.password ? true : false}
                    errorMessage={formik.touched.password && formik.errors.password && formik.errors.password}
                    onChange={formik.handleChange}
                />
                {/* <span className="text-emerald-500 text-xs font-semibold text-right w-full block my-5 cursor-pointer hover:text-emerald-600 transition-all duration-200 ease-in-out">¿Olvidaste tu contraseña?</span> */}
                <Button
                    className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                    isLoading={loading}
                    spinner={<Spinner size="sm" color="current" />}
                    size="lg"
                    type="submit"
                >
                    Iniciar Sesión
                </Button>
            </form>
        </div>
    )
}