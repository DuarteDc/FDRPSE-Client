import { ForwardedRef, Fragment, forwardRef, useImperativeHandle, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Button, Input, Select, SelectItem, Selection, useDisclosure } from '@nextui-org/react';

import { BoxIcon, BrandDatabricks, CategoryIcon, DimensionsIcon, QuestionIcon, StarsIcon, StarsOff, XIcon } from '../icons';
import { createQuestionValidation } from '../../validations/question.validations';

import { useQuestion } from '../../../app/hooks/useQuestion';
import type { ValidateStep } from '../../../app/utils/questionSteps';
import { RadioGroupStyled } from '../ui';
import { Modal } from '../ui/Modal';
import { Category, Domain } from '../../../domain/models';


type SelectionType = 'categories' | 'domains';

export const FormQuestion = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState({})
    const { preSaveQuestion, question, domains, categories, dimensions, } = useQuestion();

    const formik = useFormik({
        initialValues:
        {
            name: question?.name || '', type: question?.type || 'gradable',
            category_id: question?.category?.id || '', domain_id: question?.domain?.id || '',
            dimension_id: question?.dimension?.id || '', section_id: ''
        },
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

    const handleSelectQualification = (type: SelectionType, selectedItem: string) => {
        if (type === 'categories') {
            const category = categories.find(category => category.id == selectedItem)!;
            if (category.qualificationsCount! === 1) return;
            setSelectedItem(category);
        } else {
            const domain = domains.find(domain => domain.id == selectedItem)!;
            // if(domains.qualificationsCount! === 1) return; 
            setSelectedItem(domain);
        }
        onOpen();
    }

    return (

        <Fragment>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <BrandDatabricks width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Datos Generales</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Ingresa los valores generales de la pregunta continuar</p>
            </span>
            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                hideCloseButton
                size="4xl"
                renderContent={(onClose) => (
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <StarsIcon width={35} height={35} strokeWidth={1.5} />
                                <h1>Lista de calificaciones</h1>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                        <code>
                            {
                                JSON.stringify(selectedItem)
                            }
                        </code>
                    </Fragment>
                )}
            />

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
                        icon={<StarsOff strokeWidth={2} />}
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
                                onChange={(event) => { formik.handleChange(event); handleSelectQualification('categories', event.target.value) }}
                                defaultSelectedKeys={formik.values.category_id ? [`${formik.values?.category_id}`] : []}
                                placeholder=""
                                isInvalid={formik.touched.category_id && formik.errors.category_id ? true : false}
                                errorMessage={formik.touched.category_id && formik.errors.category_id && formik.errors.category_id}
                            >
                                {
                                    ({ id, name }) => (
                                        <SelectItem
                                            key={id}
                                            textValue={name}
                                        >
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
                                onChange={(event) => { formik.handleChange(event); handleSelectQualification('domains', event.target.value) }}
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
        </Fragment>
    )
});
