import { ForwardedRef, forwardRef, useImperativeHandle, useEffect } from 'react';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input } from '@nextui-org/react';

import { NumbersIcon, StarsIcon } from '../icons';

import { ValidateStep, Props as PropsComponent } from '../../../app/utils/guideSteps';
import { guideService } from '../../../domain/services/guide.service';

import { validateQualification } from '../../validations/guide.validations';

export const SetQualification = forwardRef<PropsComponent & ValidateStep>(({ nextStep }: PropsComponent, ref: ForwardedRef<ValidateStep>) => {

    const { setQualifications, qualifications, guide } = guideService();

    useEffect(() => {
        if (String(guide?.gradable) === 'false' && nextStep) nextStep();
    }, []);

    const formik = useFormik({
        initialValues: {
            despicable: qualifications?.despicable || 0, low: qualifications?.low || 0, middle: qualifications?.middle || 0,
            high: qualifications?.high || 0, veryHigh: qualifications?.veryHigh || 0
        },
        validationSchema: Yup.object(validateQualification()),
        onSubmit: setQualifications
    });

    const canContinue = async (): Promise<boolean> => {
        if (String(guide?.gradable) === 'false') return true;
        formik.handleSubmit();
        const reasons = await formik.validateForm();
        return Object.keys(reasons).length <= 0;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }));

    return (
        <section>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <StarsIcon width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Asignar calificación al cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Aquí podras asignar la calificación con la que se evaluara el cuestionario</p>
            </span>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid lg:grid-cols-2 gap-x-4">
                    <Input
                        placeholder="Calificación nula o despreciable"
                        className="my-2 text-gray-500"
                        size="md"
                        name="despicable"
                        startContent={<NumbersIcon />}
                        value={formik?.values?.despicable + ''}
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
                        value={formik?.values?.low + ''}
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
                        value={formik?.values?.middle + ''}
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
                        value={formik?.values?.high + ''}
                        isInvalid={formik.touched.high && formik.errors.high ? true : false}
                        errorMessage={formik.touched.high && formik.errors.high && formik.errors.high}
                        onChange={formik.handleChange}
                    />
                    <Input
                        placeholder="Calificación muy alta"
                        className="my-2 text-gray-500"
                        size="md"
                        name="veryHigh"
                        startContent={<NumbersIcon />}
                        value={formik?.values?.veryHigh + ''}
                        isInvalid={formik.touched.veryHigh && formik.errors.veryHigh ? true : false}
                        errorMessage={formik.touched.veryHigh && formik.errors.veryHigh && formik.errors.veryHigh}
                        onChange={formik.handleChange}
                    />
                </div>
            </form>
        </section>
    )
})
