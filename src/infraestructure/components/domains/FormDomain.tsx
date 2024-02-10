import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner } from '@nextui-org/react';

import { BoxIcon, NumbersIcon } from '../icons';
import { domianService } from '../../../domain/services/domian.service';

import { createDomainValidation } from '../../validations/domain.validations';

export const FormDomain = () => {

    const { loading, startCreateDomain } = domianService();

    const formik = useFormik({
        initialValues: { name: '', despicable: 0, low: 0, middle: 0, high: 0, very_hight: 0 },
        validationSchema: Yup.object(createDomainValidation()),
        onSubmit: startCreateDomain,
    });

    return (
        <div className="col-span-2">
            <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text lg:text-2xl font-bold">Crea un dominio para agrupar tus pregustas</h2>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Nombre del dominio"
                    className="my-5 text-gray-500"
                    size="md"
                    name="name"
                    startContent={<BoxIcon />}
                    isInvalid={formik.touched.name && formik.errors.name ? true : false}
                    errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                    onChange={formik.handleChange}
                />
                <div className="grid lg:grid-cols-2 gap-x-4">
                    <Input
                        placeholder="Calificación nula o despreciable"
                        className="my-2 text-gray-500"
                        size="md"
                        name="despicable"
                        startContent={<NumbersIcon />}
                        isInvalid={formik.touched.despicable && formik.errors.despicable ? true : false}
                        errorMessage={formik.touched.despicable && formik.errors.despicable && formik.errors.despicable}
                        onChange={formik.handleChange}
                    />
                    <Input
                        placeholder="Calificación baja"
                        className="my-2 text-gray-500"
                        size="md"
                        name="low"
                        startContent={<NumbersIcon />}
                        isInvalid={formik.touched.low && formik.errors.low ? true : false}
                        errorMessage={formik.touched.low && formik.errors.low && formik.errors.low}
                        onChange={formik.handleChange}
                    />
                    <Input
                        placeholder="Calificación media"
                        className="my-2 text-gray-500"
                        size="md"
                        name="middle"
                        startContent={<NumbersIcon />}
                        isInvalid={formik.touched.middle && formik.errors.middle ? true : false}
                        errorMessage={formik.touched.middle && formik.errors.middle && formik.errors.middle}
                        onChange={formik.handleChange}
                    />
                    <Input
                        placeholder="Calificación alta"
                        className="my-2 text-gray-500"
                        size="md"
                        name="high"
                        startContent={<NumbersIcon />}
                        isInvalid={formik.touched.high && formik.errors.high ? true : false}
                        errorMessage={formik.touched.high && formik.errors.high && formik.errors.high}
                        onChange={formik.handleChange}
                    />
                    <Input
                        placeholder="Calificación muy alta"
                        className="my-2 text-gray-500"
                        size="md"
                        name="very_hight"
                        startContent={<NumbersIcon />}
                        isInvalid={formik.touched.very_hight && formik.errors.very_hight ? true : false}
                        errorMessage={formik.touched.very_hight && formik.errors.very_hight && formik.errors.very_hight}
                        onChange={formik.handleChange}
                    />
                </div>
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
