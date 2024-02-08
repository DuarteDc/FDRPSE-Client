import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { BoxIcon, CategoryIcon, DimensionsIcon, QuestionIcon } from '../icons';
import { createQuestionValidation } from '../../validations/question.validations';

import { useQuestion } from '../../../app/hooks/useQuestion';
import type { ValidateStep } from '../../../app/utils/questionSteps';


export const FormQuestion = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { preSaveQuestion, question, domains, categories, dimensions, } = useQuestion();

    const formik = useFormik({
        initialValues: { name: question?.name || '', category_id: question?.category?.id || '', domain_id: question?.domain?.id || '', dimension_id: question?.dimension?.id || '', section_id: '' },
        validationSchema: Yup.object(createQuestionValidation()),
        onSubmit: preSaveQuestion,
    });

    const canContinue = async (): Promise<boolean> => {
        formik.handleSubmit();
        const reasons = await formik.validateForm();
        return Object.keys(reasons).length <= 0;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }));

    return (
        <form>
            <Input
                placeholder="Pregunta"
                className="my-2 text-gray-500"
                size="md"
                name="name"
                isRequired
                startContent={<QuestionIcon />}
                value={formik.values.name}
                onChange={formik.handleChange}
                isInvalid={formik.touched.name && formik.errors.name ? true : false}
                errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3">
                <Select
                    label="Categorías"
                    name="category_id"
                    size="md"
                    className="my-2 text-gray-500"
                    isRequired
                    startContent={<CategoryIcon />}
                    onChange={formik.handleChange}
                    selectedKeys={[`${formik.values?.category_id}`]}
                    isInvalid={formik.touched.category_id && formik.errors.category_id ? true : false}
                    errorMessage={formik.touched.category_id && formik.errors.category_id && formik.errors.category_id}
                >
                    {
                        categories?.map(({ id, name }) => (
                            <SelectItem value={`${id}`} key={id}>
                                {name}
                            </SelectItem>
                        ))
                    }
                </Select>
                <Select
                    label="Dominios"
                    name="domain_id"
                    size="md"
                    className="my-2 text-gray-500"
                    startContent={<BoxIcon />}
                    onChange={formik.handleChange}
                    selectedKeys={[`${formik.values?.domain_id}`]}
                    isInvalid={formik.touched.domain_id && formik.errors.domain_id ? true : false}
                    errorMessage={formik.touched.domain_id && formik.errors.domain_id && formik.errors.domain_id}
                >
                    {
                        domains?.map(({ id, name }) => (
                            <SelectItem value={`${id}`} key={id}>
                                {name}
                            </SelectItem>
                        ))
                    }
                </Select>
                <Select
                    label="Dimensiones"
                    name="dimension_id"
                    size="md"
                    className="my-2 text-gray-500"
                    startContent={<DimensionsIcon />}
                    onChange={formik.handleChange}
                    selectedKeys={[`${formik.values?.dimension_id}`]}
                    isInvalid={formik.touched.dimension_id && formik.errors.dimension_id ? true : false}
                    errorMessage={formik.touched.dimension_id && formik.errors.dimension_id && formik.errors.dimension_id}
                >
                    {
                        dimensions?.map(({ id, name }) => (
                            <SelectItem value={`${id}`} key={id}>
                                {name}
                            </SelectItem>
                        ))
                    }
                </Select>
            </div>
        </form>
    )
});
