import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Spinner, Tooltip } from '@nextui-org/react';

import { CategoryIcon, PlusIcon } from '../icons';
import { categoriesService } from '../../../domain/services/categories.service';

import { createCategoryValidation } from '../../validations/category.validations';
import { FormQualification } from '../ui';


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
export const FormCategory = () => {

    const { startCreateCategory, loading } = categoriesService();
    const [qualifications, setQualifications] = useState<Array<Qualifictions>>([initialState]);

    const formik = useFormik({
        initialValues: { name: 'xsxxaasasdasdad', despicable: 0, low: 0, middle: 0, high: 0, very_hight: 0 },
        validationSchema: Yup.object(createCategoryValidation()),
        onSubmit: startCreateCategory,
    })

    const removeQualification = (qualificationId: string) => {
        setQualifications(prev => prev.filter(qualification => qualification.id !== qualificationId));
    }

    return (
        <div className="col-span-2">
            <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text lg:text-2xl font-bold">Crea una categoria para agrupar tus pregustas</h2>
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
                <div className="flex items-center justify-between">
                    <p className="text-gray-500 font-bold text-xs pb-5">
                        La categoria tiene la posibilidad de tener multiples calificaciones
                    </p>
                    <Button
                        className="bg-slate-800 text-white"
                        startContent={
                            <PlusIcon strokeWidth={2} />
                        }
                        onClick={() => setQualifications(prev => [...prev, { ...initialState, id: crypto.randomUUID() }])}>
                        Agregar formulario
                    </Button>
                </div>
                {
                    qualifications.map((qualification) => (
                        <FormQualification
                            key={qualification.id}
                            initialState={qualification}
                            removeQualification={removeQualification}
                            validationForm={createCategoryValidation}
                        />
                    ))
                }
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
