import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input, Spinner, Button, Tooltip } from '@nextui-org/react';
import { NumbersIcon, XIcon } from '../icons';

interface Qualifictions {
    id: string;
    despicable: number;
    low: number;
    middle: number;
    high: number;
    very_high: number;
}

interface Props {
    removeQualification: (qualificationId: string) => void;
    validationForm: () => Yup.ObjectShape,
    initialState: Qualifictions
}

export const FormQualification = ({ initialState, validationForm, removeQualification }: Props) => {

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: Yup.object(validationForm()),
        onSubmit: (data) => console.log(data),
    });

    return (
        <form onSubmit={formik.handleSubmit} className="[&>div>*]:text-emerald-600 border-2 px-2 mt-2 rounded-lg">
            <span className="flex items-center justify-end mt-2 mr-1">
                <p className="text-xs font-bold text-gray-400 mr-4">El formulario es independiente por lo que podras seleccionar la calificación que sea correcta para cada pregunta</p>
                <Tooltip content="Eliminar formulario" color="danger">
                    <Button
                        isIconOnly
                        size="sm"
                        className="bg-danger/20 text-danger rounded-full"
                        onClick={() => removeQualification(initialState.id)}>
                        <XIcon />
                    </Button>
                </Tooltip>
            </span>
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
                    name="very_high"
                    startContent={<NumbersIcon />}
                    isInvalid={formik.touched.very_high && formik.errors.very_high ? true : false}
                    errorMessage={formik.touched.very_high && formik.errors.very_high && formik.errors.very_high}
                    onChange={formik.handleChange}
                />
            </div>
        </form>
    )
}
