import { useState, createRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner } from '@nextui-org/react';

import { CategoryIcon, PlusIcon } from '../icons';
import { categoriesService } from '../../../domain/services/categories.service';

import { createCategoryValidation } from '../../validations/category.validations';
import { FormQualification } from '../ui';
import { QualifictionFormData } from '../ui/FormQualification';
import { warningAlert } from '../../alert/alerts';

export interface Qualifictions {
    id: string;
    despicable: number;
    low: number;
    middle: number;
    high: number;
    very_high: number;
}

const initialState: Qualifictions = {
    id: new Date().getTime().toString(),
    despicable: 0,
    low: 0,
    middle: 0,
    high: 0,
    very_high: 0
}
export const FormCategory = () => {

    const { startCreateCategory, loading } = categoriesService();
    const [qualifications, setQualifications] = useState<Array<Qualifictions>>([initialState]);

    const formik = useFormik({
        initialValues: { name: ''},
        validationSchema: Yup.object(createCategoryValidation()),
        onSubmit: (data) => startCreateCategory(data, qualifications),
    })

    const removeQualification = (qualificationId: string) => {
        setQualifications(prev => prev.filter(qualification => qualification.id !== qualificationId));
    }

    const handleSetFormData = (formData: Qualifictions) => {
        setQualifications(prev => prev.map(qualification => qualification.id === formData.id ? formData : qualification));
    }

    const sendFormRef = qualifications.map(() => createRef<QualifictionFormData>());

    const handleSendMainForm = async () => {
        if (!qualifications.length) return warningAlert('La categoría debe contener al menos una calificación para poder ser creada');
        const promiseFormStatus = await Promise.all(sendFormRef.map(async (ref) => await ref.current!.sendFrom()));
        return !promiseFormStatus.includes(false) && formik.handleSubmit();
    }

    return (
        <div className="col-span-2 w-full px-5 transition-all duration-400">
            <form onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Nombre de la categoría"
                    className="my-5 text-gray-500"
                    size="md"
                    name="name"
                    startContent={<CategoryIcon />}
                    isInvalid={formik.touched.name && formik.errors.name ? true : false}
                    errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                    onChange={formik.handleChange}
                />
                <div className="flex flex-wrap items-center justify-end lg:justify-between">
                    <p className="text-gray-500 font-bold text-xs pb-5 bg-e">
                        La categoria tiene la posibilidad de tener multiples calificaciones con las cuales puede ser calificada
                    </p>
                    <Button
                        className="bg-slate-800 text-white"
                        startContent={
                            <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                                <PlusIcon strokeWidth={2} height={18} width={18} />
                            </span>
                        }
                        onClick={() => setQualifications(prev => [...prev, { ...initialState, id: new Date().getTime().toString(), }])}>
                        Agregar calificación
                    </Button>
                </div>
                {
                    qualifications.map((qualification, index) => (
                        <FormQualification
                            key={qualification.id}
                            ref={sendFormRef[index]}
                            saveFormQualification={handleSetFormData}
                            initialState={qualification}
                            removeQualification={removeQualification}
                        />
                    ))
                }
                <Button
                    className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                    isLoading={loading}
                    spinner={<Spinner size="sm" color="current" />}
                    size="lg"
                    type="button"
                    onClick={handleSendMainForm}
                >
                    Crear
                </Button>
            </form>
        </div>
    )
}
