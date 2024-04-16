import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner } from '@nextui-org/react';

import { BoxIcon, PlusIcon, SaveIcon } from '../icons';
import { domianService } from '../../../domain/services/domian.service';

import { createDomainValidation } from '../../validations/domain.validations';
import { createRef, useState } from 'react';
import { FormQualification, QualifictionFormData } from '../ui/FormQualification';
import { warningAlert } from '../../alert/alerts';

interface Qualifictions {
    id: string;
    despicable: number;
    low: number;
    middle: number;
    high: number;
    very_high: number;
}

const initialState: Qualifictions = {
    id: crypto.randomUUID(),
    despicable: 0,
    low: 0,
    middle: 0,
    high: 0,
    very_high: 0
}

export const FormDomain = () => {

    const { loading, startCreateDomain } = domianService();
    const [qualifications, setQualifications] = useState<Array<Qualifictions>>([initialState]);


    const formik = useFormik({
        initialValues: { name: '' },
        validationSchema: Yup.object(createDomainValidation()),
        onSubmit: (data) => startCreateDomain(data, qualifications),
    });


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
                <div className="flex flex-wrap items-center justify-end lg:justify-between">
                    <p className="text-gray-500 font-bold text-xs pb-5 bg-e">
                        El dominio tiene la posibilidad de tener multiples calificaciones con las cuales puede ser calificada
                    </p>
                    <Button
                        className="bg-slate-800 text-white"
                        startContent={
                            <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                                <PlusIcon strokeWidth={2} height={18} width={18} />
                            </span>
                        }
                        onClick={() => setQualifications(prev => [...prev, { ...initialState, id: crypto.randomUUID() }])}>
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
                    startContent={
                        <span className="w-[1.5rem] h-[1.5rem] bg-white text-black rounded-full flex justify-center items-center">
                            <SaveIcon strokeWidth={1.5} height={22} width={22} />
                        </span>
                    }
                    onClick={handleSendMainForm}
                >
                    Crear
                </Button>
            </form>
        </div>
    )
}
