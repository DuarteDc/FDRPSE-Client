import { ForwardedRef, Fragment, forwardRef, useEffect, useImperativeHandle } from 'react';
import { ValidateStep } from '../../../app/utils/guideSteps';
import { sectionService } from '../../../domain/services/section.service';
import { parseSectionDataToIds } from '../../../app/helpers/parseSectionDataToIds';
import { SectionIcon } from '../icons';
import { Question, SectionQuesions } from '../../../domain/models';

export const PreviewNewGuide = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { sectionsSelected, getSectionsDetailWithQuestions, sections } = sectionService({});

    useEffect(() => {
        getSectionsDetailWithQuestions(parseSectionDataToIds(sectionsSelected!));
    }, []);

    useImperativeHandle(ref, () => ({
        canContinue: () => false
    }));

    return (
        <section>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Nombre del cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-4">CUESTIONARIO PARA IDENTIFICAR A LOS TRABAJADORES QUE FUERON SUJETOS A ACONTECIMIENTOS TRAUMÁTICOS SEVEROS</p>
            </span>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Tipo de cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-4">Cuestionario Informativo</p>
                <p className="text-gray-500 font-bold text-xs pl-4">Esta opcion te permite crear cuestionarios con secciones que contienen preguntas sin valor</p>
            </span>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Resumen del cuestionario</p>
                </span>
                {
                    sections.map(({ id, binary, name, question, ...rest }) => (
                        <Fragment key={id}>
                            <p className="font-bold text-xs pl-5 mt-2 flex items-center [&>svg]:text-emerald-600 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-2 [&>svg]:mr-2">
                                <SectionIcon width={40} height={40} strokeWidth={2.5} />
                                {name}
                            </p>
                            {
                                binary && (
                                    <p className="text-gray-500 font-bold text-xs pl-20 mb-4">{question}</p>
                                )
                            }
                            {
                                rest?.questions?.map((question: Question) => (
                                    <p key={question.id}>{question.name}</p>
                                ))
                            }
                        </Fragment>
                    ))
                }
            </span>
        </section>
    )
})
