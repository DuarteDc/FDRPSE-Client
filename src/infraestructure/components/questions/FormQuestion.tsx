import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react';

import { DimensionsIcon } from '../icons';
import { createDimensionValidation } from '../../validations/dimension.validation';

import { Category, Dimension, Domain } from '../../../domain/models';
import { questionService } from '../../../domain/services/question.service';
import { useQuestion } from '../../../app/hooks/useQuestion';


interface Props {
    categories  : Array<Category>
    domain      : Array<Domain>
    dimension   : Array<Dimension>
}

export const FormQuestion = ({ categories, dimension, domain }: Props) => {

    const { preSaveQuestion, loading, } = useQuestion();

    const formik = useFormik({
        initialValues: { question: '', category_id: '', domain_id: '', dimension_id: '' },
        validationSchema: Yup.object(createDimensionValidation()),
        onSubmit: preSaveQuestion,
    })

    return (
        <div>
            <h2 className="bg-gradient-to-r from-primary to-emerald-600 inline-block text-transparent bg-clip-text text-base font-bold mt-20">Crea una pregunta y asignala a una categoría, dominio o dimensión</h2>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <Input
                    placeholder="Pregunta"
                    className="my-2 text-gray-500"
                    size="md"
                    name="question"
                    isRequired
                    startContent={<DimensionsIcon />}
                    isInvalid={formik.touched.question && formik.errors.question ? true : false}
                    errorMessage={formik.touched.question && formik.errors.question && formik.errors.question}
                    onChange={formik.handleChange}
                />
                <Select
                    label="Categorías"
                    className="my-2 text-gray-500"
                    isInvalid={formik.touched.category_id && formik.errors.category_id ? true : false}
                    errorMessage={formik.touched.category_id && formik.errors.category_id && formik.errors.category_id}
                    required={true}
                    onChange={formik.handleChange}
                    name="category_id"
                    isRequired
                    size="md"
                >
                    {
                        categories?.map(({ id, name }) => (
                            <SelectItem value={id} key={id}>
                                { name }
                            </SelectItem>
                        ))
                    } 
                </Select>
                <Select
                    label="Dominios"
                    className="my-2 text-gray-500"
                    isInvalid={formik.touched.domain_id && formik.errors.domain_id ? true : false}
                    errorMessage={formik.touched.domain_id && formik.errors.domain_id && formik.errors.domain_id}
                    required={true}
                    onChange={formik.handleChange}
                    name="domain_id"
                    size="md"
                >
                    {
                        domain?.map(({ id, name }) => (
                            <SelectItem value={id} key={id}>
                                { name }
                            </SelectItem>
                        ))
                    } 
                </Select>
                <Select
                    label="Dimensiones"
                    className="my-2 text-gray-500"
                    isInvalid={formik.touched.dimension_id && formik.errors.dimension_id ? true : false}
                    errorMessage={formik.touched.dimension_id && formik.errors.dimension_id && formik.errors.dimension_id}
                    required={true}
                    onChange={formik.handleChange}
                    name="dimension_id"
                    size="md"
                >
                    {
                        dimension?.map(({ id, name }) => (
                            <SelectItem value={id} key={id}>
                                { name }
                            </SelectItem>
                        ))
                    } 
                </Select>

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
