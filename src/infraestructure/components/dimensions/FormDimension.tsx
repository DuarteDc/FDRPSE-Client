import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner } from '@nextui-org/react';

import { DimensionsIcon, SaveIcon } from '../icons';
import { dimensionService } from '../../../domain/services/dimension.service';
import { createDimensionValidation } from '../../validations/dimension.validation';

interface Props {
    title?: string
    hasEditon?: boolean;
    callback?: CallableFunction;
}

export const FormDimension = ({ hasEditon = false, title = "Crea una dimensión para agrupar tus pregustas", callback }: Props) => {

    const { loading, dimension, startCreateDimension, startUpdateDimension } = dimensionService();

    const formik = useFormik({
        initialValues: { name: (dimension?.name && hasEditon) ? dimension.name : '', },
        validationSchema: Yup.object(createDimensionValidation()),
        onSubmit: (data) => {
            (hasEditon) ? startUpdateDimension(dimension!.id, data, callback) : startCreateDimension(data);
        }
    })

    return (
        <div className="col-span-2">
            <h2 className={`bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-base font-bold ${!hasEditon && 'mt-40'}`}>
                {title}
            </h2>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Nombre de la dimensión"
                    className="my-5 text-emerald-600"
                    size="md"
                    name="name"
                    value={formik.values.name}
                    startContent={<DimensionsIcon strokeWidth={1.8} />}
                    isInvalid={formik.touched.name && formik.errors.name ? true : false}
                    errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                    onChange={formik.handleChange}
                />
                <Button
                    className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                    isLoading={loading}
                    spinner={<Spinner size="sm" color="current" />}
                    startContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            <SaveIcon strokeWidth={1.5} height={22} width={22} />
                        </span>
                    }
                    size="lg"
                    type="submit"
                >
                    {
                        hasEditon ? 'Actualizar' : 'Crear'
                    }
                </Button>
            </form>
        </div>
    )
}
