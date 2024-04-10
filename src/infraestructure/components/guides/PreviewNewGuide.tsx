import { ForwardedRef, Fragment, forwardRef, useEffect, useImperativeHandle } from 'react';
import { Button, useDisclosure } from '@nextui-org/react';
import { Modal } from '../ui/Modal';

import { SectionsPreviewList } from '.';
import { InfoCircle, SectionIcon, XIcon } from '../icons';
import { sectionService } from '../../../domain/services/section.service';
import { AnswerQuestionForm } from '../questions/AnswerQuestionForm';
import { guideService } from '../../../domain/services/guide.service';

import { ValidateStep } from '../../../app/utils/guideSteps';
import { parseSectionDataToIds } from '../../../app/helpers/parseSectionDataToIds';
import { parseDataToCreateGuide } from '../../../app/helpers/parseDataToCreateGuide';
import { AnswerNongradableQuestion } from '../questions';

export const PreviewNewGuide = forwardRef<ValidateStep>((__, ref: ForwardedRef<ValidateStep>) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { guide, startCreateGuide, qualifications } = guideService();
    const { sectionsSelected, getSectionsDetailWithQuestions, loading, section, findCurrentSection } = sectionService({ onOpenAuxiliarModel: onOpen });

    useEffect(() => {
        getSectionsDetailWithQuestions(parseSectionDataToIds(sectionsSelected!));
    }, []);

    const canContinue = async () => {
        await startCreateGuide(parseDataToCreateGuide(guide!, sectionsSelected, qualifications!));
        return false;
    }

    useImperativeHandle(ref, () => ({
        canContinue,
    }));

    return (
        <section>
            <span className="mb-5 block col-span-7">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <SectionIcon width={35} height={35} strokeWidth={1.5} />
                    <p className="font-bold">Vista previa del cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-10">Aquí podras ver un vista previa de como se mostrará el cuestionario</p>
            </span>
            <Modal
                isOpen={isOpen}
                onChange={onOpenChange}
                size="4xl"
                hideCloseButton
                renderContent={(onClose) => (
                    <Fragment>
                        <header className="flex items-center justify-between -mt-6 py-1 border-b-2 ">
                            <div className="flex items-center font-bold [&>svg]:text-emerald-600 text-xl [&>svg]:mr-1 pt-4 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1">
                                <SectionIcon width={35} height={35} strokeWidth={1.5} />
                                <h5>Vista previa de la sección</h5>
                            </div>
                            <Button isIconOnly className="border-2 bg-transparent" onClick={onClose}>
                                <XIcon />
                            </Button>
                        </header>
                        <span className="text-xs font-bold text-gray-500 mb-2">
                            Aquí se muesta una visualización de como será mostrada la sección a los usuarios
                        </span>
                        <span className="flex items-center -mb-2">
                            <p className="font-bold text-sm">{section?.name}</p>
                        </span>
                        {
                            section?.type === 'gradable' ? (
                                <AnswerQuestionForm
                                    hasSubquestions={section?.question ?? null}
                                    questions={section!.questions}
                                    showFooterControls={false}
                                />
                            ):(
                                <AnswerNongradableQuestion
                                    section={section!}
                                    showFooterControls={false}
                                 />
                            )
                        }
                    </Fragment>
                )}
            />
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Nombre del cuestionario</p>
                </span>
                <p className="text-gray-500 font-bold text-xs pl-4 uppercase">{guide?.name}</p>
            </span>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold">Tipo de cuestionario:</p>
                </span>

                {
                    JSON.parse(String(guide!.gradable)) ? (
                        <span className="border-2 border-green-500/50 w-full block rounded-lg py-2 bg-green-500/10">
                            <p className="font-bold text-sm pl-4 flex items-center [&>svg]:text-green-500 [&>svg]:mr-1">
                                <InfoCircle strokeWidth={2} />
                                Cuestionario evaluativo</p>
                            <p className="text-gray-500 font-bold text-xs pl-4">El cuestionario genera valores para calificar</p>
                        </span>
                    ) : (
                        <span className="border-2 border-yellow-500/50 w-full block rounded-lg py-2 bg-yellow-500/10">
                            <p className="font-bold text-sm pl-4 flex items-center [&>svg]:text-yellow-500 [&>svg]:mr-1">
                                <InfoCircle strokeWidth={2} />
                                Cuestionario informativo</p>
                            <p className="text-gray-500 font-bold text-xs pl-4">El cuestionario no genera valores para calificar</p>
                        </span>
                    )
                }
            </span>
            <span className="mb-5 block">
                <span className="flex items-center [&>svg]:text-emerald-600 mt-1 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:p-1 [&>svg]:mr-2">
                    <p className="font-bold mb-4">Resumen del cuestionario:</p>
                </span>

                <SectionsPreviewList
                    sections={sectionsSelected}
                    onOpen={onOpen}
                    findSection={findCurrentSection}
                    loading={loading}
                />

            </span>
        </section>
    )
})
