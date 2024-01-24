import { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Input, Select, SelectItem } from '@nextui-org/react';

import { BoxIcon, CategoryIcon, DimensionsIcon, QuestionIcon } from '../icons';
import { createDimensionValidation } from '../../validations/dimension.validation';

import { CategoryContext } from '../../context/category';
import { DimensionContext } from '../../context/dimension';
import { DomainContext } from '../../context/domain';
import { useQuestion } from '../../../app/hooks/useQuestion';

export const FormQuestion = forwardRef<any>((props: any, ref: any) => {

    const isValid = useRef<any>(false);

    const { domains } = useContext(DomainContext);
    const { categories } = useContext(CategoryContext);
    const { dimensions } = useContext(DimensionContext);

    const { preSaveQuestion } = useQuestion();

    const formik = useFormik({
        initialValues: { question: '', category_id: '', domain_id: '', dimension_id: '' },
        validationSchema: Yup.object(createDimensionValidation()),
        onSubmit: preSaveQuestion,
    });

    const canContinue = () => {
        formik.validateForm().then((reason) => isValid.current = reason);
        console.log(isValid.current);
        return false;
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
                name="question"
                isRequired
                startContent={<QuestionIcon />}
                onChange={formik.handleChange}
                isInvalid={formik.touched.question && formik.errors.question ? true : false}
                errorMessage={formik.touched.question && formik.errors.question && formik.errors.question}
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
                    isInvalid={formik.touched.category_id && formik.errors.category_id ? true : false}
                    errorMessage={formik.touched.category_id && formik.errors.category_id && formik.errors.category_id}
                >
                    {
                        categories?.map(({ id, name }) => (
                            <SelectItem value={id} key={id}>
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
                    isInvalid={formik.touched.domain_id && formik.errors.domain_id ? true : false}
                    errorMessage={formik.touched.domain_id && formik.errors.domain_id && formik.errors.domain_id}
                >
                    {
                        domains?.map(({ id, name }) => (
                            <SelectItem value={id} key={id}>
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
                    isInvalid={formik.touched.dimension_id && formik.errors.dimension_id ? true : false}
                    errorMessage={formik.touched.dimension_id && formik.errors.dimension_id && formik.errors.dimension_id}
                >
                    {
                        dimensions?.map(({ id, name }) => (
                            <SelectItem value={id} key={id}>
                                {name}
                            </SelectItem>
                        ))
                    }
                </Select>
            </div>
        </form>
    )
});
