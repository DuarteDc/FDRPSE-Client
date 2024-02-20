import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner } from '@nextui-org/react';

import { DimensionsIcon } from '../icons';
import { dimensionService } from '../../../domain/services/dimension.service';
import { createDimensionValidation } from '../../validations/dimension.validation';

export const FormDimension = () => {

    const { startCreateDimension, loading } = dimensionService();

    const formik = useFormik({
        initialValues: { name: '', },
        validationSchema: Yup.object(createDimensionValidation()),
        onSubmit: startCreateDimension,
    })

    return (
        <div className="col-span-2">
            <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-base font-bold mt-40">Crea una dimensión para agrupar tus pregustas</h2>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Nombre de la dimensión"
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
