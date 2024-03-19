import * as Yup from 'yup';
import { useFormik } from 'formik'
import { Button, Input, Spinner, Switch, cn } from '@nextui-org/react'

import { CheckboxIcon, InfoCircle, QuestionIcon, SectionIcon, StarsIcon, StarsOff } from '../icons'
import { createSectionValidation } from '../../validations/section.validation';
import { sectionService } from '../../../domain/services/section.service';
import { CreateSectionDto } from '../../http/dto/sections';
import { RadioGroupStyled } from '../ui';

interface Props {
    onClose: () => void;
    loading: boolean;
}

export const SectionForm = ({ onClose }: Props) => {

    const { startCreateSection, loading } = sectionService({});

    const formik = useFormik({
        initialValues: { name: '', binary: false, question: '', can_finish_guide: false, type: 'gradable' },
        validationSchema: Yup.object(createSectionValidation()),
        onSubmit: (data: CreateSectionDto) =>
            startCreateSection(data).then(() => onClose())

    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input
                placeholder="Nombre de la sección"
                className="my-5 text-gray-500 [&>div>div>div>svg]:text-emerald-600 [&>div>div>div>svg]:p-1 [&>div>div>div>svg]:rounded-full [&>div>div>div>svg]:border-2"
                size="md"
                name="name"
                startContent={
                    <SectionIcon strokeWidth={2.5} height={30} width={30} />
                }
                isInvalid={formik.touched.name && formik.errors.name ? true : false}
                errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                onChange={formik.handleChange}
            />
            <span className="font-bold block my-2">¿La pregunta es opcional?</span>
            <RadioGroupStyled
                orientation="horizontal"
                name="binary"
                onChange={formik.handleChange}
                isInvalid={formik.touched.binary && formik.errors.binary ? true : false}
                errorMessage={formik.touched.binary && formik.errors.binary && formik.errors.binary}
                value={formik.values.binary + ''}
                defautlValue="false"
            >
                <RadioGroupStyled.RadioItem
                    icon={<InfoCircle strokeWidth={2} />}
                    title="Si"
                    value="true"
                    description="Al seleccionar esta opcion la sección podra ser omitida"
                />
                <RadioGroupStyled.RadioItem
                    icon={<CheckboxIcon strokeWidth={2} />}
                    title="No"
                    value="false"
                    description="Al seleccionar esta opcion la sección no podra ser omitida"
                />
            </RadioGroupStyled>

            {
                String(formik.values?.binary) === 'true' && (
                    <Input
                        placeholder="Nombre de la pregunta"
                        className="my-5 text-gray-500 [&>div>div>div>svg]:text-emerald-600 [&>div>div>div>svg]:p-1 [&>div>div>div>svg]:rounded-full [&>div>div>div>svg]:border-2"
                        size="md"
                        name="question"
                        startContent={
                            <QuestionIcon strokeWidth={2.5} height={30} width={30} />
                        }
                        isInvalid={formik.touched.question && formik.errors.question ? true : false}
                        errorMessage={formik.touched.question && formik.errors.question && formik.errors.question}
                        onChange={formik.handleChange}
                    />
                )
            }
            <span className="font-bold block my-2">Selecciona el tipo de sección</span>
            <RadioGroupStyled
                orientation="horizontal"
                name="type"
                onChange={formik.handleChange}
                isInvalid={formik.touched.type && formik.errors.type ? true : false}
                errorMessage={formik.touched.type && formik.errors.type && formik.errors.type}
                value={formik.values.type + ''}
                defautlValue="gradable"
            >
                <RadioGroupStyled.RadioItem
                    icon={<StarsIcon strokeWidth={2} />}
                    title="Sección con calificación"
                    value="gradable"
                    description="Al seleccionar esta opcion la sección sólo podra contener preguntas con calificación"
                />
                <RadioGroupStyled.RadioItem
                    icon={<StarsOff strokeWidth={2} />}
                    title="Sección sin calificación"
                    value="nongradable"
                    description="Al seleccionar esta opcion la sección sólo podra contener preguntas sin calificación"
                />
            </RadioGroupStyled>
            <Switch
                classNames={{
                    base: cn(
                        "inline-flex flex-row-reverse w-full items-center my-4",
                        "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent w-full",
                        "data-[selected=true]:border-emerald-600",
                    ),
                    wrapper: "p-0 h-4 overflow-visible group-data-[selected]:bg-emerald-600",
                    thumb: cn("w-6 h-6 border-2 shadow-lg",
                        "group-data-[hover=true]:border-emerald-600",
                        //selected
                        "group-data-[selected=true]:ml-6 bg-emerald-500",
                        // pressed
                        "group-data-[pressed=true]:w-7",
                        "group-data-[selected]:group-data-[pressed]:ml-4  group-data-[selected]:bg-emerald-500",
                    ),
                }}
                name="can_finish_guide"
                onChange={formik.handleChange}
            >
                <div className="flex flex-col gap-1 w-full">
                    <p className="text-medium font-bold">¿La sección puede terminar el cuestionario?</p>
                    <p className="text-tiny text-default-400 font-bold">
                        Al activar esta opcion la sección puede culminar el cuestionaro por lo que las secciones posteriores a esta podran ser omitidas
                    </p>
                </div>
            </Switch>
            <Button
                className="w-full mt-5 bg-slate-800 py-7 text-white font-bold text-xs"
                isLoading={loading}
                spinner={<Spinner size="sm" color="current" />}
                size="lg"
                type="submit"
            >
                Guardar
            </Button>

        </form >
    )
}
