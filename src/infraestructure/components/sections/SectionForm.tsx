import * as Yup from 'yup';
import { useFormik } from 'formik'
import { Button, Input, Radio, RadioGroup, Spinner } from '@nextui-org/react'

import { QuestionIcon, SectionIcon } from '../icons'
import { createSectionValidation } from '../../validations/section.validation';
import { sectionService } from '../../../domain/services/section.service';
import { CreateSectionDto } from '../../http/dto/sections';

interface Props {
    onClose: () => void;
    loading: boolean;
}

export const SectionForm = ({ onClose }: Props) => {

    const { startCreateSection, loading } = sectionService();

    const formik = useFormik({
        initialValues: { name: '', binary: false, question: '' },
        validationSchema: Yup.object(createSectionValidation()),
        onSubmit: (data: CreateSectionDto) => startCreateSection(data).then(() => onClose())
    })

    const handleChangeOptionValue = (value: string) => {
        formik.setFieldValue(`binary`, JSON.parse(value), true);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input
                placeholder="Nombre de la sección"
                className="my-5 text-gray-500"
                size="md"
                name="name"
                startContent={
                    <SectionIcon />
                }
                isInvalid={formik.touched.name && formik.errors.name ? true : false}
                errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                onChange={formik.handleChange}
            />
            <RadioGroup
                label="¿La pregunta es opcional?"
                orientation="horizontal"
                name="binary"
                defaultValue="false"
                onValueChange={handleChangeOptionValue}
                isInvalid={formik.touched.binary && formik.errors.binary ? true : false}
                errorMessage={formik.touched.binary && formik.errors.binary && formik.errors.binary}
                value={formik.values.binary + ''}
            >
                <Radio value="true">Si</Radio>
                <Radio value="false">No</Radio>
            </RadioGroup>
            {
                formik.values.binary && (
                    <Input
                        placeholder="Nombre de la pregunta"
                        className="my-5 text-gray-500"
                        size="md"
                        name="question"
                        startContent={
                            <QuestionIcon />
                        }
                        isInvalid={formik.touched.question && formik.errors.question ? true : false}
                        errorMessage={formik.touched.question && formik.errors.question && formik.errors.question}
                        onChange={formik.handleChange}
                    />
                )
            }
            <Button
                className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                isLoading={loading}
                spinner={<Spinner size="sm" color="current" />}
                size="lg"
                type="submit"
            >
                Guardar
            </Button>

        </form>
    )
}
