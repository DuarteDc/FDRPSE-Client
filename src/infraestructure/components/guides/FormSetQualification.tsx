import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Input } from '@nextui-org/react';
import { NumbersIcon } from '../icons';
import { validateQualification } from '../../validations/guide.validations';

export const FormSetQualification = () => {

    const formik = useFormik({
        initialValues: { despicable: 0, low: 0, middle: 0, high: 0, very_hight: 0 },
        validationSchema: Yup.object(validateQualification()),
        onSubmit: () => console.log('TODO send data'),
    });

    return (
        <form onSubmit={formik.handleSubmit}>
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
        </form>
    )
}
