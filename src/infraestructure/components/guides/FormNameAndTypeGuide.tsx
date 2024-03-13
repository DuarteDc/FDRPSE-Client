import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input, Radio, RadioGroup, cn } from '@nextui-org/react';

import { BoxIcon, FileDescription, StarsIcon } from '../icons';
import { ValidateStep } from '../../../app/utils/guideSteps'
import { preSaveGuideValidation } from '../../validations/guide.validations';

export const FormNameAndTypeGuide = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const formik = useFormik({
        initialValues: { name: '', gradable: true },
        validationSchema: Yup.object(preSaveGuideValidation()),
        onSubmit: () => console.log('TODO send data'),
    })

    const canContinue = async (): Promise<boolean> => {
        formik.handleSubmit();
        const reasons = await formik.validateForm();
        return Object.keys(reasons).length <= 0;
    }


    useImperativeHandle(ref, () => ({
        canContinue,
    }));

    return (
        <div className="grid grid-cols-1">
            <form action="#" className="col-span-2">
                <div className="my-10">
                    <span className="mb-5 block">
                        <p className="font-bold">Nombre del cuestionario</p>
                        <p className="text-gray-500 font-bold text-xs pl-4">Asigna un nombre al cuestionario con el cual será mostrado a los usuarios</p>
                    </span>
                    <Input
                        placeholder="Nombre"
                        classNames={{
                            mainWrapper: cn(
                                "[&>div>div>svg]:text-emerald-600"
                            )
                        }}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.name && formik.errors.name ? true : false}
                        errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                        startContent={<FileDescription strokeWidth={1.5} />}
                    />
                </div>
                <div className="my-10">
                    <span className="mb-5 block">
                        <p className="font-bold">Tipo de cuestionario</p>
                        <p className="text-gray-500 font-bold text-xs pl-4">Seleciona el tipo de cuestionario que deseas crear</p>
                    </span>
                    <RadioGroup orientation="horizontal"
                        onChange={formik.handleChange}
                        name="gradable"
                        isInvalid={formik.touched.gradable && formik.errors.gradable ? true : false}
                        errorMessage={formik.touched.gradable && formik.errors.gradable && formik.errors.gradable}
                        value={formik.values.gradable + ''}
                    >
                        <Radio description="Esta opción te permite asignar secciones que contienen preguntas con un valor" value="true"
                            classNames={{
                                label: cn(
                                    "[&>svg]:text-emerald-600"
                                ),
                                base: cn(
                                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between font-bold",
                                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-2",
                                    "data-[selected=true]:border-emerald-500"
                                ),
                                description: cn(
                                    "text-xs"
                                )
                            }}
                        >
                            <StarsIcon strokeWidth={1} width={20} height={20} />
                            Cuestionario evaluativo
                        </Radio>

                        <Radio description="Esta opcion te permite crear cuestionarios con secciones que contienen preguntas sin valor" value="false" name="gradables"
                            classNames={{
                                label: cn(
                                    "[&>svg]:text-emerald-600"
                                ),
                                base: cn(
                                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between font-bold",
                                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-2",
                                    "data-[selected=true]:border-emerald-500",
                                ),
                                description: cn(
                                    "text-xs"
                                )
                            }}
                        >
                            <BoxIcon strokeWidth={1} width={20} height={20} />
                            Cuestionario informativo
                        </Radio>
                    </RadioGroup>
                </div>
            </form>
        </div>
    )
})
