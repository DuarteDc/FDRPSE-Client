import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Select, Spinner } from '@nextui-org/react';

import { DimensionsIcon } from '../icons';
import { createDimensionValidation } from '../../validations/dimension.validation';
import { useQuestion } from '../../../app/hooks/useQuestion';

export const FormQuestion = () => {

    const { preSaveQuestion, loading } = useQuestion();
    console.log(loading);

    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: Yup.object(createDimensionValidation()),
        onSubmit: ({ name }) => preSaveQuestion(name),
    })

    return (
        <div>
            <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-base font-bold mt-40">Crea una pregunta y asignala a una categoría, dominio o dimensión</h2>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Pregunta"
                    className="my-5 text-gray-500"
                    size="md"
                    name="name"
                    startContent={<DimensionsIcon />}
                    isInvalid={formik.touched.name && formik.errors.name ? true : false}
                    errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                    onChange={formik.handleChange}
                />
                <Button
                    className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                    isLoading={loading}
                    spinner={<Spinner size="sm" color="current" />}
                    size="lg"
                    type="submit"
                >
                    Crear
                </Button>
            </form>
        </div>
    )
}
