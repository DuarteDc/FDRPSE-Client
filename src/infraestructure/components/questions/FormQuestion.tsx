import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { BoxIcon, CategoryIcon, DimensionsIcon, InfoCircle, QuestionIcon, StarsIcon } from '../icons';
import { createQuestionValidation } from '../../validations/question.validations';

import { useQuestion } from '../../../app/hooks/useQuestion';
import type { ValidateStep } from '../../../app/utils/questionSteps';
import { RadioGroupStyled } from '../ui';


export const FormQuestion = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { preSaveQuestion, question, domains, categories, dimensions, } = useQuestion();

    const formik = useFormik({
        initialValues: { name: question?.name || '', type: question?.type || 'gradable', category_id: question?.category?.id || '', domain_id: question?.domain?.id || '', dimension_id: question?.dimension?.id || '', section_id: '' },
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
        <form className="[&>div>*]:text-emerald-600">
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
            <RadioGroupStyled
                value={formik.values.type}
                onChange={formik.handleChange}
                isInvalid={formik.touched.type && formik.errors.type ? true : false}
                errorMessage={formik.touched.type && formik.errors.type && formik.errors.type}
                name="type"
                orientation="horizontal"
                className="my-10"
            >
                <RadioGroupStyled.RadioItem
                    title="Pregunta con calificación"
                    value="gradable"
                    description="Esta opcion te permite crear preguntas con calificación"
                    icon={<StarsIcon strokeWidth={2} />}
                />
                <RadioGroupStyled.RadioItem
                    title="Pregunta sin calificación"
                    value="nongradable"
                    description="Esta opcion te permite crear preguntas sin calificación"
                    icon={<InfoCircle strokeWidth={2} />}
                />
            </RadioGroupStyled>
            {
                formik.values.type === 'gradable' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-3">
                        <Select
                            items={dimensions}
                            label="Dimensiones"
                            name="dimension_id"
                            size="md"
                            isRequired
                            className="my-2 text-gray-500"
                            startContent={<DimensionsIcon />}
                            defaultSelectedKeys={formik.values.dimension_id ? [`${formik.values?.dimension_id}`] : []}
                            disallowEmptySelection={false}
                            onChange={formik.handleChange}
                            placeholder=""
                            isInvalid={formik.touched.dimension_id && formik.errors.dimension_id ? true : false}
                            errorMessage={formik.touched.dimension_id && formik.errors.dimension_id && formik.errors.dimension_id}
                        >
                            {

                                ({ id, name }) => (
                                    <SelectItem key={id} textValue={name}>
                                        {name}
                                    </SelectItem>
                                )
                            }

                        </Select>

                        <Select
                            items={categories}
                            label="Categorías"
                            name="category_id"
                            size="md"
                            className="my-2 text-gray-500"
                            startContent={<CategoryIcon />}
                            onChange={formik.handleChange}
                            defaultSelectedKeys={formik.values.category_id ? [`${formik.values?.category_id}`] : []}
                            placeholder=""
                            isInvalid={formik.touched.category_id && formik.errors.category_id ? true : false}
                            errorMessage={formik.touched.category_id && formik.errors.category_id && formik.errors.category_id}
                        >
                            {
                                ({ id, name }) => (
                                    <SelectItem key={id} textValue={name}>
                                        {name}
                                    </SelectItem>
                                )
                            }
                        </Select>
                        <Select
                            items={domains}
                            label="Dominios"
                            name="domain_id"
                            size="md"
                            className="my-2 text-gray-500"
                            startContent={<BoxIcon />}
                            onChange={formik.handleChange}
                            defaultSelectedKeys={formik.values.domain_id ? [`${formik.values?.domain_id}`] : []}
                            placeholder=""
                            isInvalid={formik.touched.domain_id && formik.errors.domain_id ? true : false}
                            errorMessage={formik.touched.domain_id && formik.errors.domain_id && formik.errors.domain_id}
                        >
                            {
                                ({ id, name }) => (
                                    <SelectItem value={`${id}`} key={id}>
                                        {name}
                                    </SelectItem>
                                )
                            }
                        </Select>

                    </div>

                )
            }
        </form>
    )
});
